import React from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/AcitivityForm';
import useActivityContext from '../hooks/activity-context';


export default function ActivityDashboard() {

    const {selectedActivity, editMode} = useActivityContext();

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode &&
                <ActivityDetails />}
                {editMode &&
                    <ActivityForm/>}
            </Grid.Column>
        </Grid>
    )
}