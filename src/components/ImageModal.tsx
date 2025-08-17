import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
}

export const ImageModal = ({ 
  isOpen, 
  onClose, 
  imageSrc, 
  imageAlt 
}: ImageModalProps) => {
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-[90vw] p-0 bg-white border-0">
        <div className="relative">
          {/* Botão de fechar */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-2 right-2 z-50 bg-black/20 hover:bg-black/40 text-white border border-white/30"
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Imagem */}
          <div className="p-4">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-auto object-contain rounded-lg shadow-lg"
              style={{ 
                objectFit: 'contain'
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};



