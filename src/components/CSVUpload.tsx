import { useState, useRef } from 'react'
import Papa from 'papaparse'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Upload, FileText, AlertCircle, ShieldAlert } from 'lucide-react'
import { Lead } from '@/types/lead'
import { formatCPF } from '@/lib/utils'

interface CSVUploadProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onImport: (leads: Omit<Lead, 'id'>[]) => void
}

export const CSVUpload = ({ open, onOpenChange, onImport }: CSVUploadProps) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [previewData, setPreviewData] = useState<Omit<Lead, 'id'>[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith('.csv')) {
      toast({
        title: "Formato inválido",
        description: "Por favor, selecione um arquivo CSV.",
        variant: "destructive"
      })
      return
    }

    setIsProcessing(true)

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const leads: Omit<Lead, 'id'>[] = results.data.map((row: any) => ({
            name: row.Name || '',
            cpf: row.CPF || '',
            email: row.Email || '',
            telephone: row.Telephone || '',
            country: row.Country || 'Brasil',
            state: row.State || '',
            city: row.City || '',
            address: row.Address || '',
            zipcode: row.Zipcode || '',
            merchant: row.Merchant || '',
            product: row.Product || '',
            provider: row.Provider || '',
            service: row.Service || '',
            tracking: row.Tracking || '',
            providerInfo1: row['Provider Info 1'] || '',
            providerInfo2: row['Provider Info 2'] || '',
            providerInfo3: row['Provider Info 3'] || ''
          }))

          // Filter out empty rows
          let validLeads = leads.filter(lead => lead.name || lead.cpf || lead.email || lead.tracking)
          // Remove duplicados por tracking e CPF dentro do arquivo
          const seen = new Set<string>()
          validLeads = validLeads.filter(l => {
            const key = `${(l.tracking||'').toLowerCase()}|${l.cpf}`
            if (!key.trim()) return true
            if (seen.has(key)) return false
            seen.add(key)
            return true
          })

          setPreviewData(validLeads.slice(0, 5)) // Show first 5 for preview
          setIsProcessing(false)

          if (validLeads.length === 0) {
            toast({
              title: "CSV vazio",
              description: "O arquivo não contém dados válidos.",
              variant: "destructive"
            })
          }
        } catch (error) {
          console.error('Error processing CSV:', error)
          toast({
            title: "Erro ao processar CSV",
            description: "Verifique se o arquivo está no formato correto.",
            variant: "destructive"
          })
          setIsProcessing(false)
        }
      },
      error: (error) => {
        console.error('Papa Parse error:', error)
        toast({
          title: "Erro ao ler arquivo",
          description: "Não foi possível processar o arquivo CSV.",
          variant: "destructive"
        })
        setIsProcessing(false)
      }
    })
  }

  const handleImport = () => {
    if (previewData.length === 0) return

    // Process the entire file again for import
    const file = fileInputRef.current?.files?.[0]
    if (!file) return

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const leads: Omit<Lead, 'id'>[] = results.data.map((row: any) => ({
          name: row.Name || '',
          cpf: row.CPF || '',
          email: row.Email || '',
          telephone: row.Telephone || '',
          country: row.Country || 'Brasil',
          state: row.State || '',
          city: row.City || '',
          address: row.Address || '',
          zipcode: row.Zipcode || '',
          merchant: row.Merchant || '',
          product: row.Product || '',
          provider: row.Provider || '',
          service: row.Service || '',
          tracking: row.Tracking || '',
          providerInfo1: row['Provider Info 1'] || '',
          providerInfo2: row['Provider Info 2'] || '',
          providerInfo3: row['Provider Info 3'] || ''
        }))

        // Filtra vazios e remove duplicados internos
        let validLeads = leads.filter(lead => lead.name || lead.cpf || lead.email || lead.tracking)
        const seen = new Set<string>()
        validLeads = validLeads.filter(l => {
          const key = `${(l.tracking||'').toLowerCase()}|${l.cpf}`
          if (!key.trim()) return true
          if (seen.has(key)) return false
          seen.add(key)
          return true
        })

        onImport(validLeads)
        setPreviewData([])
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      }
    })
  }

  const handleCancel = () => {
    setPreviewData([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Importar Leads via CSV</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Instructions */}
          <div className="bg-surface border border-border rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-text-primary mb-2">
                  Formato do arquivo CSV
                </h4>
                <p className="text-sm text-text-secondary mb-3">
                  O arquivo deve conter as seguintes colunas (primeira linha como cabeçalho):
                </p>
                <code className="block text-xs bg-white border rounded p-2 overflow-x-auto">
                  Name,CPF,Email,Telephone,Country,State,City,Address,Zipcode,Merchant,Product,Provider,Service,Tracking,Provider Info 1,Provider Info 2,Provider Info 3
                </code>
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="mx-auto h-12 w-12 text-text-secondary mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">
                Selecionar arquivo CSV
              </h3>
              <p className="text-text-secondary mb-4">
                Escolha um arquivo .csv do seu computador
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                disabled={isProcessing}
              >
                <FileText className="w-4 h-4 mr-2" />
                {isProcessing ? 'Processando...' : 'Escolher Arquivo'}
              </Button>
            </div>
          </div>

          {/* Preview */}
          {previewData.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium text-text-primary">
                Prévia dos dados (primeiros 5 registros)
              </h4>
              <div className="bg-surface border border-border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-3 py-2 text-left">Nome</th>
                        <th className="px-3 py-2 text-left">CPF</th>
                        <th className="px-3 py-2 text-left">Email</th>
                        <th className="px-3 py-2 text-left">Telefone</th>
                        <th className="px-3 py-2 text-left">Tracking</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.map((lead, index) => (
                        <tr key={index} className="border-t border-border">
                          <td className="px-3 py-2">{lead.name}</td>
                          <td className="px-3 py-2">{formatCPF(lead.cpf)}</td>
                          <td className="px-3 py-2">{lead.email}</td>
                          <td className="px-3 py-2">{lead.telephone}</td>
                          <td className="px-3 py-2">
                            <code className="bg-muted px-1 rounded text-xs">
                              {lead.tracking}
                            </code>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <ShieldAlert className="h-4 w-4" />
                Duplicados por Tracking/CPF dentro do arquivo são ignorados automaticamente.
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
            <Button
              variant="skypostal"
              onClick={handleImport}
              disabled={previewData.length === 0 || isProcessing}
            >
              Importar {previewData.length > 0 ? `${previewData.length} Leads` : ''}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}