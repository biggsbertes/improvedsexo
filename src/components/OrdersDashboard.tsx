import { useMemo } from 'react'
import { Order } from '@/types/order'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, Package, TrendingUp, Clock } from 'lucide-react'

interface OrdersDashboardProps {
  orders: Order[]
  isDarkMode: boolean
}

export const OrdersDashboard = ({ orders, isDarkMode }: OrdersDashboardProps) => {
  const metrics = useMemo(() => {
    const totalOrders = orders.length
    const paidOrders = orders.filter(order => order.status === 'approved')
    const pendingOrders = orders.filter(order => order.status === 'pending')
    
    // Calcular receita total (apenas pedidos pagos)
    const totalRevenue = paidOrders.reduce((sum, order) => sum + order.amount, 0)
    
    // Calcular valor total de todos os pedidos (incluindo pendentes)
    const totalValue = orders.reduce((sum, order) => sum + order.amount, 0)
    
    // Converter de centavos para reais
    const totalRevenueInReais = totalRevenue / 100
    const totalValueInReais = totalValue / 100
    
    return {
      totalOrders,
      paidOrders: paidOrders.length,
      pendingOrders: pendingOrders.length,
      totalRevenue: totalRevenueInReais,
      totalValue: totalValueInReais
    }
  }, [orders])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total de Pedidos */}
      <Card className={`transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700 text-white' 
          : 'bg-white border-border'
      }`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={`text-sm font-medium transition-colors duration-200 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Total de Pedidos
          </CardTitle>
          <Package className={`h-4 w-4 transition-colors duration-200 ${
            isDarkMode ? 'text-blue-400' : 'text-blue-600'
          }`} />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold transition-colors duration-200 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {metrics.totalOrders}
          </div>
          <p className={`text-xs transition-colors duration-200 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Todos os pedidos
          </p>
        </CardContent>
      </Card>

      {/* Pedidos Pagos */}
      <Card className={`transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700 text-white' 
          : 'bg-white border-border'
      }`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={`text-sm font-medium transition-colors duration-200 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Pedidos Pagos
          </CardTitle>
          <TrendingUp className={`h-4 w-4 transition-colors duration-200 ${
            isDarkMode ? 'text-green-400' : 'text-green-600'
          }`} />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold transition-colors duration-200 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {metrics.paidOrders}
          </div>
          <p className={`text-xs transition-colors duration-200 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Status: Aprovado
          </p>
        </CardContent>
      </Card>

      {/* Receita Total (Apenas Pagos) */}
      <Card className={`transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700 text-white' 
          : 'bg-white border-border'
      }`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={`text-sm font-medium transition-colors duration-200 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Receita Total
          </CardTitle>
          <DollarSign className={`h-4 w-4 transition-colors duration-200 ${
            isDarkMode ? 'text-green-400' : 'text-green-600'
          }`} />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold transition-colors duration-200 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {formatCurrency(metrics.totalRevenue)}
          </div>
          <p className={`text-xs transition-colors duration-200 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Apenas pedidos pagos
          </p>
        </CardContent>
      </Card>

      {/* Valor Total (Todos os Pedidos) */}
      <Card className={`transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700 text-white' 
          : 'bg-white border-border'
      }`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={`text-sm font-medium transition-colors duration-200 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Valor Total
          </CardTitle>
          <Clock className={`h-4 w-4 transition-colors duration-200 ${
            isDarkMode ? 'text-orange-400' : 'text-orange-600'
          }`} />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold transition-colors duration-200 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {formatCurrency(metrics.totalValue)}
          </div>
          <p className={`text-xs transition-colors duration-200 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Incluindo pendentes
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
