import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Check, FileText, Clock, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getCustomsOfficeFromTracking, testTrackingLogic } from '@/lib/trackingUtils';
import { findNearestByState } from '@/lib/alfandegas';
import nfeImage from '@/assets/nfe-model-D1VlW_Dm.png';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PixCheckout } from '@/components/PixCheckout';
import { leadsRepository } from '@/lib/leadsRepository';

type ProgressStep = {
  id: string;
  title: string;
  icon: React.ReactNode;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  message: string;
};

export const PaymentProgressPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const tracking = params.get("tracking") || "";
  const amount = params.get("amount") || "0";
  const paid = (params.get("paid") === "1" || params.get("paid") === "true");
  const cameFromPackage = !paid;
  
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(25);
  const [hasError, setHasError] = useState(false);
  const [iconAnimation, setIconAnimation] = useState('enter');
  const [showInvoice, setShowInvoice] = useState(false);
  const [customsOffice, setCustomsOffice] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [lead, setLead] = useState(null);
  
  // Determina a alfândega baseada no código de rastreio
  useEffect(() => {
    const resolveCustomsOffice = async () => {
      try {
        const office = await getCustomsOfficeFromTracking(tracking);
        setCustomsOffice(office);
        console.log('Código de rastreio:', tracking);
        console.log('Alfândega determinada:', office);
      } catch (error) {
        console.error('Erro ao determinar alfândega:', error);
        // Fallback para alfândega padrão
        setCustomsOffice(findNearestByState('SP'));
      }
    };
    
    if (tracking) {
      resolveCustomsOffice();
    }
  }, [tracking]);
  
  // Executa teste da lógica uma vez quando a página carrega
  useEffect(() => {
    testTrackingLogic();
  }, []);

  // Se veio do pagamento do pacote (sem paid), ir direto para a tela de NF (checkout)
  useEffect(() => {
    if (!paid) {
      setShowInvoice(true);
    }
  }, [paid]);

  // Busca dados do lead baseado no tracking
  useEffect(() => {
    const fetchLead = async () => {
      if (tracking) {
        try {
          const leadData = await leadsRepository.findByTracking(tracking);
          setLead(leadData);
        } catch (error) {
          console.error('Erro ao buscar dados do lead:', error);
        }
      }
    };
    
    fetchLead();
  }, [tracking]);

  const steps: ProgressStep[] = paid ? [
    {
      id: 'payment-received',
      title: 'RECEBEMOS SEU PAGAMENTO',
      icon: <Check className="h-8 w-8 text-white" />,
      status: 'completed',
      progress: 25,
      message: 'Pagamento confirmado com sucesso'
    },
    {
      id: 'processing',
      title: 'PROCESSANDO DOCUMENTOS',
      icon: <FileText className="h-8 w-8 text-white" />,
      status: 'processing',
      progress: 50,
      message: 'Verificando documentação'
    },
    {
      id: 'generating-invoice',
      title: 'NOTA FISCAL SENDO GERADA',
      icon: <FileText className="h-8 w-8 text-white" />,
      status: 'processing',
      progress: 75,
      message: 'Emitindo nota fiscal'
    },
    {
      id: 'finalizing',
      title: 'NOTA FISCAL EMITIDA',
      icon: <Check className="h-8 w-8 text-white" />,
      status: 'completed',
      progress: 100,
      message: 'NF gerada com sucesso'
    }
  ] : [
    {
      id: 'payment-received',
      title: 'RECEBEMOS SEU PAGAMENTO',
      icon: <Check className="h-8 w-8 text-white" />,
      status: 'completed',
      progress: 25,
      message: 'Pagamento confirmado com sucesso'
    },
    {
      id: 'processing',
      title: 'PROCESSANDO DOCUMENTOS',
      icon: <FileText className="h-8 w-8 text-white" />,
      status: 'processing',
      progress: 50,
      message: 'Verificando documentação'
    },
    {
      id: 'generating-invoice',
      title: 'NOTA FISCAL SENDO GERADA',
      icon: <FileText className="h-8 w-8 text-white" />,
      status: 'processing',
      progress: 75,
      message: 'Emitindo nota fiscal'
    },
    {
      id: 'finalizing',
      title: 'FALHA AO GERAR NOTA FISCAL',
      icon: <AlertTriangle className="h-8 w-8 text-white" />,
      status: 'error',
      progress: 100,
      message: 'Erro na geração da nota fiscal'
    }
  ];

  useEffect(() => {
    if (!paid) return; // somente roda animação quando já está pago e vamos finalizar NF
    let currentStepIndex = 0;
    let isWaiting = false;

    const progressInterval = setInterval(() => {
      if (isWaiting) return;

      // Simular erro ocasionalmente (10% de chance) somente se ainda não pago
      if (!paid && currentStepIndex === 2 && Math.random() < 0.1) {
        clearInterval(progressInterval);
        setHasError(true);
        setTimeout(() => {
          // Redirecionar para página de erro ou voltar para checkout
          navigate(`/checkout?error=processing&tracking=${tracking}`);
        }, 3000);
        return;
      }

      // Progresso com delays de 1 segundo
      if (currentStepIndex === 0) {
        // Primeiro passo: 25% (já iniciado)
        setProgress(25);
        currentStepIndex = 1;
        setIconAnimation('exit');
        isWaiting = true;
        
        setTimeout(() => {
          setCurrentStep(1);
          setIconAnimation('enter');
          // Delay de 1 segundo antes de continuar
          setTimeout(() => {
            isWaiting = false;
          }, 1000);
        }, 300);
      } else if (currentStepIndex === 1) {
        // Segundo passo: 50%
        setProgress(50);
        currentStepIndex = 2;
        setIconAnimation('exit');
        isWaiting = true;
        
        setTimeout(() => {
          setCurrentStep(2);
          setIconAnimation('enter');
          // Delay de 1 segundo antes de continuar
          setTimeout(() => {
            isWaiting = false;
          }, 1000);
        }, 300);
      } else if (currentStepIndex === 2) {
        // Terceiro passo: 75%
        setProgress(75);
        currentStepIndex = 3;
        setIconAnimation('exit');
        isWaiting = true;
        
        setTimeout(() => {
          setCurrentStep(3);
          setIconAnimation('enter');
          // Delay de 1 segundo antes de continuar
          setTimeout(() => {
            isWaiting = false;
          }, 1000);
        }, 300);
      } else if (currentStepIndex === 3) {
        // Quarto passo: 100%
        setProgress(100);
        clearInterval(progressInterval);
        setTimeout(() => {
          if (paid) {
            const qp = new URLSearchParams();
            if (tracking) qp.set('tracking', tracking);
            if (amount) qp.set('amount', amount);
            navigate(`/data-entrega?${qp.toString()}`);
          } else {
            // Mostrar tela da nota fiscal borrada
            setShowInvoice(true);
          }
        }, 2000);
      }
    }, 100);

    return () => clearInterval(progressInterval);
  }, [navigate, tracking, amount, paid]);

  // Ao mostrar a NF e ainda não tiver pago, abrir o modal de pagamento automaticamente
  useEffect(() => {
    if (showInvoice && !paid) {
      setShowPaymentModal(true);
    }
  }, [showInvoice, paid]);

  const currentStepData = steps[currentStep];

  // Renderizar tela da nota fiscal borrada
  if (showInvoice) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 pt-20 pb-0">
          {/* Caixa de alerta superior */}
          <Card className="w-full max-w-2xl mb-6 p-6 border-l-4 border-l-red-400">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-bold text-red-600">
                  Erro ao gerar Nota Fiscal - Pagamento necessário para liberação
                </h3>
                <p className="text-gray-700 mt-2">
                  Para finalizar a emissão da nota fiscal e liberar sua encomenda, é necessário efetuar o pagamento das taxas abaixo.
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
                  <li>Taxa de emissão da nota fiscal obrigatória para liberação</li>
                  <li>Após a confirmação, o processamento é imediato e o comprovante é enviado ao seu e-mail</li>
                  <li>Sem o pagamento, a nota fiscal não será gerada e a encomenda ficará retida</li>
                </ul>
                <p className="text-xs text-gray-500 mt-3">
                  Base legal: Lei nº 8.146/1994 (Emissão de documento fiscal e recolhimento de impostos)
                </p>
              </div>
            </div>
          </Card>

                    {/* Imagem da Nota Fiscal */}
          <div className="w-full max-w-2xl mb-6 relative">
            <img 
              src={nfeImage} 
              alt="Nota Fiscal Eletrônica" 
              className="w-full h-auto rounded-lg shadow-sm"
              style={{ filter: 'blur(4px)' }}
            />
            {/* Filtro escuro e texto sobreposto */}
            <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
              <div className="text-red-600 font-bold text-2xl transform rotate-12">
                AGUARDANDO PAGAMENTO
              </div>
            </div>
          </div>

           {/* Guia de Pagamento */}
           <Card className="w-full max-w-2xl mt-6 p-6">
             <h3 className="text-lg font-bold text-gray-800 mb-4">
               Guia de Pagamento - Órgão Tributador
             </h3>
             
             {/* Detalhes dos valores */}
             <div className="space-y-2 mb-6">
               <div className="flex justify-between">
                 <span className="text-gray-600">ISS:</span>
                 <span className="font-medium">R$ 7,95</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-gray-600">ICMS:</span>
                 <span className="font-medium">R$ 11,17</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-gray-600">NF-e:</span>
                 <span className="font-medium">R$ 7,59</span>
               </div>
               <div className="flex justify-between border-t pt-2">
                 <span className="font-bold text-gray-800">Total:</span>
                 <span className="font-bold text-red-600">R$ 26,71</span>
               </div>
             </div>

             {/* Informações do órgão tributador */}
             {customsOffice && (
               <div className="mb-6">
                 <h4 className="font-semibold text-gray-800 mb-3">
                   Órgão Tributador (Contato e Endereço)
                 </h4>
                 <div className="space-y-1 text-sm text-gray-600">
                   <p><strong>{customsOffice.nome}</strong></p>
                   <p>Telefone: {customsOffice.telefone}</p>
                   <p>{customsOffice.endereco}</p>
                 </div>
                 <div className="mt-4 space-y-1 text-sm text-gray-600">
                   <p><strong>Receita Federal do Brasil</strong></p>
                   <p>Atendimento: 0800 978-2339</p>
                 </div>
               </div>
             )}

                           {/* Botão de pagamento */}
              <button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                onClick={() => setShowPaymentModal(true)}
              >
                Efetuar pagamento da taxa de liberação
              </button>
           </Card>
         </div>
         <Footer />
       </>
     );
  }

  // Renderizar tela de erro
  if (hasError) {
    return (
      <>
        <Header />
        <div className="bg-gray-50 flex items-start justify-center p-4 pt-20 pb-0">
          <Card className="w-full max-w-md p-8 text-center">
            {/* Ícone de erro */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-red-500">
                <AlertTriangle className="h-8 w-8 text-white" />
              </div>
            </div>

            {/* Título do erro */}
            <h2 className="text-xl font-bold text-red-600 mb-4">
              FALHA AO GERAR NOTA FISCAL
            </h2>

            {/* Barra de progresso (100% para mostrar que chegou ao final) */}
            <div className="mb-4">
              <Progress value={100} className="h-2" />
            </div>

            {/* Status do progresso */}
            <p className="text-gray-600 text-sm">
              Processando... 100%
            </p>

            {/* Mensagem adicional */}
            <p className="text-gray-500 text-xs mt-2">
              Erro na geração da nota fiscal. Tente novamente.
            </p>
          </Card>
          {/* Modal de Pagamento (precisa existir também no branch de NF) */}
          <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
            <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-auto no-scrollbar [&>button]:text-gray-500 [&>button:hover]:text-gray-700">
              <DialogHeader>
                <DialogTitle>Pagamento PIX</DialogTitle>
              </DialogHeader>
              {lead ? (
                <PixCheckout
                  amount={parseFloat(amount)}
                  trackingCode={tracking}
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
              ) : (
                <div className="flex items-center justify-center py-10">
                  <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="bg-gray-50 flex items-start justify-center p-4 pt-20 pb-0">
        <Card className="w-full max-w-md p-8 text-center">
          {/* Ícone do passo atual */}
          <div className="flex justify-center mb-6">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ease-in-out transform ${
              currentStepData.status === 'completed' ? 'bg-green-500 scale-110' :
              currentStepData.status === 'error' ? 'bg-red-500 scale-110' :
              'bg-blue-500 scale-100 animate-pulse'
            }`}>
              <div className={`transition-all duration-300 ease-in-out transform ${
                iconAnimation === 'enter' ? 'opacity-100 scale-100 rotate-0' :
                iconAnimation === 'exit' ? 'opacity-0 scale-75 -rotate-12' :
                'opacity-100 scale-100 rotate-0'
              } ${currentStepData.status === 'completed' ? 'animate-bounce' : 
                 currentStepData.status === 'processing' ? 'animate-spin' : ''}`}>
                {currentStepData.icon}
              </div>
            </div>
          </div>

          {/* Título do passo atual */}
          <h2 className={`text-xl font-bold mb-4 transition-all duration-500 ease-in-out transform ${
            iconAnimation === 'enter' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          } ${
            currentStepData.status === 'error' ? 'text-red-600' : 'text-blue-600'
          }`}>
            {currentStepData.title}
          </h2>

          {/* Barra de progresso */}
          <div className="mb-4">
            <div className={`relative h-2 w-full overflow-hidden rounded-full ${
              currentStepData.status === 'error' ? 'bg-red-200' : 'bg-gray-200'
            }`}>
              <div 
                className={`h-full transition-all duration-300 ${
                  currentStepData.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Status do progresso */}
          <p className="text-gray-600 text-sm">
            Processando... {progress}%
          </p>

          {/* Mensagem adicional */}
          <p className="text-gray-500 text-xs mt-2">
            {currentStepData.message}
          </p>

          {/* Informações do tracking */}
          {tracking && (
            <div className="mt-6 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-700">
                Código de Rastreio: <span className="font-mono">{tracking}</span>
              </p>
            </div>
          )}
        </Card>
      </div>
      
      {/* Modal de Pagamento */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-auto no-scrollbar [&>button]:text-gray-500 [&>button:hover]:text-gray-700">
          <DialogHeader>
            <DialogTitle>Pagamento PIX</DialogTitle>
          </DialogHeader>
          {lead ? (
            <PixCheckout
              amount={parseFloat(amount)}
              trackingCode={tracking}
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
          ) : (
            <div className="flex items-center justify-center py-10">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </>
  );
};
