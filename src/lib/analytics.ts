import { db } from '@/lib/db'
import type { AnalyticsEvent, AnalyticsEventType } from '@/types/analytics'

function generateSessionId(): string {
  const existing = sessionStorage.getItem('sid')
  if (existing) return existing
  const sid = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
  sessionStorage.setItem('sid', sid)
  return sid
}

export const analytics = {
  sessionId: generateSessionId(),
  async track(event: Omit<AnalyticsEvent, 'id' | 'sessionId' | 'timestamp'> & Partial<Pick<AnalyticsEvent, 'timestamp'>>) {
    const toSave: AnalyticsEvent = {
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
      ...event,
    }
    await db.events.add(toSave)
  },
}

export function initAnalyticsRouting(router: { listen: (cb: () => void) => void } | null = null) {
  const sid = analytics.sessionId
  // session start
  void analytics.track({ type: 'session_start', pagePath: location.pathname, referrer: document.referrer })

  let pageStart = performance.now()

  const onRouteChange = () => {
    const now = performance.now()
    const durationMs = Math.max(0, Math.round(now - pageStart))
    // previous page_view end
    void analytics.track({ type: 'page_view', pagePath: location.pathname, durationMs })
    pageStart = performance.now()
  }

  window.addEventListener('popstate', onRouteChange)
  window.addEventListener('pushstate', onRouteChange as any)
  window.addEventListener('replacestate', onRouteChange as any)

  // clicks
  const onClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null
    if (!target) return
    const role = target.getAttribute('data-analytics') || target.getAttribute('aria-label') || target.tagName
    const path = buildElementPath(target)
    void analytics.track({ type: 'click', pagePath: location.pathname, element: `${role}:${path}` })
  }
  document.addEventListener('click', onClick, { capture: true })

  // scroll
  let lastScrollReport = 0
  const onScroll = () => {
    const y = window.scrollY
    const percent = Math.min(100, Math.round((y / (document.documentElement.scrollHeight - window.innerHeight)) * 100))
    const now = Date.now()
    if (now - lastScrollReport > 1500) {
      lastScrollReport = now
      void analytics.track({ type: 'scroll', pagePath: location.pathname, scrollY: Math.round(y), scrollPercent: percent })
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true })

  // visibility
  const onVisibility = () => {
    void analytics.track({ type: 'visibility', pagePath: location.pathname, metadata: { state: document.visibilityState } })
  }
  document.addEventListener('visibilitychange', onVisibility)

  // session end (best-effort)
  window.addEventListener('beforeunload', () => {
    const durationMs = Math.max(0, Math.round(performance.now() - pageStart))
    navigator.sendBeacon?.('/analytics-end', new Blob())
    void analytics.track({ type: 'session_end', pagePath: location.pathname, durationMs })
  })
}

function buildElementPath(el: HTMLElement): string {
  const parts: string[] = []
  let node: HTMLElement | null = el
  let depth = 0
  while (node && depth < 4) {
    const id = node.id ? `#${node.id}` : ''
    const cls = node.className && typeof node.className === 'string' ? '.' + node.className.split(' ').slice(0, 2).join('.') : ''
    parts.unshift(`${node.tagName.toLowerCase()}${id}${cls}`)
    node = node.parentElement
    depth++
  }
  return parts.join('>')
}


