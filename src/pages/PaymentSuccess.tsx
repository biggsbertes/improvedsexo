import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PixCheckout } from "@/components/PixCheckout";
import { leadsRepository } from "@/lib/leadsRepository";
import { formatAddress } from "@/lib/utils";
import type { Lead } from "@/types/lead";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const tracking = params.get("tracking") || "";
  const amount = params.get("amount");
  const express = params.get("express");
  const [lead, setLead] = useState<Lead | null>(null);
  const [showUpsell, setShowUpsell] = useState(false);
  const [showDelayInfo, setShowDelayInfo] = useState(false);
  const [hasShownDelayInfo, setHasShownDelayInfo] = useState(false);
  const [showProcessingStatus, setShowProcessingStatus] = useState(false);
  const [showExpressDelivery, setShowExpressDelivery] = useState(false);
  const [expressDeliveryPaid, setExpressDeliveryPaid] = useState(false);
  const upsellAmount = useMemo(() => (Math.random() < 0.5 ? 12 : 15), []); // BRL

  useEffect(() => {
    // Foco inicial na página, pode adicionar tracking/analytics aqui
    if (tracking) {
      void leadsRepository.findByTracking(tracking).then(found => setLead(found ?? null))
    }
    
    // Verificar se é um pagamento de frete express (tracking termina com -EXPRESS ou parâmetro express=paid)
    if ((tracking && tracking.endsWith('-EXPRESS')) || express === 'paid') {
      setExpressDeliveryPaid(true);
    }
    
    // Mostrar o status de processamento após 1 segundo
    const timer1 = setTimeout(() => {
      setShowProcessingStatus(true);
    }, 1000);
    
    // Mostrar a entrega expressa após 1.5 segundos
    const timer2 = setTimeout(() => {
      setShowExpressDelivery(true);
    }, 1500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [tracking]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white border border-border-light rounded-2xl shadow-sm p-8 text-center space-y-6 animate-in slide-in-from-bottom-4 duration-700 ease-out">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-text-primary">Pagamento confirmado!</h1>
            <p className="text-text-secondary">Recebemos a confirmação do seu pagamento via PIX.</p>

            <div className="bg-surface-light border border-border-light rounded-lg p-4 text-left space-y-2">
              {tracking && (
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Código de rastreio</span>
                  <span className="text-text-primary font-medium">{tracking}</span>
                </div>
              )}
              {amount && (
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Valor</span>
                  <span className="text-text-primary font-medium">R$ {Number(amount).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Método</span>
                <span className="text-text-primary font-medium">PIX</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Data e Hora</span>
                <span className="text-text-primary font-medium">
                  {new Date().toLocaleDateString('pt-BR', { 
                    day: '2-digit', 
                    month: '2-digit', 
                    year: 'numeric' 
                  })} às {new Date().toLocaleTimeString('pt-BR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Status</span>
                <span className="text-green-600 font-semibold">Aprovado</span>
              </div>
            </div>

            {/* Status de Processamento - Design Clean */}
            <div className={`bg-white border border-gray-200 rounded-xl p-5 md:p-6 text-left space-y-5 shadow-sm transition-all duration-1000 ease-out transform ${
              showProcessingStatus 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-8 scale-95'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Ícone simples */}
                <div className={`w-12 h-12 sm:w-10 sm:h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center mx-auto sm:mx-0 flex-shrink-0 transition-all duration-700 delay-100 ease-out ${
                  showProcessingStatus ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-12'
                }`}>
                  <svg className="w-6 h-6 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" preserveAspectRatio="xMidYMid meet">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                    <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                    <line x1="12" y1="22.08" x2="12" y2="12"/>
                  </svg>
                </div>
                
                <div className="flex-1 text-center sm:text-left space-y-4">
                  {/* Header simples */}
                  <div className={`space-y-2 transition-all duration-700 delay-200 ease-out ${
                    showProcessingStatus ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    <h3 className="text-lg sm:text-base font-semibold text-gray-900">
                      Processando seu pedido
                    </h3>
                    <div className="flex flex-col sm:flex-row items-center sm:justify-start gap-3 sm:gap-4">
                      <span className={`px-3 py-2 text-sm font-medium rounded-full border text-center ${
                        expressDeliveryPaid 
                          ? 'bg-green-100/60 text-green-700 border-green-200/60' 
                          : 'bg-orange-100/60 text-orange-700 border-orange-200/60'
                      }`}>
                        {expressDeliveryPaid ? 'Em preparação para expedição' : 'Em processamento'}
                      </span>
                      <div className={`flex items-center gap-2 text-xs ${
                        expressDeliveryPaid ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          expressDeliveryPaid ? 'bg-green-500' : 'bg-orange-500'
                        }`}></div>
                        <span className="whitespace-nowrap">Status atualizado hoje</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className={`text-sm text-gray-600 transition-all duration-700 delay-300 ease-out ${
                    showProcessingStatus ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    {expressDeliveryPaid 
                      ? "Seu pedido está em processo de separação e será expedido com prioridade máxima. Previsão de entrega: até 12 horas."
                      : "Seu produto será encaminhado para expedição e será enviado no próximo dia útil."
                    }
                  </p>
                  
                  {/* Timeline simples */}
                  <div className={`space-y-4 transition-all duration-700 delay-400 ease-out ${
                    showProcessingStatus ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    {/* Status 1: Pagamento Confirmado */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-green-700">Pagamento Confirmado</div>
                        <div className="text-xs text-gray-500">
                          {new Date().toLocaleDateString('pt-BR', { 
                            day: '2-digit', 
                            month: '2-digit', 
                            year: 'numeric' 
                          })} às {new Date().toLocaleTimeString('pt-BR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </div>
                    
                    {/* Linha simples */}
                    <div className="ml-4 sm:ml-3 w-0.5 h-6 bg-gray-300"></div>
                    
                    {/* Status 2: Preparando Pedido / Separação em andamento */}
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse ${
                        expressDeliveryPaid ? 'bg-green-500' : 'bg-orange-500'
                      }`}>
                        {expressDeliveryPaid ? (
                          <svg className="w-4 h-4 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                            <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                            <line x1="12" y1="22.08" x2="12" y2="12"/>
                          </svg>
                        ) : (
                          <svg className="w-4 h-4 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className={`text-sm font-medium ${
                          expressDeliveryPaid ? 'text-green-700' : 'text-orange-700'
                        }`}>
                          {expressDeliveryPaid ? 'Separação em andamento' : 'Preparando Pedido'}
                        </div>
                        <div className={`text-xs ${
                          expressDeliveryPaid ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          {expressDeliveryPaid ? 'Envio programado para hoje' : 'Em andamento'}
                        </div>
                      </div>
                    </div>
                    
                    {/* Linha simples */}
                    <div className="ml-4 sm:ml-3 w-0.5 h-6 bg-gray-300"></div>
                    
                    {/* Status 3: Enviando */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-6 sm:h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 sm:w-3 sm:h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-600">Enviando</div>
                        <div className="text-xs text-gray-500">Pendente</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upsell: Entrega Expressa 12h */}
            <div className={`bg-white border border-green-200 rounded-xl p-5 md:p-6 text-center space-y-5 shadow-md hover:shadow-lg transition-all duration-1000 ease-out transform ${
              showExpressDelivery 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-8 scale-95'
            }`}>
              {!expressDeliveryPaid ? (
                <>
                  {/* Header com ícone e título */}
                  <div className={`space-y-3 transition-all duration-700 delay-200 ease-out ${
                    showExpressDelivery ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    <div className={`w-12 h-12 mx-auto rounded-lg bg-green-100 flex items-center justify-center transition-all duration-700 delay-100 ease-out ${
                      showExpressDelivery ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-12'
                    }`}>
                      <svg className="w-6 h-6 text-green-600 animate-truck-move" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 3h15v13H1z"/>
                        <path d="M16 8h4l3 3v5h-7V8z"/>
                        <circle cx="7" cy="18" r="2"/>
                        <circle cx="17" cy="18" r="2"/>
                        <path d="M5 8h2"/>
                        <path d="M9 8h2"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Entrega Expressa em até 12 horas</h3>
                      <p className="text-sm text-gray-600">
                        Receba sua encomenda com prioridade máxima para <span className="font-medium text-green-700">{lead?.city ? formatAddress(lead.city) : '—'}, {lead?.state ? formatAddress(lead.state) : '—'}</span>. 
                        Entrega expressa disponível para sua região!
                      </p>
                    </div>
                  </div>

                  {/* Preço destacado */}
                  <div className={`bg-green-50 border border-green-200 rounded-lg p-3 transition-all duration-700 delay-300 ease-out ${
                    showExpressDelivery ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
                  }`}>
                    <div className="text-xs text-green-600 mb-1">Valor adicional</div>
                    <div className="text-2xl font-bold text-green-700">R$ {upsellAmount.toFixed(2)}</div>
                    <div className="text-xs text-green-600">Confirmação imediata via PIX</div>
                  </div>

                  {/* Botão principal */}
                  <div className={`space-y-2 transition-all duration-700 delay-400 ease-out ${
                    showExpressDelivery ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    <Button 
                      onClick={() => setShowUpsell(true)} 
                      className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 animate-pulse-slow"
                    >
                      Adicionar Entrega Expressa
                    </Button>
                    <p className="text-xs text-gray-500">Serviço sujeito à disponibilidade logística</p>
                  </div>
                </>
              ) : (
                <>
                  {/* Confirmação do Frete Express Pago */}
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-8 h-8 text-green-600 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                        <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                        <line x1="12" y1="22.08" x2="12" y2="12"/>
                        <path d="M12 2v4"/>
                        <path d="M8 4h8"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-green-700 mb-2">Frete Express Confirmado!</h3>
                      <p className="text-sm text-gray-600">
                        Sua entrega expressa foi confirmada e será processada com prioridade máxima.
                      </p>
                    </div>
                    
                    {/* Detalhes do frete express */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-green-700 font-medium">Serviço</span>
                        <span className="text-green-700 font-semibold">Entrega Expressa (12h)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-green-700 font-medium">Valor</span>
                        <span className="text-green-700 font-semibold">R$ {upsellAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-green-700 font-medium">Status</span>
                        <span className="text-green-600 font-semibold">Confirmado</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-green-700 font-medium">Prazo</span>
                        <span className="text-green-700 font-semibold">Até 12 horas</span>
                      </div>
                    </div>
                    


                  </div>
                </>
              )}
            </div>

                          <div className="pt-2 text-center">
                <Button onClick={() => {
                  // Se for frete express pago, vai direto para o início
                  if (expressDeliveryPaid) {
                    navigate("/");
                  } else if (!hasShownDelayInfo) {
                    setShowDelayInfo(true);
                  } else {
                    navigate("/");
                  }
                }} variant="outline" className="h-10 px-5 text-gray-600 border-gray-300 hover:bg-gray-50 hover:text-gray-700">Voltar ao início</Button>
              </div>
          </div>
        </div>
      </main>

      {/* Popup Informativo sobre Atrasos */}
      <Dialog open={showDelayInfo} onOpenChange={(open) => {
        setShowDelayInfo(open);
        if (!open) {
          setHasShownDelayInfo(true);
        }
      }}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-auto no-scrollbar [&>button]:text-gray-500 [&>button:hover]:text-gray-700 transition-all duration-300 ease-out transform scale-100">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-semibold text-gray-900">Informação Importante</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                </svg>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Pode haver atrasos devido à logística. <strong>Caso selecionado a entrega expressa, garantimos que seu pedido chegará em até 12 horas</strong>, diferente da entrega comum.
              </p>
            </div>
            <div className="pt-4">
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-lens-flare"></div>
                <Button 
                  onClick={() => {
                    setShowDelayInfo(false);
                    setShowUpsell(true);
                  }} 
                  className="relative w-full h-11 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 animate-pulse-slow"
                >
                  Adicionar Entrega Expressa
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Checkout PIX para Upsell */}
      <Dialog open={showUpsell} onOpenChange={setShowUpsell}>
        <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-auto no-scrollbar [&>button]:text-gray-500 [&>button:hover]:text-gray-700">
          <DialogHeader>
            <DialogTitle>Entrega Expressa (12h)</DialogTitle>
          </DialogHeader>
          {lead && (
            <PixCheckout
              amount={upsellAmount}
              trackingCode={`${tracking}-EXPRESS`}
              customer={{
                name: lead.name,
                email: lead.email,
                phone: lead.telephone,
                document: { type: 'cpf', number: lead.cpf },
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentSuccess;


