// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/layout/App.tsx'
import './app/layout/styles.css'
import { ActivityProvider } from './context/ActivityContext.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <ActivityProvider>
      <App />
    </ActivityProvider>
  // </StrictMode>
)
