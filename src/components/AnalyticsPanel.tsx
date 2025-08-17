import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  MousePointer,
  Users,
  Target,
  BarChart3,
  Activity,
  Zap,
  Eye
} from 'lucide-react'
import { analyticsRepository } from '@/lib/analyticsRepository'
import type { 
  ConversionFunnel, 
  ElementPerformance, 
  FrictionPoint, 
  TimeComparison,
  UserTimeline 
} from '@/types/analytics'

interface AnalyticsPanelProps {
  isDarkMode: boolean
}

export const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({ isDarkMode }) => {
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState<'24h' | '7d' | '30d'>('7d')
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const insights = await analyticsRepository.getInsights()
        setData(insights)
      } catch (error) {
        console.error('Error fetching analytics data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg">Carregando insights de analytics...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-center text-red-500">
        Erro ao carregar dados de analytics
      </div>
    )
  }

  const currentPeriodData = data.timeComparison[selectedPeriod]

  return (
    <div className="space-y-6">
      {/* Header com Filtros */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Analytics & Insights
          </h2>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Análise automática de comportamento e pontos de fricção
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={(value: '24h' | '7d' | '30d') => setSelectedPeriod(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Últimas 24h</SelectItem>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total de Interações"
          value={currentPeriodData.totalInteractions}
          icon={Activity}
          trend="+12%"
          isPositive={true}
          isDarkMode={isDarkMode}
        />
        <MetricCard
          title="Usuários Únicos"
          value={currentPeriodData.uniqueUsers}
          icon={Users}
          trend="+8%"
          isPositive={true}
          isDarkMode={isDarkMode}
        />
        <MetricCard
          title="Taxa de Conversão"
          value={`${currentPeriodData.conversionRate}%`}
          icon={Target}
          trend="-3%"
          isPositive={false}
          isDarkMode={isDarkMode}
        />
        <MetricCard
          title="Duração Média"
          value={`${Math.round(currentPeriodData.avgSessionDuration / 60)}min`}
          icon={Clock}
          trend="+5%"
          isPositive={true}
          isDarkMode={isDarkMode}
        />
      </div>

      {/* Tabs de Análise */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className={`grid w-full grid-cols-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="friction">Pontos de Fricção</TabsTrigger>
          <TabsTrigger value="conversion">Conversão</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        {/* Visão Geral */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Páginas Mais Visitadas */}
            <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <Eye className="w-5 h-5" />
                  Páginas Mais Visitadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentPeriodData.topPages.map((page: any, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {page.page}
                      </span>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={(page.visits / currentPeriodData.topPages[0].visits) * 100} 
                          className="w-20 h-2"
                        />
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {page.visits}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Elementos Mais Clicados */}
            <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <MousePointer className="w-5 h-5" />
                  Elementos Mais Clicados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {currentPeriodData.topElements.map((element: any, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {element.element}
                      </span>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={(element.clicks / currentPeriodData.topElements[0].clicks) * 100} 
                          className="w-20 h-2"
                        />
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {element.clicks}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Pontos de Fricção */}
        <TabsContent value="friction" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Análise de Fricção */}
            <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  Pontos de Fricção Identificados
                </CardTitle>
                <CardDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Problemas automáticos detectados pelo sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.frictionPoints.map((point: FrictionPoint, index: number) => (
                    <div key={index} className={`p-3 rounded-lg border ${
                      isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-start justify-between mb-2">
                        <Badge 
                          variant={point.impact === 'high' ? 'destructive' : point.impact === 'medium' ? 'secondary' : 'outline'}
                          className="text-xs"
                        >
                          {point.impact === 'high' ? 'Alto' : point.impact === 'medium' ? 'Médio' : 'Baixo'}
                        </Badge>
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {point.frequency}x
                        </span>
                      </div>
                      <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {point.description}
                      </p>
                      <p className={`text-xs ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        💡 {point.recommendation}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance dos Elementos */}
            <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <BarChart3 className="w-5 h-5" />
                  Performance dos Elementos
                </CardTitle>
                <CardDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Elementos com alto clique e baixa conversão
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.elementPerformance.map((element: ElementPerformance, index: number) => (
                    <div key={index} className={`p-3 rounded-lg border ${
                      isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {element.elementName}
                        </span>
                        <Badge 
                          variant={element.conversionRate > 50 ? 'default' : element.conversionRate > 20 ? 'secondary' : 'destructive'}
                          className="text-xs"
                        >
                          {element.conversionRate.toFixed(1)}%
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                          {element.clicks} cliques
                        </span>
                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                          {element.avgTimeToClick}s para clicar
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Conversão */}
        <TabsContent value="conversion" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Funil de Conversão */}
            <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <Target className="w-5 h-5" />
                  Funil de Conversão
                </CardTitle>
                <CardDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Jornada do usuário até a conversão
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.conversionFunnel.map((stage: ConversionFunnel, index: number) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {stage.stage}
                        </span>
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {stage.visitors} usuários
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                            Taxa: {stage.conversionRate}%
                          </span>
                          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                            Dropoff: {stage.dropoffRate}%
                          </span>
                        </div>
                        <Progress 
                          value={stage.conversionRate} 
                          className="h-2"
                          style={{ '--progress-color': stage.color } as React.CSSProperties}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Comparação Temporal */}
            <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <TrendingUp className="w-5 h-5" />
                  Comparação Temporal
                </CardTitle>
                <CardDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  24h vs 7d vs 30d
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(data.timeComparison).map(([period, data]: [string, TimeComparison]) => (
                    <div key={period} className={`p-3 rounded-lg border ${
                      isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {period === '24h' ? 'Últimas 24h' : period === '7d' ? 'Últimos 7 dias' : 'Últimos 30 dias'}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {data.conversionRate}%
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Interações: </span>
                          <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{data.totalInteractions}</span>
                        </div>
                        <div>
                          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Usuários: </span>
                          <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{data.uniqueUsers}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Timeline */}
        <TabsContent value="timeline" className="space-y-6">
          <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <Clock className="w-5 h-5" />
                Timeline de Interações
              </CardTitle>
              <CardDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                Jornada detalhada dos usuários
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.userTimelines.map((timeline: UserTimeline, index: number) => (
                  <div key={index} className={`p-4 rounded-lg border ${
                    isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          Sessão {timeline.sessionId}
                        </span>
                        <Badge 
                          variant={timeline.conversion ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {timeline.conversion ? 'Conversão' : 'Sem Conversão'}
                        </Badge>
                      </div>
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {Math.round((timeline.endTime.getTime() - timeline.startTime.getTime()) / 1000 / 60)}min
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      {timeline.interactions.map((interaction, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm">
                          <div className={`w-2 h-2 rounded-full ${
                            interaction.action.includes('concluído') || interaction.action.includes('submit') 
                              ? 'bg-green-500' 
                              : interaction.action.includes('abandonada') 
                                ? 'bg-red-500' 
                                : 'bg-blue-500'
                          }`} />
                          <span className={`w-24 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {interaction.timestamp.toLocaleTimeString()}
                          </span>
                          <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                            {interaction.action}
                          </span>
                          {interaction.element && (
                            <Badge variant="outline" className="text-xs">
                              {interaction.element}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {timeline.conversion && timeline.conversionValue && (
                      <div className="mt-3 pt-3 border-t border-gray-300 dark:border-gray-600">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className={`text-sm font-medium ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                            Conversão: R$ {timeline.conversionValue}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Componente de Métrica
interface MetricCardProps {
  title: string
  value: string | number
  icon: React.ElementType
  trend: string
  isPositive: boolean
  isDarkMode: boolean
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon: Icon, trend, isPositive, isDarkMode }) => (
  <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {title}
          </p>
          <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {value}
          </p>
        </div>
        <div className={`p-3 rounded-full ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
        }`}>
          <Icon className={`w-6 h-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
        </div>
      </div>
      <div className="flex items-center gap-1 mt-2">
        {isPositive ? (
          <TrendingUp className="w-4 h-4 text-green-500" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-500" />
        )}
        <span className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {trend}
        </span>
      </div>
    </CardContent>
  </Card>
)


