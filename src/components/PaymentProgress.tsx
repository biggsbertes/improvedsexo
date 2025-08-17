import { useState, useEffect } from 'react';
import { Check, FileText, Clock, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface PaymentProgressProps {
  isOpen: boolean;
  onComplete?: () => void;
  onError?: () => void;
}

type ProgressStep = {
  id: string;
  title: string;
  icon: React.ReactNode;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  message: string;
};

export const PaymentProgress = ({ isOpen, onComplete, onError }: PaymentProgressProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false);

  const steps: ProgressStep[] = [
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
      title: 'FINALIZANDO PROCESSO',
      icon: <Clock className="h-8 w-8 text-white" />,
      status: 'processing',
      progress: 100,
      message: 'Concluindo liberação'
    }
  ];

  useEffect(() => {
    if (!isOpen) return;

    let currentProgress = 0;
    let currentStepIndex = 0;

    const progressInterval = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);

      // Simular erro ocasionalmente (10% de chance)
      if (currentProgress === 75 && Math.random() < 0.1) {
        clearInterval(progressInterval);
        setHasError(true);
        setTimeout(() => {
          onError?.();
        }, 3000);
        return;
      }

      // Avançar para o próximo passo baseado no progresso
      if (currentProgress >= 25 && currentStepIndex === 0) {
        currentStepIndex = 1;
        setCurrentStep(1);
      } else if (currentProgress >= 50 && currentStepIndex === 1) {
        currentStepIndex = 2;
        setCurrentStep(2);
      } else if (currentProgress >= 75 && currentStepIndex === 2) {
        currentStepIndex = 3;
        setCurrentStep(3);
      } else if (currentProgress >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
          onComplete?.();
        }, 2000);
      }
    }, 100);

    return () => clearInterval(progressInterval);
  }, [isOpen, onComplete, onError]);

  if (!isOpen) return null;

  const currentStepData = steps[currentStep];

  // Renderizar tela de erro
  if (hasError) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="w-full max-w-md mx-4 p-8 text-center">
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
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4 p-8 text-center">
        {/* Ícone do passo atual */}
        <div className="flex justify-center mb-6">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            currentStepData.status === 'completed' ? 'bg-green-500' :
            currentStepData.status === 'error' ? 'bg-red-500' :
            'bg-blue-500'
          }`}>
            {currentStepData.icon}
          </div>
        </div>

        {/* Título do passo atual */}
        <h2 className="text-xl font-bold text-blue-600 mb-4">
          {currentStepData.title}
        </h2>

        {/* Barra de progresso */}
        <div className="mb-4">
          <Progress value={progress} className="h-2" />
        </div>

        {/* Status do progresso */}
        <p className="text-gray-600 text-sm">
          Processando... {progress}%
        </p>

        {/* Mensagem adicional */}
        <p className="text-gray-500 text-xs mt-2">
          {currentStepData.message}
        </p>
      </Card>
    </div>
  );
};
