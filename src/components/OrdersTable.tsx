import { useMemo } from 'react'
import { useOrdersStore } from '@/stores/ordersStore'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

function formatBRL(cents: number): string {
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const statusColor: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  expired: 'bg-gray-100 text-gray-800',
  refunded: 'bg-blue-100 text-blue-800',
}

interface OrdersTableProps {
  isDarkMode: boolean
}

export const OrdersTable = ({ isDarkMode }: OrdersTableProps) => {
  const { filteredOrders } = useOrdersStore()
  const orders = filteredOrders()

  if (orders.length === 0) {
    return (
      <Card className={`border p-6 text-center transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700 text-gray-300' 
          : 'bg-white border-border-light text-text-secondary'
      }`}>
        Nenhum pedido encontrado para o filtro selecionado.
      </Card>
    )
  }

  return (
    <div className={`rounded-lg border shadow-sm overflow-hidden transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-border'
    }`}>
      <div className={`grid grid-cols-6 gap-2 px-4 py-4 text-sm font-semibold uppercase tracking-wide transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-gray-700 text-white' 
          : 'bg-surface-light text-text-primary'
      }`}>
        <div>Data</div>
        <div>Rastreamento</div>
        <div>Valor</div>
        <div>Método</div>
        <div>Status</div>
        <div>Cliente</div>
      </div>
      <div className={`divide-y transition-colors duration-200 ${
        isDarkMode ? 'divide-gray-700' : 'divide-border-light'
      }`}>
        {orders.map(o => (
          <div key={o.id} className={`grid grid-cols-6 gap-2 px-4 py-3 text-sm transition-colors duration-200 ${
            isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
          }`}>
            <div className={`transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300' : 'text-text-secondary'
            }`}>{o.created_at ? new Date(o.created_at).toLocaleString('pt-BR') : '-'}</div>
            <div className={`font-medium transition-colors duration-200 ${
              isDarkMode ? 'text-white' : 'text-text-primary'
            }`}>{o.tracking || '-'}</div>
            <div className={`transition-colors duration-200 ${
              isDarkMode ? 'text-white' : 'text-text-primary'
            }`}>{formatBRL(o.amount)}</div>
            <div className={`uppercase transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300' : 'text-text-secondary'
            }`}>{o.paymentMethod}</div>
            <div>
              <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor[o.status] || 'bg-gray-100 text-gray-800'}`}>{o.status}</span>
            </div>
            <div className={`truncate transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300' : 'text-text-secondary'
            }`}>{o.customerName || '-'}</div>
          </div>
        ))}
      </div>
    </div>
  )
}


