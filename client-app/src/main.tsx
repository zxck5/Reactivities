// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import 'react-calendar/dist/Calendar.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-datepicker/dist/react-datepicker.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Routes.tsx';
import './app/layout/styles.css';
import { Provider } from 'react-redux';
import { store } from './store/index.tsx';


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider
      router={router} />
  </Provider>

)
