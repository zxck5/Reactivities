import './styles.css'

import 'semantic-ui-css/semantic.min.css'
import { Outlet, useLocation } from 'react-router-dom';
import { AppDispatch, getCurrentUserAsyncThunk } from '../../store';
import HomePage from '../../features/home/HomePage';
import { ToastContainer } from 'react-toastify';
import { Container } from 'semantic-ui-react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ModalContainer from '../common/modals/ModalContainer';


export default function App() {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      dispatch(getCurrentUserAsyncThunk())
    }

  }, [dispatch])


  return (
    <>
      <ModalContainer />
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      {location.pathname === '/' ? <HomePage /> : (
        <>

          <Container style={{ marginTop: '7em' }}>
            <Outlet />
          </Container>

        </>
      )}

    </>

  )
}