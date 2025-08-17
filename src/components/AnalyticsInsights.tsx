import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, MousePointer, Clock, MapPin } from 'lucide-react'
import type { AnalyticsEvent } from '@/types/analytics'

interface AnalyticsInsightsProps {
  events: AnalyticsEvent[]
  isDarkMode: boolean
}

export const AnalyticsInsights = ({ events, isDarkMode }: AnalyticsInsightsProps) => {
  const insights = useMemo(() => {
    // 1. Páginas mais visitadas
    const pageViews = events.filter(ev => ev.type === 'page_view')
    const pageStats = pageViews.reduce((acc, ev) => {
      const path = ev.pagePath || 'Página desconhecida'
      if (!acc[path]) {
        acc[path] = {
          views: 0,
          totalTime: 0,
          avgTime: 0,
          scrollStops: []
        }
      }
      acc[path].views++
      if (ev.durationMs) {
        acc[path].totalTime += ev.durationMs
      }
      if (ev.scrollPercent) {
        acc[path].scrollStops.push(ev.scrollPercent)
      }
      return acc
    }, {} as Record<string, { views: number; totalTime: number; avgTime: number; scrollStops: number[] }>)

    // Calcular tempo médio por página
    Object.values(pageStats).forEach(page => {
      page.avgTime = page.views > 0 ? Math.round(page.totalTime / page.views) : 0
    })

    // 2. Elementos mais clicados
    const clicks = events.filter(ev => ev.type === 'click')
    const clickStats = clicks.reduce((acc, ev) => {
      const element = ev.element || 'Elemento desconhecido'
      acc[element] = (acc[element] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // 3. Pontos onde os usuários mais param (scroll) - com informação da página
    const scrollEvents = events.filter(ev => ev.type === 'scroll' && ev.scrollPercent)
    const scrollStopsWithPage = scrollEvents.reduce((acc, ev) => {
      const percent = Math.floor((ev.scrollPercent || 0) / 10) * 10 // Agrupar em faixas de 10%
      const pagePath = ev.pagePath || 'Página desconhecida'
      
      if (!acc[percent]) {
        acc[percent] = {
          count: 0,
          pages: {} as Record<string, number>
        }
      }
      
      acc[percent].count++
      acc[percent].pages[pagePath] = (acc[percent].pages[pagePath] || 0) + 1
      
      return acc
    }, {} as Record<number, { count: number; pages: Record<string, number> }>)

    // 4. Tempo médio por página
    const avgTimePerPage = pageViews.length > 0 
      ? Math.round(pageViews.reduce((sum, ev) => sum + (ev.durationMs || 0), 0) / pageViews.length)
      : 0

    return {
      pageStats,
      clickStats,
      scrollStopsWithPage,
      avgTimePerPage,
      totalPageViews: pageViews.length,
      totalClicks: clicks.length
    }
  }, [events])

  const formatTime = (ms: number) => {
    const seconds = Math.round(ms / 1000)
    if (seconds < 60) return `${seconds}s`
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  const topPages = Object.entries(insights.pageStats)
    .sort(([, a], [, b]) => b.views - a.views)
    .slice(0, 5)

  const topClicks = Object.entries(insights.clickStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  const topScrollStops = Object.entries(insights.scrollStopsWithPage)
    .sort(([, a], [, b]) => b.count - a.count)
    .slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Resumo Geral */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className={`transition-colors duration-200 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700 text-white' 
            : 'bg-white border-border'
        }`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Total de Páginas
            </CardTitle>
            <BarChart3 className={`h-4 w-4 transition-colors duration-200 ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold transition-colors duration-200 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {insights.totalPageViews}
            </div>
            <p className={`text-xs transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Visualizações
            </p>
          </CardContent>
        </Card>

        <Card className={`transition-colors duration-200 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700 text-white' 
            : 'bg-white border-border'
        }`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Total de Cliques
            </CardTitle>
            <MousePointer className={`h-4 w-4 transition-colors duration-200 ${
              isDarkMode ? 'text-green-400' : 'text-green-600'
            }`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold transition-colors duration-200 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {insights.totalClicks}
            </div>
            <p className={`text-xs transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Interações
            </p>
          </CardContent>
        </Card>

        <Card className={`transition-colors duration-200 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700 text-white' 
            : 'bg-white border-border'
        }`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Tempo Médio
            </CardTitle>
            <Clock className={`h-4 w-4 transition-colors duration-200 ${
              isDarkMode ? 'text-orange-400' : 'text-orange-600'
            }`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold transition-colors duration-200 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {formatTime(insights.avgTimePerPage)}
            </div>
            <p className={`text-xs transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Por página
            </p>
          </CardContent>
        </Card>

        <Card className={`transition-colors duration-200 ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700 text-white' 
            : 'bg-white border-border'
        }`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={`text-sm font-medium transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Páginas Únicas
            </CardTitle>
            <MapPin className={`h-4 w-4 transition-colors duration-200 ${
              isDarkMode ? 'text-purple-400' : 'text-purple-600'
            }`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold transition-colors duration-200 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {Object.keys(insights.pageStats).length}
            </div>
            <p className={`text-xs transition-colors duration-200 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Diferentes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Páginas Mais Visitadas */}
      <Card className={`transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700 text-white' 
          : 'bg-white border-border'
      }`}>
        <CardHeader>
          <CardTitle className={`transition-colors duration-200 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Páginas Mais Visitadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topPages.map(([path, stats]) => (
              <div key={path} className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className="flex-1">
                  <div className={`font-medium transition-colors duration-200 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {path}
                  </div>
                  <div className={`text-sm transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {stats.views} visualizações • Tempo médio: {formatTime(stats.avgTime)}
                  </div>
                </div>
                <div className={`text-right text-sm transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {stats.scrollStops.length > 0 && (
                    <div>Parou em: {Math.max(...stats.scrollStops)}%</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Elementos Mais Clicados */}
      <Card className={`transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700 text-white' 
          : 'bg-white border-border'
      }`}>
        <CardHeader>
          <CardTitle className={`transition-colors duration-200 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Elementos Mais Clicados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topClicks.map(([element, count]) => (
              <div key={element} className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className={`font-medium transition-colors duration-200 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {element}
                </div>
                <div className={`text-lg font-bold transition-colors duration-200 ${
                  isDarkMode ? 'text-green-400' : 'text-green-600'
                }`}>
                  {count} cliques
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pontos de Parada no Scroll */}
      <Card className={`transition-colors duration-200 ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700 text-white' 
          : 'bg-white border-border'
      }`}>
        <CardHeader>
          <CardTitle className={`transition-colors duration-200 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Onde os Usuários Mais Param (Scroll)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topScrollStops.map(([percent, data]) => (
              <div key={percent} className={`p-3 rounded-lg transition-colors duration-200 ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-16 h-2 rounded-full transition-colors duration-200 ${
                      isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                    }`}>
                      <div 
                        className={`h-full rounded-full transition-colors duration-200 ${
                          isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className={`font-medium transition-colors duration-200 ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {percent}% da página
                    </div>
                  </div>
                  <div className={`text-lg font-bold transition-colors duration-200 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {data.count} paradas
                  </div>
                </div>
                
                {/* Páginas onde ocorreram as paradas */}
                <div className="mt-2">
                  <div className={`text-xs font-medium transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Páginas onde pararam:
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {Object.entries(data.pages)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 3)
                      .map(([pagePath, pageCount]) => (
                        <span key={pagePath} className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                          isDarkMode 
                            ? 'bg-gray-600 text-gray-200' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {pagePath === '/' ? 'Página Inicial' : 
                           pagePath === '/search' ? 'Resultado de Busca' :
                           pagePath === '/payment' ? 'Pagamento' :
                           pagePath}
                          <span className="ml-1 text-xs opacity-75">({pageCount})</span>
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
