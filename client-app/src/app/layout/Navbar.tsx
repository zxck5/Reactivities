import React from 'react';
import { Menu , Container, Button} from 'semantic-ui-react';
import useActivityContext from '../../features/activities/hooks/activity-context';


export default function NavBar() {
    const {handleFormOpen } = useActivityContext(); 
    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src='/assets/logo.png' alt='logo' style={{marginRight: '10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities'>
                    <Button onClick={handleFormOpen} positive content='Create Activity'/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}