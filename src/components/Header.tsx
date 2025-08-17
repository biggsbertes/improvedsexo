import { Logo } from './Logo';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';

interface HeaderProps {
  onLogout?: () => void;
}

export const Header = ({ onLogout }: HeaderProps) => {
  return (
    <header className="w-full bg-white border-b border-border-light shadow-sm relative z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex justify-center flex-1">
            <Logo size="md" />
          </div>
          {onLogout && (
            <Button
              onClick={onLogout}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
