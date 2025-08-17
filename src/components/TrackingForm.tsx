import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/hooks/useLanguage";
import { Language } from "@/lib/translations";

interface TrackingFormProps {
  onSubmit: (trackingCode: string, country: string) => void;
  initialValue?: string;
}

export const TrackingForm = ({ onSubmit, initialValue }: TrackingFormProps) => {
  const [trackingCode, setTrackingCode] = useState(() => {
    return initialValue || '';
  });
  const [trackingType, setTrackingType] = useState<'single' | 'multiple'>('single');
  const [selectedCountry, setSelectedCountry] = useState('br');
  const { currentLanguage, changeLanguage, t } = useLanguage();

  // Always start with Brazil selected
  useEffect(() => {
    setSelectedCountry('br');
    changeLanguage('pt');
  }, [changeLanguage]);

  // Sincroniza o valor inicial quando mudar
  useEffect(() => {
    if (initialValue && initialValue.trim() !== '') {
      setTrackingCode(initialValue);
    }
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingCode.trim()) {
      onSubmit(trackingCode.trim(), selectedCountry);
    }
  };

  const handleLanguageChange = (language: Language) => {
    changeLanguage(language);
  };

  const countries = [
    { code: "br", flag: "/flags/br.svg", language: "pt" as Language },
    { code: "us", flag: "/flags/us.svg", language: "en" as Language },
    { code: "es", flag: "/flags/es.svg", language: "es" as Language }
  ];

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <div className="bg-white rounded-2xl md:rounded-lg shadow-sm border border-border-light p-6 space-y-6">
        <div className="space-y-4">
          <h2 className="text-gray-600 text-lg font-medium text-center animate-slide-up font-poppins">
            {t('title')}
          </h2>
          <p className="text-gray-400 text-sm text-center animate-fade-in font-poppins">
            {t('subtitle')}
          </p>
          
          <div className="flex items-center justify-between">
            <RadioGroup 
              value={trackingType} 
              onValueChange={(value: 'single' | 'multiple') => setTrackingType(value)}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="single" id="single" />
                <Label htmlFor="single" className="text-gray-500 font-normal animate-fade-in font-poppins">
                  {currentLanguage === 'pt' ? 'Único' : currentLanguage === 'en' ? 'Single' : 'Único'}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="multiple" id="multiple" />
                <Label htmlFor="multiple" className="text-gray-500 font-normal animate-fade-in font-poppins">
                  {currentLanguage === 'pt' ? 'Múltiplos' : currentLanguage === 'en' ? 'Multiple' : 'Múltiples'}
                </Label>
              </div>
            </RadioGroup>

            <div className="flex items-center">
              <div className="w-px h-8 bg-gray-300 mr-4"></div>
              
              <div className="flex gap-3">
                {countries.map((country) => (
                  <div key={country.code} className="flex items-center space-x-1">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCountry(country.code);
                        handleLanguageChange(country.language);
                      }}
                      className="cursor-pointer transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-sm"
                    >
                      <img 
                        src={country.flag} 
                        alt={`Flag of ${country.code}`}
                        className={`w-6 h-4 object-cover rounded-sm border border-gray-200 transition-all duration-300 ${
                          selectedCountry === country.code ? 'ring-2 ring-blue-500 scale-110' : ''
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tracking" className="text-gray-500 text-sm font-normal animate-fade-in font-poppins">
              {t('trackingCode')}
            </Label>
            <Input
              id="tracking"
              type="text"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              placeholder={t('trackingCode')}
              className="h-12 text-base font-poppins text-gray-700 bg-white border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-colors placeholder:text-gray-400 rounded-xl md:rounded-md"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            variant="skypostal"
            size="lg"
            className="w-full h-12 text-base font-medium animate-fade-in animate-pulse-slow transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] font-poppins text-white rounded-xl md:rounded-md"
            disabled={!trackingCode.trim()}
          >
            {t('searchButton')}
          </Button>
        </form>
      </div>
    </div>
  );
};