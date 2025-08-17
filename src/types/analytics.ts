export interface UserInteraction {
  id: string
  userId: string
  sessionId: string
  timestamp: Date
  type: 'click' | 'scroll' | 'form_submit' | 'form_abandon' | 'page_view' | 'navigation'
  pagePath: string
  elementId?: string
  elementName?: string
  elementType?: string
  metadata?: {
    deviceType: 'desktop' | 'mobile' | 'tablet'
    userAgent?: string
    referrer?: string
    durationMs?: number
    scrollDepth?: number
    formData?: Record<string, any>
    conversionValue?: number
    trafficSource?: 'organic' | 'paid' | 'social' | 'direct' | 'referral'
  }
}

export interface ConversionFunnel {
  stage: string
  visitors: number
  conversionRate: number
  dropoffRate: number
  color: string
}

export interface ElementPerformance {
  elementId: string
  elementName: string
  clicks: number
  conversions: number
  conversionRate: number
  avgTimeToClick: number
  category: string
}

export interface FrictionPoint {
  type: 'repeated_clicks' | 'form_abandonment' | 'slow_interaction' | 'error_occurrence'
  description: string
  frequency: number
  impact: 'high' | 'medium' | 'low'
  recommendation: string
  affectedElements: string[]
}

export interface TimeComparison {
  period: '24h' | '7d' | '30d'
  totalInteractions: number
  uniqueUsers: number
  conversionRate: number
  avgSessionDuration: number
  topPages: Array<{ page: string; visits: number }>
  topElements: Array<{ element: string; clicks: number }>
}

export interface UserTimeline {
  sessionId: string
  userId: string
  startTime: Date
  endTime: Date
  interactions: Array<{
    timestamp: Date
    action: string
    page: string
    element?: string
    duration?: number
  }>
  conversion: boolean
  conversionValue?: number
}
