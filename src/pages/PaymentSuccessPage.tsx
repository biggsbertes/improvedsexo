import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Check, FileText, Download, Mail, Phone } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getCustomsOfficeFromTracking } from '@/lib/trackingUtils';
import { findNearestByState } from '@/lib/alfandegas';

export const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const tracking = params.get("tracking") || "";
  const amount = params.get("amount") || "0";
  const express = params.get("express") || "";
  const [customsOffice, setCustomsOffice] = useState(null);
  
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

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 pt-20">
        {/* Card de Sucesso */}
        <Card className="w-full max-w-2xl mb-6 p-8 text-center">
          {/* Ícone de Sucesso */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-green-500 animate-bounce">
              <Check className="h-10 w-10 text-white" />
            </div>
          </div>

          {/* Título de Sucesso */}
          <h1 className="text-3xl font-bold text-green-600 mb-4">
            Pagamento Confirmado!
          </h1>

          {/* Mensagem de Sucesso */}
          <p className="text-lg text-gray-700 mb-6">
            Sua taxa de liberação foi paga com sucesso. A nota fiscal será processada imediatamente.
          </p>

          {/* Status do Processamento */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700 font-semibold">Processando Nota Fiscal</span>
            </div>
            <p className="text-sm text-green-600">
              Aguarde alguns instantes enquanto finalizamos o processamento...
            </p>
          </div>

          {/* Informações do Pagamento */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-800 mb-2">Detalhes do Pagamento</h3>
            <div className="space-y-1 text-sm text-blue-700">
              <div className="flex justify-between">
                <span>Valor Pago:</span>
                <span className="font-medium">R$ 26,71</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="font-medium text-green-600">Confirmado</span>
              </div>
              {tracking && (
                <div className="flex justify-between">
                  <span>Código de Rastreio:</span>
                  <span className="font-mono font-medium">{tracking}</span>
                </div>
              )}
            </div>
          </div>

          {/* Próximos Passos */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Próximos Passos</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Nota fiscal será gerada automaticamente</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Comprovante será enviado para seu e-mail</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Sua encomenda será liberada para entrega</span>
              </div>
            </div>
          </div>

                     {/* Informações da Alfândega */}
           {customsOffice && (
             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
               <h3 className="font-semibold text-blue-800 mb-3">
                 Órgão Tributador (Contato e Endereço)
               </h3>
               <div className="space-y-1 text-sm text-blue-700">
                 <p><strong>{customsOffice.nome}</strong></p>
                 <p>Telefone: {customsOffice.telefone}</p>
                 <p>{customsOffice.endereco}</p>
               </div>
               <div className="mt-4 space-y-1 text-sm text-blue-700">
                 <p><strong>Receita Federal do Brasil</strong></p>
                 <p>Atendimento: 0800 978-2339</p>
               </div>
             </div>
           )}

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              onClick={() => navigate('/')}
            >
              <FileText className="h-5 w-5" />
              Rastrear Encomenda
            </button>
            <button 
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              onClick={() => navigate('/checkout')}
            >
              <Download className="h-5 w-5" />
              Nova Encomenda
            </button>
          </div>
        </Card>

        {/* Card de Suporte */}
        <Card className="w-full max-w-2xl mb-6 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
            Precisa de Ajuda?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Mail className="h-6 w-6 text-blue-600" />
              <div>
                <p className="font-medium text-blue-800">E-mail</p>
                <p className="text-sm text-blue-600">suporte@skypostal.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Phone className="h-6 w-6 text-green-600" />
              <div>
                <p className="font-medium text-green-800">Telefone</p>
                <p className="text-sm text-green-600">0800 978-2339</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <Footer />
    </>
  );
};
