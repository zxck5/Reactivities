import './styles.css'

import 'semantic-ui-css/semantic.min.css'
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store';


function App() {


  return (
    <Provider store={store}>
      <Outlet />
    </Provider>
  )
}

export default App
