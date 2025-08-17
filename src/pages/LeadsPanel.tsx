import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { useLeadsStore } from '@/stores/leadsStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AddLeadModal } from '@/components/AddLeadModal'
import { EditLeadModal } from '@/components/EditLeadModal'
import { CSVUpload } from '@/components/CSVUpload'
import { LeadsTable } from '@/components/LeadsTable'
import { OrdersTable } from '@/components/OrdersTable'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { useOrdersStore } from '@/stores/ordersStore'
import { ordersRepository } from '@/lib/ordersRepository'

import { OrdersDashboard } from '@/components/OrdersDashboard'
import { startOrdersRealtime } from '@/lib/realtime'
import { Header } from '@/components/Header'
import { LogOut, Upload, Plus, Search, Moon, Sun, Clock, ArrowUpDown } from 'lucide-react'
import { Lead } from '@/types/lead'
import { useToast } from '@/hooks/use-toast'
import { leadsRepository } from '@/lib/leadsRepository'
import { Tabs as UITabs } from '@/components/ui/tabs'


export const LeadsPanel = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { isAuthenticated, logout } = useAuthStore()
  const { 
    searchTerm, 
    setSearchTerm, 
    leads, 
    setLeads,
    isLoading,
    setIsLoading,
    dateFrom,
    dateTo,
    setDateRange,
    sortBy,
    sortDir,
    setSort
  } = useLeadsStore()
  
  const [showAddModal, setShowAddModal] = useState(false)
  const { setOrders, setFilter, filter, orders } = useOrdersStore()
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)
  const [showCSVUpload, setShowCSVUpload] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  // Settings state
  const [settingsLoading, setSettingsLoading] = useState(false)
  const [apiBase, setApiBase] = useState('https://api.novaera-pagamentos.com/api/v1/transactions')
  const [sk, setSk] = useState('')
  const [pk, setPk] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPassword2, setNewPassword2] = useState('')


  useEffect(() => {
    const init = async () => {
      if (!isAuthenticated) {
        navigate('/login')
        return
      }
      setIsLoading(true)
      const all = await leadsRepository.listAll()
      setLeads(all)
      // carregar pedidos
      const allOrders = await ordersRepository.listAll()
      setOrders(allOrders)
      

      
      setIsLoading(false)
    }
    void init()

    // Realtime simples por polling com toast
    const stop = startOrdersRealtime(4000)
    return () => stop()
  }, [isAuthenticated, navigate, setIsLoading, setLeads, setOrders])



  const handleLogout = () => {
    logout()
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado do sistema.",
    })
    navigate('/login')
  }

  const handleEditLead = (lead: Lead) => {
    setEditingLead(lead)
    setShowEditModal(true)
  }

  const handleDeleteLead = (leadId: number) => {
    void leadsRepository.deleteOne(leadId)
    const updatedLeads = leads.filter(lead => lead.id !== leadId)
    setLeads(updatedLeads)
    toast({
      title: "Lead excluído",
      description: "O lead foi removido com sucesso.",
    })
  }

  const handleClearLeads = () => {
    void leadsRepository.clearAll().then(() => {
      setLeads([])
      toast({ title: 'Leads limpos', description: 'Todos os leads foram removidos.' })
    })
  }

  const handleAddLead = (leadData: Omit<Lead, 'id'>) => {
    void leadsRepository.addOne(leadData).then((created) => {
      const updatedLeads = [...leads, created]
      setLeads(updatedLeads)
      setShowAddModal(false)
      toast({
        title: "Lead adicionado",
        description: "O lead foi criado com sucesso.",
      })
    })
  }

  const handleUpdateLead = (leadData: Lead) => {
    void leadsRepository.updateOne(leadData).then(() => {
      const updatedLeads = leads.map(lead => 
        lead.id === leadData.id ? leadData : lead
      )
      setLeads(updatedLeads)
      setShowEditModal(false)
      setEditingLead(null)
      toast({
        title: "Lead atualizado",
        description: "Os dados foram salvos com sucesso.",
      })
    })
  }

  const handleCSVImport = (importedLeads: Omit<Lead, 'id'>[]) => {
    void leadsRepository.addMany(importedLeads).then((created) => {
      const updatedLeads = [...leads, ...created]
      setLeads(updatedLeads)
      setShowCSVUpload(false)
      toast({
        title: "CSV importado",
        description: `${created.length} leads foram importados com sucesso.`,
      })
    })
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-surface'}`}>
      {/* Header */}
      <Header onLogout={handleLogout} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Actions Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${
                isDarkMode ? 'text-gray-400' : 'text-text-secondary'
              }`} />
              <Input
                placeholder="Buscar por nome, CPF ou código de rastreamento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-12 h-12 text-base transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  isDarkMode 
                    ? 'bg-gray-700 text-white border-gray-600 placeholder:text-gray-400' 
                    : 'bg-white text-gray-700 border-border placeholder:text-gray-500'
                }`}
              />
            </div>
          </div>
          
          {/* Filters/Sort */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Clock className={`h-4 w-4 ${isDarkMode ? 'text-gray-300' : 'text-text-secondary'}`} />
              <input
                type="date"
                value={dateFrom || ''}
                onChange={(e) => setDateRange(e.target.value || undefined, dateTo)}
                className={`h-10 rounded-md border px-2 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
              />
              <span className={`${isDarkMode ? 'text-gray-300' : 'text-text-secondary'}`}>até</span>
              <input
                type="date"
                value={dateTo || ''}
                onChange={(e) => setDateRange(dateFrom, e.target.value || undefined)}
                className={`h-10 rounded-md border px-2 ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
              />
            </div>
            <Button
              onClick={() => setSort('created_at', sortBy==='created_at' && sortDir==='asc' ? 'desc' : 'asc')}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <ArrowUpDown className="w-4 h-4" />
              Data {sortBy==='created_at' ? (sortDir==='asc' ? '↑' : '↓') : ''}
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setIsDarkMode(!isDarkMode)}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {isDarkMode ? 'Claro' : 'Escuro'}
            </Button>
            
            <Button
              onClick={() => setShowCSVUpload(true)}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Importar CSV
            </Button>

            <Button
              onClick={handleClearLeads}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              Limpar Leads
            </Button>
            
            <Button
              onClick={() => setShowAddModal(true)}
              variant="skypostal"
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Adicionar Lead
            </Button>
            

            

            
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </div>
        </div>

        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <TabsTrigger 
              value="leads"
              className={`transition-colors duration-200 ${
                isDarkMode 
                  ? 'data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-300' 
                  : 'data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700'
              }`}
            >
              Leads
            </TabsTrigger>

            <TabsTrigger 
              value="orders"
              className={`transition-colors duration-200 ${
                isDarkMode 
                  ? 'data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-300' 
                  : 'data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700'
              }`}
            >
              Pedidos
            </TabsTrigger>

            <TabsTrigger 
              value="settings"
              className={`transition-colors duration-200 ${
                isDarkMode 
                  ? 'data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-300' 
                  : 'data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700'
              }`}
            >
              Configurações
            </TabsTrigger>

          </TabsList>

          <TabsContent value="leads" className="space-y-4">
            <LeadsTable
              onEdit={handleEditLead}
              onDelete={handleDeleteLead}
              isLoading={isLoading}
              isDarkMode={isDarkMode}
            />
          </TabsContent>



          <TabsContent value="orders" className="space-y-4">
            {/* Dashboard de Métricas */}
            <OrdersDashboard 
              orders={orders} 
              isDarkMode={isDarkMode} 
            />
            
            <div className={`rounded-lg border p-4 shadow-sm transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-border'
            }`}>
              <div className="flex items-center gap-3">
                <span className={`text-base font-semibold transition-colors duration-200 ${
                  isDarkMode ? 'text-white' : 'text-text-primary'
                }`}>
                  Filtrar por Status:
                </span>
                <div className="flex flex-wrap gap-2">
                  {['all','pending','approved','cancelled','expired','refunded'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setFilter(s as any)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                        filter === s 
                          ? 'bg-blue-600 text-white border-blue-700 shadow-md' 
                          : isDarkMode
                            ? 'bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600 hover:border-gray-500'
                            : 'bg-white text-text-primary border-border hover:bg-surface hover:border-blue-300'
                      }`}
                    >
                      {s === 'all' ? 'Todos' : 
                       s === 'pending' ? 'Pendente' :
                       s === 'approved' ? 'Aprovado' :
                       s === 'cancelled' ? 'Cancelado' :
                       s === 'expired' ? 'Expirado' :
                       s === 'refunded' ? 'Reembolsado' : s}
                    </button>
                  ))}
                </div>
                <div className="ml-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      void ordersRepository.clearAll().then(() => {
                        setOrders([])
                        toast({ title: 'Pedidos limpos', description: 'Todos os pedidos foram removidos.' })
                      })
                    }}
                  >
                    Limpar Pedidos
                  </Button>
                </div>
              </div>
            </div>
            <OrdersTable isDarkMode={isDarkMode} />
          </TabsContent>


          <TabsContent value="settings" className="space-y-6">
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-border'} rounded-lg border p-4 shadow-sm transition-colors duration-200`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className={`${isDarkMode ? 'text-white' : 'text-text-primary'} text-lg font-semibold`}>Pagamentos (NovaEra)</h3>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-text-secondary'}`}>Atualize as chaves SK/PK.</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    try {
                      setSettingsLoading(true)
                      const res = await fetch('/api/settings')
                      if (res.ok) {
                        const s = await res.json()
                        setApiBase('https://api.novaera-pagamentos.com/api/v1/transactions')
                        if (s?.payment?.skMasked || s?.payment?.pkMasked) {
                          toast({ title: 'Chaves carregadas', description: `SK: ${s.payment.skMasked || '-'} • PK: ${s.payment.pkMasked || '-'}` })
                        }
                      }
                    } catch {}
                    finally { setSettingsLoading(false) }
                  }}
                >
                  {settingsLoading ? 'Carregando...' : 'Carregar atuais'}
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input placeholder="API Base" value={apiBase} readOnly className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''} />
                <Input placeholder="SK (sk_userKey)" value={sk} onChange={(e) => setSk(e.target.value)} className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''} />
                <Input placeholder="PK (pk_userKey)" value={pk} onChange={(e) => setPk(e.target.value)} className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''} />
              </div>
              <div className="mt-3">
                <Button
                  onClick={async () => {
                    try {
                      setSettingsLoading(true)
                      const res = await fetch('/api/settings/payment', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ sk: sk || undefined, pk: pk || undefined })
                      })
                      if (res.ok) {
                        setSk(''); setPk('')
                        toast({ title: 'Configurações salvas', description: 'Pagamentos atualizados.' })
                      } else {
                        toast({ title: 'Falha ao salvar', description: await res.text(), variant: 'destructive' })
                      }
                    } catch (e: any) {
                      toast({ title: 'Erro', description: e?.message || 'Falha ao salvar', variant: 'destructive' })
                    } finally {
                      setSettingsLoading(false)
                    }
                  }}
                >
                  Salvar
                </Button>
              </div>
            </div>

            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-border'} rounded-lg border p-4 shadow-sm transition-colors duration-200`}>
              <h3 className={`${isDarkMode ? 'text-white' : 'text-text-primary'} text-lg font-semibold mb-2`}>Segurança</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Input placeholder="Senha atual (se houver)" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''} />
                <Input placeholder="Nova senha (mín. 8)" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''} />
                <Input placeholder="Confirmar nova senha" type="password" value={newPassword2} onChange={(e) => setNewPassword2(e.target.value)} className={isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : ''} />
              </div>
              <div className="mt-3">
                <Button
                  onClick={async () => {
                    if (!newPassword || newPassword.length < 8) {
                      toast({ title: 'Senha fraca', description: 'Use pelo menos 8 caracteres.', variant: 'destructive' }); return
                    }
                    if (newPassword !== newPassword2) {
                      toast({ title: 'Senhas diferentes', description: 'Confirmação não confere.', variant: 'destructive' }); return
                    }
                    try {
                      setSettingsLoading(true)
                      const res = await fetch('/api/settings/admin-password', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ oldPassword: oldPassword || undefined, newPassword })
                      })
                      if (res.ok) {
                        setOldPassword(''); setNewPassword(''); setNewPassword2('')
                        toast({ title: 'Senha atualizada', description: 'Use a nova senha no próximo login.' })
                      } else {
                        const t = await res.json().catch(() => ({}))
                        toast({ title: 'Falha ao atualizar', description: t?.error || 'Erro', variant: 'destructive' })
                      }
                    } catch (e: any) {
                      toast({ title: 'Erro', description: e?.message || 'Falha ao atualizar', variant: 'destructive' })
                    } finally {
                      setSettingsLoading(false)
                    }
                  }}
                >
                  Alterar senha
                </Button>
              </div>
            </div>
          </TabsContent>

        </Tabs>
      </main>

      {/* Modals */}
      <AddLeadModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onSubmit={handleAddLead}
      />
      
      <EditLeadModal
        open={showEditModal}
        onOpenChange={setShowEditModal}
        lead={editingLead}
        onSubmit={handleUpdateLead}
      />
      
      <CSVUpload
        open={showCSVUpload}
        onOpenChange={setShowCSVUpload}
        onImport={handleCSVImport}
      />
    </div>
  )
}