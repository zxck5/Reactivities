import { useEffect} from 'react';
import './styles.css'

import 'semantic-ui-css/semantic.min.css'
import {Container } from 'semantic-ui-react';

import NavBar from './Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import useActivityContext from '../../features/activities/hooks/activity-context';
import LoadingComponent from './LoadingComponents';


function App() {
  const {getActivities,loading} = useActivityContext(); 
  
  useEffect(()=> {
    getActivities();
    console.log('activities got called --> update')
    // return () => {
    //   console.log('clean up')
    // }
    
    
  },[getActivities]);

  if (loading) return <LoadingComponent content='Loading App'/>

  return (
    <>
      <NavBar/>
      <Container style = {{marginTop : '7em'}}>
        <ActivityDashboard />
      </Container>
    </>    
  )
}

export default App
