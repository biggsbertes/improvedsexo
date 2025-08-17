import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

interface CustomerFormProps {
  onSubmit: (data: CustomerData) => void;
  trackingCode: string;
}

export const CustomerForm = ({ onSubmit, trackingCode }: CustomerFormProps) => {
  const [formData, setFormData] = useState<CustomerData>({
    name: "",
    cpf: "",
    email: "",
    telephone: "",
    country: "Brasil",
    state: "",
    city: "",
    address: "",
    zipcode: "",
    merchant: "",
    product: "",
    provider: "",
    service: "",
    tracking: trackingCode,
    providerInfo1: "",
    providerInfo2: "",
    providerInfo3: "",
  });

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isFormValid = formData.name && formData.cpf && formData.email && formData.telephone;

  return (
    <div className="w-full max-w-2xl mx-auto animate-slide-up">
      <div className="bg-white rounded-lg shadow-sm border border-border-light p-8">
        <h2 className="text-2xl font-semibold text-text-primary mb-6">
          Dados do Cliente
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-text-primary font-medium">
                Nome Completo *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Digite seu nome completo"
                className="h-11 bg-surface-light border-border-light focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf" className="text-text-primary font-medium">
                CPF *
              </Label>
              <Input
                id="cpf"
                value={formData.cpf}
                onChange={(e) => handleInputChange("cpf", e.target.value)}
                placeholder="000.000.000-00"
                className="h-11 bg-surface-light border-border-light focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-text-primary font-medium">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="seu@email.com"
                className="h-11 bg-surface-light border-border-light focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telephone" className="text-text-primary font-medium">
                Telefone *
              </Label>
              <Input
                id="telephone"
                value={formData.telephone}
                onChange={(e) => handleInputChange("telephone", e.target.value)}
                placeholder="(11) 99999-9999"
                className="h-11 bg-surface-light border-border-light focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country" className="text-text-primary font-medium">
                País
              </Label>
              <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                <SelectTrigger className="h-11 bg-surface-light border-border-light">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Brasil">Brasil</SelectItem>
                  <SelectItem value="Estados Unidos">Estados Unidos</SelectItem>
                  <SelectItem value="Argentina">Argentina</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="state" className="text-text-primary font-medium">
                Estado
              </Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                placeholder="São Paulo"
                className="h-11 bg-surface-light border-border-light focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-text-primary font-medium">
                Cidade
              </Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                placeholder="São Paulo"
                className="h-11 bg-surface-light border-border-light focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipcode" className="text-text-primary font-medium">
                CEP
              </Label>
              <Input
                id="zipcode"
                value={formData.zipcode}
                onChange={(e) => handleInputChange("zipcode", e.target.value)}
                placeholder="00000-000"
                className="h-11 bg-surface-light border-border-light focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-text-primary">
              Informações do Produto
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="address" className="text-text-primary font-medium">
                  Endereço
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Rua, número, bairro"
                  className="h-11 bg-surface-light border-border-light focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="merchant" className="text-text-primary font-medium">
                  Loja/Merchant
                </Label>
                <Input
                  id="merchant"
                  value={formData.merchant}
                  onChange={(e) => handleInputChange("merchant", e.target.value)}
                  placeholder="Nome da loja"
                  className="h-11 bg-surface-light border-border-light focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="product" className="text-text-primary font-medium">
                  Produto
                </Label>
                <Input
                  id="product"
                  value={formData.product}
                  onChange={(e) => handleInputChange("product", e.target.value)}
                  placeholder="Descrição do produto"
                  className="h-11 bg-surface-light border-border-light focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="provider" className="text-text-primary font-medium">
                  Provedor
                </Label>
                <Input
                  id="provider"
                  value={formData.provider}
                  onChange={(e) => handleInputChange("provider", e.target.value)}
                  placeholder="Provedor de envio"
                  className="h-11 bg-surface-light border-border-light focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service" className="text-text-primary font-medium">
                  Serviço
                </Label>
                <Input
                  id="service"
                  value={formData.service}
                  onChange={(e) => handleInputChange("service", e.target.value)}
                  placeholder="Tipo de serviço"
                  className="h-11 bg-surface-light border-border-light focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tracking" className="text-text-primary font-medium">
                  Código de Rastreamento
                </Label>
                <Input
                  id="tracking"
                  value={formData.tracking}
                  onChange={(e) => handleInputChange("tracking", e.target.value)}
                  className="h-11 bg-surface-light border-border-light focus:border-primary"
                  readOnly
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="providerInfo1" className="text-text-primary font-medium">
                  Provider Info 1
                </Label>
                <Input
                  id="providerInfo1"
                  value={formData.providerInfo1}
                  onChange={(e) => handleInputChange("providerInfo1", e.target.value)}
                  placeholder="Informação adicional"
                  className="h-11 bg-surface-light border-border-light focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="providerInfo2" className="text-text-primary font-medium">
                  Provider Info 2
                </Label>
                <Input
                  id="providerInfo2"
                  value={formData.providerInfo2}
                  onChange={(e) => handleInputChange("providerInfo2", e.target.value)}
                  placeholder="Informação adicional"
                  className="h-11 bg-surface-light border-border-light focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="providerInfo3" className="text-text-primary font-medium">
                  Provider Info 3
                </Label>
                <Input
                  id="providerInfo3"
                  value={formData.providerInfo3}
                  onChange={(e) => handleInputChange("providerInfo3", e.target.value)}
                  placeholder="Informação adicional"
                  className="h-11 bg-surface-light border-border-light focus:border-primary"
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border-light p-4">
        <div className="max-w-2xl mx-auto">
          <Button 
            onClick={handleSubmit}
            variant="skypostal"
            size="lg"
            className="w-full h-12 text-base font-medium"
            disabled={!isFormValid}
          >
            Continuar para Pagamento
          </Button>
        </div>
      </div>
    </div>
  );
};