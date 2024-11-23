import './styles.css'

import 'semantic-ui-css/semantic.min.css'
import { Outlet, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store';
import NavBar from './Navbar';
import HomePage from '../../features/home/HomePage';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';


function App() {
  const location = useLocation();


  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      {location.pathname === '/' ? <HomePage /> : (
        <>
          <NavBar />
          <Provider store={store}>
            <Container style={{ marginTop: '7em' }}>
              <Outlet />
            </Container>
          </Provider>
        </>
      )}
    </>
  )
}

export default App
