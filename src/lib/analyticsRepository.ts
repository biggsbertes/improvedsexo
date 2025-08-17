import { db } from '@/lib/db'
import type { 
  UserInteraction, 
  ConversionFunnel, 
  ElementPerformance, 
  FrictionPoint, 
  TimeComparison,
  UserTimeline 
} from '@/types/analytics'

export const analyticsRepository = {
  // Dados simulados para demonstração
  async getMockData() {
    const now = new Date()
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    return {
      interactions: [
        {
          id: '1',
          userId: 'user-1',
          sessionId: 'session-1',
          timestamp: new Date(now.getTime() - 1000 * 60 * 5),
          type: 'click' as const,
          pagePath: '/',
          elementId: 'tracking-btn',
          elementName: 'Botão de Rastreamento',
          elementType: 'button',
          metadata: {
            deviceType: 'desktop' as const,
            conversionValue: 150,
            trafficSource: 'organic' as const
          }
        },
        {
          id: '2',
          userId: 'user-1',
          sessionId: 'session-1',
          timestamp: new Date(now.getTime() - 1000 * 60 * 3),
          type: 'form_submit' as const,
          pagePath: '/tracking',
          elementId: 'tracking-form',
          elementName: 'Formulário de Rastreamento',
          elementType: 'form',
          metadata: {
            deviceType: 'desktop' as const,
            conversionValue: 150,
            trafficSource: 'organic' as const
          }
        },
        {
          id: '3',
          userId: 'user-2',
          sessionId: 'session-2',
          timestamp: new Date(now.getTime() - 1000 * 60 * 10),
          type: 'click' as const,
          pagePath: '/',
          elementId: 'tracking-btn',
          elementName: 'Botão de Rastreamento',
          elementType: 'button',
          metadata: {
            deviceType: 'mobile' as const,
            trafficSource: 'social' as const
          }
        },
        {
          id: '4',
          userId: 'user-2',
          sessionId: 'session-2',
          timestamp: new Date(now.getTime() - 1000 * 60 * 8),
          type: 'form_abandon' as const,
          pagePath: '/tracking',
          elementId: 'tracking-form',
          elementName: 'Formulário de Rastreamento',
          elementType: 'form',
          metadata: {
            deviceType: 'mobile' as const,
            trafficSource: 'social' as const
          }
        },
        {
          id: '5',
          userId: 'user-3',
          sessionId: 'session-3',
          timestamp: new Date(now.getTime() - 1000 * 60 * 15),
          type: 'click' as const,
          pagePath: '/',
          elementId: 'tracking-btn',
          elementName: 'Botão de Rastreamento',
          elementType: 'button',
          metadata: {
            deviceType: 'desktop' as const,
            trafficSource: 'paid' as const
          }
        },
        {
          id: '6',
          userId: 'user-3',
          sessionId: 'session-3',
          timestamp: new Date(now.getTime() - 1000 * 60 * 12),
          type: 'click' as const,
          pagePath: '/',
          elementId: 'tracking-btn',
          elementName: 'Botão de Rastreamento',
          elementType: 'button',
          metadata: {
            deviceType: 'desktop' as const,
            trafficSource: 'paid' as const
          }
        },
        {
          id: '7',
          userId: 'user-3',
          sessionId: 'session-3',
          timestamp: new Date(now.getTime() - 1000 * 60 * 10),
          type: 'form_submit' as const,
          pagePath: '/tracking',
          elementId: 'tracking-form',
          elementName: 'Formulário de Rastreamento',
          elementType: 'form',
          metadata: {
            deviceType: 'desktop' as const,
            conversionValue: 200,
            trafficSource: 'paid' as const
          }
        }
      ] as UserInteraction[],
      
      conversionFunnel: [
        { stage: 'Página Inicial', visitors: 1000, conversionRate: 100, dropoffRate: 0, color: '#3B82F6' },
        { stage: 'Formulário', visitors: 650, conversionRate: 65, dropoffRate: 35, color: '#10B981' },
        { stage: 'Rastreamento', visitors: 520, conversionRate: 52, dropoffRate: 13, color: '#F59E0B' },
        { stage: 'Conversão', visitors: 450, conversionRate: 45, dropoffRate: 7, color: '#EF4444' }
      ] as ConversionFunnel[],
      
      elementPerformance: [
        { elementId: 'tracking-btn', elementName: 'Botão de Rastreamento', clicks: 150, conversions: 120, conversionRate: 80, avgTimeToClick: 2.5, category: 'CTA' },
        { elementId: 'tracking-form', elementName: 'Formulário de Rastreamento', clicks: 120, conversions: 95, conversionRate: 79, avgTimeToClick: 15.2, category: 'Form' },
        { elementId: 'menu-nav', elementName: 'Menu de Navegação', clicks: 89, conversions: 0, conversionRate: 0, avgTimeToClick: 1.8, category: 'Navigation' },
        { elementId: 'footer-links', elementName: 'Links do Rodapé', clicks: 67, conversions: 0, conversionRate: 0, avgTimeToClick: 3.1, category: 'Navigation' }
      ] as ElementPerformance[],
      
      frictionPoints: [
        {
          type: 'repeated_clicks',
          description: 'Usuários clicando múltiplas vezes no botão de rastreamento',
          frequency: 23,
          impact: 'medium',
          recommendation: 'Adicionar feedback visual imediato após o clique',
          affectedElements: ['tracking-btn']
        },
        {
          type: 'form_abandonment',
          description: 'Formulários sendo abandonados na página de rastreamento',
          frequency: 18,
          impact: 'high',
          recommendation: 'Simplificar formulário e adicionar progress bar',
          affectedElements: ['tracking-form']
        },
        {
          type: 'slow_interaction',
          description: 'Tempo de resposta lento em elementos interativos',
          frequency: 12,
          impact: 'medium',
          recommendation: 'Otimizar performance e adicionar loading states',
          affectedElements: ['tracking-btn', 'tracking-form']
        }
      ] as FrictionPoint[],
      
      timeComparison: {
        '24h': {
          period: '24h',
          totalInteractions: 150,
          uniqueUsers: 45,
          conversionRate: 67,
          avgSessionDuration: 180,
          topPages: [
            { page: '/', visits: 45 },
            { page: '/tracking', visits: 30 },
            { page: '/leads', visits: 15 }
          ],
          topElements: [
            { element: 'Botão de Rastreamento', clicks: 45 },
            { element: 'Formulário de Rastreamento', clicks: 30 },
            { element: 'Menu de Navegação', clicks: 20 }
          ]
        },
        '7d': {
          period: '7d',
          totalInteractions: 1200,
          uniqueUsers: 320,
          conversionRate: 58,
          avgSessionDuration: 165,
          topPages: [
            { page: '/', visits: 320 },
            { page: '/tracking', visits: 185 },
            { page: '/leads', visits: 95 }
          ],
          topElements: [
            { element: 'Botão de Rastreamento', clicks: 320 },
            { element: 'Formulário de Rastreamento', clicks: 185 },
            { element: 'Menu de Navegação', clicks: 120 }
          ]
        },
        '30d': {
          period: '30d',
          totalInteractions: 4800,
          uniqueUsers: 1250,
          conversionRate: 52,
          avgSessionDuration: 158,
          topPages: [
            { page: '/', visits: 1250 },
            { page: '/tracking', visits: 650 },
            { page: '/leads', visits: 380 }
          ],
          topElements: [
            { element: 'Botão de Rastreamento', clicks: 1250 },
            { element: 'Formulário de Rastreamento', clicks: 650 },
            { element: 'Menu de Navegação', clicks: 420 }
          ]
        }
      } as Record<string, TimeComparison>,
      
      userTimelines: [
        {
          sessionId: 'session-1',
          userId: 'user-1',
          startTime: new Date(now.getTime() - 1000 * 60 * 10),
          endTime: new Date(now.getTime() - 1000 * 60 * 2),
          interactions: [
            { timestamp: new Date(now.getTime() - 1000 * 60 * 10), action: 'Página carregada', page: '/', duration: 0 },
            { timestamp: new Date(now.getTime() - 1000 * 60 * 8), action: 'Clique no botão', page: '/', element: 'Botão de Rastreamento', duration: 2 },
            { timestamp: new Date(now.getTime() - 1000 * 60 * 6), action: 'Formulário preenchido', page: '/tracking', element: 'Formulário de Rastreamento', duration: 15 },
            { timestamp: new Date(now.getTime() - 1000 * 60 * 2), action: 'Rastreamento concluído', page: '/tracking', duration: 4 }
          ],
          conversion: true,
          conversionValue: 150
        },
        {
          sessionId: 'session-2',
          userId: 'user-2',
          startTime: new Date(now.getTime() - 1000 * 60 * 15),
          endTime: new Date(now.getTime() - 1000 * 60 * 8),
          interactions: [
            { timestamp: new Date(now.getTime() - 1000 * 60 * 15), action: 'Página carregada', page: '/', duration: 0 },
            { timestamp: new Date(now.getTime() - 1000 * 60 * 12), action: 'Clique no botão', page: '/', element: 'Botão de Rastreamento', duration: 3 },
            { timestamp: new Date(now.getTime() - 1000 * 60 * 10), action: 'Formulário iniciado', page: '/tracking', element: 'Formulário de Rastreamento', duration: 2 },
            { timestamp: new Date(now.getTime() - 1000 * 60 * 8), action: 'Sessão abandonada', page: '/tracking', duration: 0 }
          ],
          conversion: false,
          conversionValue: 0
        }
      ] as UserTimeline[]
    }
  },

  async getInsights() {
    const data = await this.getMockData()
    
    // Análise automática de pontos de fricção
    const frictionAnalysis = this.analyzeFrictionPoints(data.interactions)
    
    // Análise de conversão por elemento
    const conversionAnalysis = this.analyzeElementConversion(data.interactions)
    
    // Comparação temporal
    const temporalAnalysis = this.analyzeTemporalTrends(data.timeComparison)
    
    return {
      frictionPoints: data.frictionPoints,
      elementPerformance: data.elementPerformance,
      conversionFunnel: data.conversionFunnel,
      timeComparison: data.timeComparison,
      userTimelines: data.userTimelines,
      insights: {
        frictionAnalysis,
        conversionAnalysis,
        temporalAnalysis
      }
    }
  },

  analyzeFrictionPoints(interactions: UserInteraction[]) {
    const repeatedClicks = new Map<string, number>()
    const formAbandons = new Map<string, number>()
    
    interactions.forEach(interaction => {
      if (interaction.type === 'click') {
        const key = `${interaction.elementId}-${interaction.sessionId}`
        repeatedClicks.set(key, (repeatedClicks.get(key) || 0) + 1)
      }
      if (interaction.type === 'form_abandon') {
        formAbandons.set(interaction.elementId || 'unknown', (formAbandons.get(interaction.elementId || 'unknown') || 0) + 1)
      }
    })
    
    return {
      repeatedClicks: Array.from(repeatedClicks.entries())
        .filter(([_, count]) => count > 1)
        .map(([key, count]) => ({ key, count })),
      formAbandons: Array.from(formAbandons.entries())
        .map(([element, count]) => ({ element, count }))
    }
  },

  analyzeElementConversion(interactions: UserInteraction[]) {
    const elementStats = new Map<string, { clicks: number; conversions: number }>()
    
    interactions.forEach(interaction => {
      if (interaction.elementId) {
        const stats = elementStats.get(interaction.elementId) || { clicks: 0, conversions: 0 }
        if (interaction.type === 'click') stats.clicks++
        if (interaction.metadata?.conversionValue) stats.conversions++
        elementStats.set(interaction.elementId, stats)
      }
    })
    
    return Array.from(elementStats.entries()).map(([elementId, stats]) => ({
      elementId,
      conversionRate: stats.clicks > 0 ? (stats.conversions / stats.clicks) * 100 : 0,
      ...stats
    }))
  },

  analyzeTemporalTrends(timeComparison: Record<string, TimeComparison>) {
    const periods = Object.values(timeComparison)
    const trends = periods.map(period => ({
      period: period.period,
      conversionTrend: period.conversionRate,
      sessionTrend: period.avgSessionDuration,
      userTrend: period.uniqueUsers
    }))
    
    return trends
  }
}
