import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";
import { createPixCharge, getTransactionStatus } from "@/lib/payments";
import type { CreatePixRequest } from "@/lib/payments";
import QRCode from "qrcode";
import { useNavigate } from "react-router-dom";
import { ordersRepository } from "@/lib/ordersRepository";


export const PixCheckout = ({
  amount = 50.0,
  trackingCode,
  customer,
  overrideNextUrl,
  markAsPaidOnSuccess = true,
}: {
  amount?: number;
  trackingCode?: string;
  customer: CreatePixRequest["customer"];
  overrideNextUrl?: string;
  markAsPaidOnSuccess?: boolean;
}) => {
  const [copied, setCopied] = useState(false);
  const [expiresIn, setExpiresIn] = useState<number>(24 * 60 * 60); // 24h em segundos
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pixCode, setPixCode] = useState<string>("");
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState<number | null>(null);
  const [transactionStatus, setTransactionStatus] = useState<string>("pending");
  const navigate = useNavigate();

  const handleCopyCode = async () => {
    try {
      if (pixCode) {
        await navigator.clipboard.writeText(pixCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  useEffect(() => {
    let interval: number | undefined;
    interval = window.setInterval(() => setExpiresIn((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const run = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const amountInCents = Math.round((amount || 0) * 100);
        const response = await createPixCharge({
          amountInCents,
          title: "Regularização de Encargos",
          quantity: 1,
          productImageUrl: "",
          expiresInDays: 1,
          externalRef: trackingCode || "",
          customer,
          metadata: { provider: "Skypostal Tracking", trackingCode },
        });

        const apiQrText = response.data?.pix?.qrcodeText || "";
        const apiQrField = response.data?.pix?.qrcode || "";
        let finalPixText = apiQrText;
        let finalQrImage: string | null = null;

        if (apiQrField) {
          if (apiQrField.startsWith("data:image")) {
            finalQrImage = apiQrField;
          } else {
            if (!finalPixText) finalPixText = apiQrField;
          }
        }

        if (!finalQrImage && finalPixText) {
          try {
            finalQrImage = await QRCode.toDataURL(finalPixText, { width: 256, margin: 1 });
          } catch {
            finalQrImage = null;
          }
        }

        const expirationDateIso = response.data?.pix?.expirationDate;
        setPixCode(finalPixText);
        setQrImage(finalQrImage);
        if (typeof response.data?.id === "number") {
          setTransactionId(response.data.id);
        }
        if (response.data?.status) {
          setTransactionStatus(response.data.status);
        }
        // Registrar pedido localmente
        if (typeof response.data?.id === "number") {
          void ordersRepository.addOne({
            transactionId: response.data.id,
            tracking: trackingCode || "",
            amount: amountInCents,
            paymentMethod: "pix",
            status: (response.data.status as any) || "pending",
            customerName: customer.name,
            customerEmail: customer.email,
            externalId: response.data.externalId,
            secureId: response.data.secureId,
            secureUrl: response.data.secureUrl,
            created_at: response.data.createdAt,
          }).catch(() => void 0)
        }
        if (expirationDateIso) {
          const expiresMs = new Date(expirationDateIso).getTime() - Date.now();
          setExpiresIn(Math.max(0, Math.floor(expiresMs / 1000)));
        } else {
          setExpiresIn(24 * 60 * 60);
        }
      } catch (e: any) {
        setError(e?.message || "Falha ao criar cobrança PIX.");
      } finally {
        setIsLoading(false);
      }
    };
    void run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Polling do status da transação
  useEffect(() => {
    if (!transactionId) return;
    let isCancelled = false;
    const interval = window.setInterval(async () => {
      try {
        const res = await getTransactionStatus(transactionId);
        const status = res.data?.status || "";
        if (isCancelled) return;
        setTransactionStatus(status);

        if (status === "approved" || status === "paid" || status === "approved_payment") {
          window.clearInterval(interval);
          // atualizar status local
          void ordersRepository.updateStatusByTransactionId(transactionId, "approved").catch(() => void 0)
          
          // Redirecionamento personalizado (se fornecido) ou fluxo padrão
          if (overrideNextUrl && typeof overrideNextUrl === 'string' && overrideNextUrl.length > 0) {
            if (/^https?:\/\//i.test(overrideNextUrl)) {
              window.location.href = overrideNextUrl
            } else {
              navigate(overrideNextUrl)
            }
            return
          }

          // Fluxo sem NF: pós-pagamento vai direto para agendamento
          const qp = new URLSearchParams();
          if (trackingCode) qp.set('tracking', trackingCode);
          qp.set('amount', String(amount ?? 0));
          navigate(`/data-entrega?${qp.toString()}`);
        }
        if (status === "expired" || status === "cancelled" || status === "refunded") {
          setError(
            status === "expired"
              ? "Transação expirada. Gere um novo QR Code."
              : status === "cancelled"
              ? "Transação cancelada."
              : "Transação estornada."
          );
          window.clearInterval(interval);
          // atualizar status local
          const s = status as "expired" | "cancelled" | "refunded";
          void ordersRepository.updateStatusByTransactionId(transactionId, s).catch(() => void 0)
        }
      } catch (e) {
        // mantém tentando silenciosamente
      }
    }, 4000);
    return () => {
      isCancelled = true;
      window.clearInterval(interval);
    };
  }, [transactionId, amount, navigate, trackingCode]);

  const expiresLabel = useMemo(() => {
    const h = Math.floor(expiresIn / 3600)
    const m = Math.floor((expiresIn % 3600) / 60)
    const s = expiresIn % 60
    const pad = (n: number) => String(n).padStart(2, '0')
    return `${pad(h)}:${pad(m)}:${pad(s)}`
  }, [expiresIn])

  return (
    <div className="animate-slide-up">
      <Card className="bg-white border border-border-light p-4 sm:p-6 space-y-5 sm:space-y-6">
        <div className="text-center space-y-2 sm:space-y-4">
          <h2 className="text-lg sm:text-2xl font-semibold text-text-primary">Pagamento PIX</h2>
          <p className="text-xs sm:text-sm text-text-secondary">Escaneie o QR Code ou copie o código PIX para efetuar o pagamento</p>
        </div>

        {/* QR Code */}
        <div className="flex justify-center">
          <div className="w-48 h-48 sm:w-64 sm:h-64 bg-surface-light border border-border-light rounded-lg flex items-center justify-center overflow-hidden no-scrollbar">
            {isLoading ? (
              <div className="text-center space-y-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-lg mx-auto flex items-center justify-center animate-pulse" />
                <p className="text-xs sm:text-sm text-text-secondary">Gerando QR Code...</p>
              </div>
            ) : error ? (
              <div className="text-center space-y-2 p-4">
                <p className="text-xs sm:text-sm text-red-600">{error}</p>
              </div>
            ) : qrImage ? (
              // data:image/png;base64,...
              <img src={qrImage} alt="QR Code PIX" className="w-full h-full object-contain" />
            ) : (
              <div className="text-center space-y-2">
                <p className="text-xs sm:text-sm text-text-secondary">QR Code indisponível</p>
              </div>
            )}
          </div>
        </div>

        {/* Payment Details com expiração abaixo da identificação */}
        <div className="bg-surface-light rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
          <div className="flex justify-between items-center text-sm sm:text-base">
            <span className="text-text-secondary font-medium">Valor:</span>
            <span className="text-base sm:text-xl font-semibold text-text-primary">R$ {amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-sm sm:text-base">
            <span className="text-text-secondary font-medium">Destinatário:</span>
            <span className="text-text-primary">Skypostal Rastreamento</span>
          </div>
          <div className="flex justify-between items-start text-sm sm:text-base">
            <span className="text-text-secondary font-medium">Telefone:</span>
            <span className="text-text-primary break-all text-right max-w-[70%]">{customer.phone}</span>
          </div>
          <div className="flex justify-between items-center text-sm sm:text-base">
            <span className="text-text-secondary font-medium">Identificação:</span>
            <span className="text-text-primary">{trackingCode ?? 'Rastreamento'}</span>
          </div>
          <div className="flex justify-between items-center text-sm sm:text-base">
            <span className="text-text-secondary font-medium">Pagamento expira:</span>
            <span className="text-text-primary font-semibold tracking-wider font-mono">{expiresLabel}</span>
          </div>
        </div>

        {/* PIX Code */}
        <div className="space-y-2 sm:space-y-3">
          <Label className="text-sm sm:text-base text-text-primary font-medium">Código PIX (Copia e Cola):</Label>
          <div className="bg-surface-light border border-border-light rounded-lg p-2 sm:p-3">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="flex-1 text-[10px] sm:text-xs text-text-primary font-mono break-all leading-relaxed max-h-40 overflow-auto no-scrollbar">
                {isLoading ? "Gerando código..." : pixCode || "Indisponível"}
              </div>
              <Button variant="outline" size="sm" onClick={handleCopyCode} className="shrink-0 h-8 w-8 p-0 bg-blue-50 hover:bg-blue-100 border-blue-300 hover:border-blue-400 text-blue-700 hover:text-blue-800 transition-colors">
                {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          {copied && <p className="text-xs sm:text-sm text-green-600 animate-fade-in">✓ Código copiado!</p>}
        </div>

        {/* Instructions */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/60 rounded-xl p-4 sm:p-5 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <h4 className="font-semibold text-blue-900 text-sm sm:text-base">Como pagar</h4>
          </div>
          <div className="grid gap-2.5">
            <div className="flex items-start gap-3 p-2.5 bg-white/60 rounded-lg border border-blue-100/50">
              <span className="text-blue-600 text-xs font-medium bg-blue-100 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
              <span className="text-xs sm:text-sm text-blue-800">Acesse o app do seu banco</span>
            </div>
            <div className="flex items-start gap-3 p-2.5 bg-white/60 rounded-lg border border-blue-100/50">
              <span className="text-blue-600 text-xs font-medium bg-blue-100 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
              <span className="text-xs sm:text-sm text-blue-800">Escolha a opção PIX</span>
            </div>
            <div className="flex items-start gap-3 p-2.5 bg-white/60 rounded-lg border border-blue-100/50">
              <span className="text-blue-600 text-xs font-medium bg-blue-100 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
              <span className="text-xs sm:text-sm text-blue-800">Escaneie o QR Code ou cole o código</span>
            </div>
            <div className="flex items-start gap-3 p-2.5 bg-white/60 rounded-lg border border-blue-100/50">
              <span className="text-blue-600 text-xs font-medium bg-blue-100 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
              <span className="text-xs sm:text-sm text-blue-800">Confirme a transação</span>
            </div>
            <div className="flex items-start gap-3 p-2.5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200/50">
              <span className="text-green-600 text-xs font-medium bg-green-100 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
              <span className="text-xs sm:text-sm text-green-800 font-medium">Rastreamento liberado automaticamente</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
