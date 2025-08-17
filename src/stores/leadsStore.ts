import { create } from 'zustand'
import { Lead } from '@/types/lead'

interface LeadsState {
  leads: Lead[]
  searchTerm: string
  currentPage: number
  itemsPerPage: number
  isLoading: boolean
  // filtros e ordenação
  sortBy: 'created_at' | 'name' | 'tracking'
  sortDir: 'asc' | 'desc'
  dateFrom?: string
  dateTo?: string
  // seleção em massa
  selectedLeadIds: Set<number>
  setLeads: (leads: Lead[]) => void
  setSearchTerm: (term: string) => void
  setCurrentPage: (page: number) => void
  setIsLoading: (loading: boolean) => void
  setSort: (by: LeadsState['sortBy'], dir: LeadsState['sortDir']) => void
  setDateRange: (from?: string, to?: string) => void
  toggleSelect: (id: number) => void
  clearSelection: () => void
  selectMany: (ids: number[]) => void
  isSelected: (id: number) => boolean
  selectedIds: () => number[]
  filteredLeads: () => Lead[]
  paginatedLeads: () => Lead[]
  totalPages: () => number
}

export const useLeadsStore = create<LeadsState>((set, get) => ({
  leads: [],
  searchTerm: '',
  currentPage: 1,
  itemsPerPage: 10,
  isLoading: false,
  sortBy: 'created_at',
  sortDir: 'desc',
  dateFrom: undefined,
  dateTo: undefined,
  selectedLeadIds: new Set<number>(),
  
  setLeads: (leads) => set({ leads }),
  setSearchTerm: (searchTerm) => set({ searchTerm, currentPage: 1 }),
  setCurrentPage: (currentPage) => set({ currentPage }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setSort: (sortBy, sortDir) => set({ sortBy, sortDir }),
  setDateRange: (from, to) => set({ dateFrom: from, dateTo: to, currentPage: 1 }),
  toggleSelect: (id) => set((state) => {
    const next = new Set(state.selectedLeadIds)
    if (next.has(id)) next.delete(id); else next.add(id)
    return { selectedLeadIds: next }
  }),
  clearSelection: () => set({ selectedLeadIds: new Set<number>() }),
  selectMany: (ids) => set((state) => {
    const next = new Set(state.selectedLeadIds)
    ids.forEach(id => next.add(id))
    return { selectedLeadIds: next }
  }),
  isSelected: (id) => get().selectedLeadIds.has(id),
  selectedIds: () => Array.from(get().selectedLeadIds),
  
  filteredLeads: () => {
    const { leads, searchTerm, dateFrom, dateTo, sortBy, sortDir } = get()
    let result = leads
    if (searchTerm) {
      result = result.filter(lead => 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.cpf.includes(searchTerm) ||
        lead.tracking.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (dateFrom || dateTo) {
      const fromMs = dateFrom ? new Date(dateFrom).getTime() : undefined
      const toMs = dateTo ? (new Date(dateTo).getTime() + 24*60*60*1000 - 1) : undefined
      result = result.filter(l => {
        const t = l.created_at ? new Date(l.created_at).getTime() : 0
        if (fromMs && t < fromMs) return false
        if (toMs && t > toMs) return false
        return true
      })
    }
    // sort
    const factor = sortDir === 'asc' ? 1 : -1
    result = [...result].sort((a,b) => {
      if (sortBy === 'created_at') {
        const ta = a.created_at ? Date.parse(a.created_at) : 0
        const tb = b.created_at ? Date.parse(b.created_at) : 0
        return (ta - tb) * factor
      }
      const va = (a[sortBy] || '').toString().toLowerCase()
      const vb = (b[sortBy] || '').toString().toLowerCase()
      if (va < vb) return -1 * factor
      if (va > vb) return 1 * factor
      return 0
    })
    return result
  },
  
  paginatedLeads: () => {
    const { currentPage, itemsPerPage } = get()
    const filtered = get().filteredLeads()
    const startIndex = (currentPage - 1) * itemsPerPage
    return filtered.slice(startIndex, startIndex + itemsPerPage)
  },
  
  totalPages: () => {
    const { itemsPerPage } = get()
    const filtered = get().filteredLeads()
    return Math.ceil(filtered.length / itemsPerPage)
  }
}))