import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initAnalyticsRouting } from './lib/analytics'

// Permite reset rápido do armazenamento local via query string
// Use: http://localhost:8081/?reset=1
const queryParams = new URLSearchParams(window.location.search)
if (queryParams.get('reset') === '1') {
  try {
    localStorage.removeItem('leads-storage')
    localStorage.removeItem('auth-storage')
  } catch (_) {
    // ignore
  }
  queryParams.delete('reset')
  const newQuery = queryParams.toString()
  const newUrl = `${window.location.pathname}${newQuery ? `?${newQuery}` : ''}`
  window.history.replaceState({}, '', newUrl)
}

initAnalyticsRouting()
createRoot(document.getElementById("root")!).render(<App />);
