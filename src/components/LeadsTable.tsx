import { useMemo, useState } from 'react'
import { useLeadsStore } from '@/stores/leadsStore'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Edit, Trash2, ChevronUp, ChevronDown } from 'lucide-react'
import { Lead } from '@/types/lead'
import { formatCPF } from '@/lib/utils'
import { Button as UIButton } from '@/components/ui/button'

interface LeadsTableProps {
  onEdit: (lead: Lead) => void
  onDelete: (leadId: number) => void
  isLoading: boolean
  isDarkMode: boolean
}

export const LeadsTable = ({ onEdit, onDelete, isLoading, isDarkMode }: LeadsTableProps) => {
  const {
    paginatedLeads,
    currentPage,
    setCurrentPage,
    totalPages,
    filteredLeads,
    sortBy,
    sortDir,
    setSort,
    selectedLeadIds,
    toggleSelect,
    clearSelection,
    selectedIds
  } = useLeadsStore()
  
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; lead: Lead | null }>({
    open: false,
    lead: null
  })

  const leads = paginatedLeads()
  const totalPagesCount = totalPages()
  const filteredLeadsCount = filteredLeads().length
  const allPageIds = useMemo(() => leads.map(l => l.id).filter(Boolean) as number[], [leads])
  const allSelectedOnPage = useMemo(() => allPageIds.every(id => selectedLeadIds.has(id)), [allPageIds, selectedLeadIds])

  const handleDeleteClick = (lead: Lead) => {
    setDeleteConfirm({ open: true, lead })
  }

  const handleDeleteConfirm = () => {
    if (deleteConfirm.lead?.id) {
      onDelete(deleteConfirm.lead.id)
    }
    setDeleteConfirm({ open: false, lead: null })
  }

  const renderPaginationItems = () => {
    const items = []
    const maxVisiblePages = 5
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(totalPagesCount, startPage + maxVisiblePages - 1)
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => setCurrentPage(i)}
            isActive={currentPage === i}
            className="cursor-pointer"
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }
    
    return items
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-border shadow-sm">
        <div className="p-6">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex space-x-4">
                <Skeleton className="h-12 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={`rounded-lg border shadow-sm overflow-hidden transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-border'
      }`}>
        {/* Results count and bulk actions */}
        <div className={`px-6 py-4 border-b transition-colors duration-200 ${
          isDarkMode ? 'border-gray-700' : 'border-border'
        }`}>
          <div className="flex items-center gap-3">
            <p className={`text-sm transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300' : 'text-text-secondary'
            }`}>
              {filteredLeadsCount > 0 
                ? `${filteredLeadsCount} lead${filteredLeadsCount !== 1 ? 's' : ''} encontrado${filteredLeadsCount !== 1 ? 's' : ''}`
                : 'Nenhum lead encontrado'
              }
            </p>
            {selectedLeadIds.size > 0 && (
              <div className="ml-auto flex items-center gap-2">
                <UIButton
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const ids = selectedIds()
                    ids.forEach(id => onDelete(id))
                    clearSelection()
                  }}
                >
                  Excluir selecionados ({selectedLeadIds.size})
                </UIButton>
                <UIButton variant="outline" size="sm" onClick={() => clearSelection()}>Limpar seleção</UIButton>
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className={`transition-colors duration-200 ${
                isDarkMode ? 'bg-gray-700' : 'bg-surface-light'
              }`}>
                <TableHead className={`w-10 font-semibold text-base transition-colors duration-200 ${
                  isDarkMode ? 'text-white' : 'text-text-primary'
                }`}>
                  <input
                    type="checkbox"
                    checked={allSelectedOnPage}
                    onChange={() => {
                      if (allSelectedOnPage) {
                        allPageIds.forEach(id => toggleSelect(id))
                      } else {
                        allPageIds.forEach(id => toggleSelect(id))
                      }
                    }}
                  />
                </TableHead>
                <TableHead className={`font-semibold text-base transition-colors duration-200 ${
                  isDarkMode ? 'text-white' : 'text-text-primary'
                }`}>
                  <button className="flex items-center gap-1" onClick={() => setSort('name', sortBy==='name' && sortDir==='asc' ? 'desc' : 'asc')}>
                    Nome {sortBy==='name' ? (sortDir==='asc' ? <ChevronUp className="h-4 w-4"/> : <ChevronDown className="h-4 w-4"/>) : null}
                  </button>
                </TableHead>
                <TableHead className={`font-semibold text-base transition-colors duration-200 ${
                  isDarkMode ? 'text-white' : 'text-text-primary'
                }`}>CPF</TableHead>
                <TableHead className={`font-semibold text-base transition-colors duration-200 ${
                  isDarkMode ? 'text-white' : 'text-text-primary'
                }`}>Email</TableHead>
                <TableHead className={`font-semibold text-base transition-colors duration-200 ${
                  isDarkMode ? 'text-white' : 'text-text-primary'
                }`}>Telefone</TableHead>
                <TableHead className={`font-semibold text-base transition-colors duration-200 ${
                  isDarkMode ? 'text-white' : 'text-text-primary'
                }`}>
                  <button className="flex items-center gap-1" onClick={() => setSort('tracking', sortBy==='tracking' && sortDir==='asc' ? 'desc' : 'asc')}>
                    Tracking {sortBy==='tracking' ? (sortDir==='asc' ? <ChevronUp className="h-4 w-4"/> : <ChevronDown className="h-4 w-4"/>) : null}
                  </button>
                </TableHead>
                <TableHead className={`font-semibold text-base transition-colors duration-200 ${
                  isDarkMode ? 'text-white' : 'text-text-primary'
                }`}>Provider</TableHead>
                <TableHead className={`font-semibold text-base transition-colors duration-200 ${
                  isDarkMode ? 'text-white' : 'text-text-primary'
                }`}>Produto</TableHead>
                <TableHead className={`font-semibold text-base transition-colors duration-200 ${
                  isDarkMode ? 'text-white' : 'text-text-primary'
                }`}>Merchant</TableHead>
                <TableHead className={`text-right font-semibold text-base transition-colors duration-200 ${
                  isDarkMode ? 'text-white' : 'text-text-primary'
                }`}>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className={`text-center py-8 transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-300' : 'text-text-secondary'
                  }`}>
                    Nenhum lead cadastrado
                  </TableCell>
                </TableRow>
              ) : (
                leads.map((lead) => (
                  <TableRow key={lead.id} className={`transition-colors duration-200 ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }`}>
                    <TableCell>
                      {typeof lead.id === 'number' && (
                        <input type="checkbox" checked={selectedLeadIds.has(lead.id)} onChange={() => toggleSelect(lead.id!)} />
                      )}
                    </TableCell>
                    <TableCell className={`font-semibold text-lg transition-colors duration-200 ${
                      isDarkMode ? 'text-white' : 'text-text-primary'
                    }`}>{lead.name}</TableCell>
                    <TableCell className={`transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-200' : 'text-text-primary'
                    }`}>{formatCPF(lead.cpf)}</TableCell>
                    <TableCell className={`transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-200' : 'text-text-primary'
                    }`}>{lead.email}</TableCell>
                    <TableCell className={`transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-200' : 'text-text-primary'
                    }`}>{lead.telephone}</TableCell>
                    <TableCell>
                      <code className={`px-2 py-1 rounded text-xs transition-colors duration-200 ${
                        isDarkMode 
                          ? 'bg-gray-700 text-gray-200' 
                          : 'bg-surface text-text-primary'
                      }`}>
                        {lead.tracking}
                      </code>
                    </TableCell>
                    <TableCell className={`transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-200' : 'text-text-primary'
                    }`}>{lead.provider}</TableCell>
                    <TableCell className={`transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-200' : 'text-text-primary'
                    }`}>{lead.product}</TableCell>
                    <TableCell className={`transition-colors duration-200 ${
                      isDarkMode ? 'text-gray-200' : 'text-text-primary'
                    }`}>{lead.merchant}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          onClick={() => onEdit(lead)}
                          variant="outline"
                          size="sm"
                          className={`h-8 w-8 p-0 transition-colors duration-200 ${
                            isDarkMode 
                              ? 'bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600 hover:text-white' 
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteClick(lead)}
                          variant="outline"
                          size="sm"
                          className={`h-8 w-8 p-0 transition-colors duration-200 ${
                            isDarkMode 
                              ? 'bg-gray-700 text-red-400 border-gray-600 hover:bg-gray-600 hover:text-red-300' 
                              : 'bg-white text-red-600 border-gray-300 hover:bg-gray-50 hover:text-red-700'
                          }`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPagesCount > 1 && (
          <div className={`px-6 py-4 border-t transition-colors duration-200 ${
            isDarkMode ? 'border-gray-700' : 'border-border'
          }`}>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={`transition-colors duration-200 ${
                      currentPage === 1 
                        ? 'pointer-events-none opacity-50' 
                        : isDarkMode 
                          ? 'cursor-pointer text-gray-300 hover:text-white' 
                          : 'cursor-pointer'
                    }`}
                  />
                </PaginationItem>
                
                {renderPaginationItems()}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(Math.min(totalPagesCount, currentPage + 1))}
                    className={`transition-colors duration-200 ${
                      currentPage === totalPagesCount 
                        ? 'pointer-events-none opacity-50' 
                        : isDarkMode 
                          ? 'cursor-pointer text-gray-300 hover:text-white' 
                          : 'cursor-pointer'
                    }`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirm.open} onOpenChange={(open) => !open && setDeleteConfirm({ open: false, lead: null })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o lead <strong>{deleteConfirm.lead?.name}</strong>?
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}