// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import 'react-calendar/dist/Calendar.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Routes.tsx';
import './app/layout/styles.css';

createRoot(document.getElementById('root')!).render(
  <RouterProvider
    router={router} />
)
