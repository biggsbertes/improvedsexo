import { useState, useEffect } from 'react';
import { localImageGenerator } from '@/lib/localImageGenerator';
import type { Lead } from '@/types/lead';
import { RefreshCw, ZoomIn } from 'lucide-react';
import { ImageModal } from './ImageModal';


interface ProductImageDisplayProps {
  lead: Lead | null;
}

export const ProductImageDisplay = ({ lead }: ProductImageDisplayProps) => {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    console.log('🔄 ProductImageDisplay useEffect executado, lead:', lead);
    
    if (lead && !generatedImage) {
      // Se o lead já tem uma imagem personalizada, usar ela
      if (lead.productImage) {
        console.log('✅ Usando imagem existente do lead:', lead.productImage);
        setGeneratedImage(lead.productImage);
        return;
      }
      
      // Caso contrário, gerar uma nova imagem localmente
      generateImageLocally();
    }
  }, [lead, generatedImage]);



  const generateImageLocally = async () => {
    if (!lead) return;
    
    console.log('🎨 LocalImageGenerator: Gerando nova imagem personalizada para:', lead.name);
    setIsGenerating(true);
    setGenerationError(null);
    
    try {
      // Gerar imagem localmente com posições padrão fixas
      const imageUrl = await localImageGenerator.generateProductImage(lead);
      
      console.log('✅ LocalImageGenerator: Imagem gerada com sucesso');
      setGeneratedImage(imageUrl);
      
    } catch (error) {
      console.error('❌ LocalImageGenerator falhou:', error);
      setGenerationError('Erro na geração da imagem');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRetryGeneration = () => {
    setGeneratedImage(null);
    setGenerationError(null);
    generateImageLocally();
  };



  console.log('🎭 Renderizando ProductImageDisplay:', { lead, generatedImage, isGenerating, generationError });

  const handleImageClick = () => {
    if (generatedImage) {
      setIsModalOpen(true);
    }
  };

  if (isGenerating) {
    return (
      <div className="w-full h-48 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-sm">Carregando imagem do banco de dados...</p>
          <p className="text-xs text-gray-400 mt-1">Isso pode levar alguns segundos</p>
        </div>
      </div>
    );
  }

  if (generationError) {
    return (
      <div className="w-full h-48 bg-red-50 rounded-lg border border-red-200 flex items-center justify-center">
        <div className="text-center text-red-600">
          <svg className="w-12 h-12 mx-auto mb-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p className="text-sm font-medium">Erro no banco de dados</p>
          <p className="text-xs mt-1">{generationError}</p>
          <button
            onClick={handleRetryGeneration}
            className="mt-2 px-3 py-1 bg-red-600 text-white text-xs rounded-full hover:bg-red-700 transition-colors flex items-center gap-1 mx-auto"
          >
            <RefreshCw className="h-3 w-3" />
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (generatedImage) {
    console.log('🖼️ Exibindo imagem:', generatedImage);
    return (
      <>
        <div className="relative group cursor-pointer" onClick={handleImageClick}>
          <img 
            src={generatedImage} 
            alt={`Produto personalizado para: ${lead?.name}`}
            className="w-full max-w-2xl mx-auto h-auto max-h-96 object-contain rounded-lg border border-gray-200 shadow-sm transition-transform duration-200 group-hover:scale-105"
            onError={(e) => {
              console.error('❌ Erro ao carregar imagem:', e);
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
              target.alt = 'Imagem não disponível';
            }}
            onLoad={() => {
              console.log('✅ Imagem carregada com sucesso:', generatedImage);
            }}
          />
          
          {/* Overlay com ícone de zoom */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 rounded-lg flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 rounded-full p-2">
              <ZoomIn className="h-6 w-6 text-gray-700" />
            </div>
          </div>
          

          
          {/* Indicador de clique */}
          <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Clique para ampliar
          </div>
        </div>

        {/* Modal de visualização */}
        <ImageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          imageSrc={generatedImage}
          imageAlt={`Produto personalizado para: ${lead?.name}`}
        />


      </>
    );
  }

  // Fallback quando não há lead ou imagem
  console.log('📭 Fallback: sem imagem para exibir');
  return (
    <div className="w-full h-48 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
      <div className="text-center text-gray-500">
        <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-sm">Foto não disponível</p>
        <p className="text-xs mt-1">Lead: {lead ? 'Sim' : 'Não'}</p>
        <p className="text-xs">Imagem: {generatedImage || 'Nenhuma'}</p>
      </div>
    </div>
  );
};
