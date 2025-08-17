import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Lead } from '@/types/lead'

interface EditLeadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  lead: Lead | null
  onSubmit: (lead: Lead) => void
}

export const EditLeadModal = ({ open, onOpenChange, lead, onSubmit }: EditLeadModalProps) => {
  const [formData, setFormData] = useState<Lead>({
    id: 0,
    name: '',
    cpf: '',
    email: '',
    telephone: '',
    country: 'Brasil',
    state: '',
    city: '',
    address: '',
    zipcode: '',
    merchant: '',
    product: '',
    provider: '',
    service: '',
    tracking: '',
    providerInfo1: '',
    providerInfo2: '',
    providerInfo3: ''
  })

  useEffect(() => {
    if (lead) {
      setFormData(lead)
    }
  }, [lead])

  const handleInputChange = (field: keyof Lead, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const isFormValid = formData.name && formData.cpf && formData.email && formData.telephone

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Lead</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="edit-name" className="text-text-primary font-medium">
                Nome Completo *
              </Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Digite o nome completo"
                className="h-11 bg-surface border-border focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-cpf" className="text-text-primary font-medium">
                CPF *
              </Label>
              <Input
                id="edit-cpf"
                value={formData.cpf}
                onChange={(e) => handleInputChange('cpf', e.target.value)}
                placeholder="000.000.000-00"
                className="h-11 bg-surface border-border focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-email" className="text-text-primary font-medium">
                Email *
              </Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="email@exemplo.com"
                className="h-11 bg-surface border-border focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-telephone" className="text-text-primary font-medium">
                Telefone *
              </Label>
              <Input
                id="edit-telephone"
                value={formData.telephone}
                onChange={(e) => handleInputChange('telephone', e.target.value)}
                placeholder="(11) 99999-9999"
                className="h-11 bg-surface border-border focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-country" className="text-text-primary font-medium">
                País
              </Label>
              <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                <SelectTrigger className="h-11 bg-surface border-border">
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
              <Label htmlFor="edit-state" className="text-text-primary font-medium">
                Estado
              </Label>
              <Input
                id="edit-state"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                placeholder="São Paulo"
                className="h-11 bg-surface border-border focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-city" className="text-text-primary font-medium">
                Cidade
              </Label>
              <Input
                id="edit-city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="São Paulo"
                className="h-11 bg-surface border-border focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-zipcode" className="text-text-primary font-medium">
                CEP
              </Label>
              <Input
                id="edit-zipcode"
                value={formData.zipcode}
                onChange={(e) => handleInputChange('zipcode', e.target.value)}
                placeholder="00000-000"
                className="h-11 bg-surface border-border focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-address" className="text-text-primary font-medium">
                Endereço
              </Label>
              <Input
                id="edit-address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Rua, número, bairro"
                className="h-11 bg-surface border-border focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-merchant" className="text-text-primary font-medium">
                Loja/Merchant
              </Label>
              <Input
                id="edit-merchant"
                value={formData.merchant}
                onChange={(e) => handleInputChange('merchant', e.target.value)}
                placeholder="Nome da loja"
                className="h-11 bg-surface border-border focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-product" className="text-text-primary font-medium">
                Produto
              </Label>
              <Input
                id="edit-product"
                value={formData.product}
                onChange={(e) => handleInputChange('product', e.target.value)}
                placeholder="Descrição do produto"
                className="h-11 bg-surface border-border focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-provider" className="text-text-primary font-medium">
                Provedor
              </Label>
              <Input
                id="edit-provider"
                value={formData.provider}
                onChange={(e) => handleInputChange('provider', e.target.value)}
                placeholder="Provedor de envio"
                className="h-11 bg-surface border-border focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-service" className="text-text-primary font-medium">
                Serviço
              </Label>
              <Input
                id="edit-service"
                value={formData.service}
                onChange={(e) => handleInputChange('service', e.target.value)}
                placeholder="Tipo de serviço"
                className="h-11 bg-surface border-border focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-tracking" className="text-text-primary font-medium">
                Código de Rastreamento
              </Label>
              <Input
                id="edit-tracking"
                value={formData.tracking}
                onChange={(e) => handleInputChange('tracking', e.target.value)}
                placeholder="ABC123456789"
                className="h-11 bg-surface border-border focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-providerInfo1" className="text-text-primary font-medium">
                Provider Info 1
              </Label>
              <Input
                id="edit-providerInfo1"
                value={formData.providerInfo1}
                onChange={(e) => handleInputChange('providerInfo1', e.target.value)}
                placeholder="Informação adicional"
                className="h-11 bg-surface border-border focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-providerInfo2" className="text-text-primary font-medium">
                Provider Info 2
              </Label>
              <Input
                id="edit-providerInfo2"
                value={formData.providerInfo2}
                onChange={(e) => handleInputChange('providerInfo2', e.target.value)}
                placeholder="Informação adicional"
                className="h-11 bg-surface border-border focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-providerInfo3" className="text-text-primary font-medium">
                Provider Info 3
              </Label>
              <Input
                id="edit-providerInfo3"
                value={formData.providerInfo3}
                onChange={(e) => handleInputChange('providerInfo3', e.target.value)}
                placeholder="Informação adicional"
                className="h-11 bg-surface border-border focus:border-primary"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="skypostal"
              disabled={!isFormValid}
            >
              Salvar Alterações
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}