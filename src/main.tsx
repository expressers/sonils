import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './base.css'
import Index from './pages/Index'

const pages: Record<string, React.LazyExoticComponent<() => React.JSX.Element>> = {
  a: lazy(() => import('./pages/A')),
  b: lazy(() => import('./pages/B')),
  c: lazy(() => import('./pages/C')),
  d: lazy(() => import('./pages/D')),
}

const key = location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase()
const Page = pages[key]

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {Page ? (
      <Suspense fallback={null}>
        <Page />
      </Suspense>
    ) : (
      <Index />
    )}
  </StrictMode>,
)
