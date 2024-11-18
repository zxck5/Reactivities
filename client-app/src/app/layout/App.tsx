import './styles.css'

import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';

import NavBar from './Navbar';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store';


function App() {


  return (
    <Provider store={store}>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <Outlet />
      </Container>
    </Provider>
  )
}

export default App
