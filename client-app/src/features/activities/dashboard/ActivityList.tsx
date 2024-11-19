import { Container, Grid, Header } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState, setGroupedActivities } from '../../../store';
import ActivityListItem from './ActivityListItem';
import { Fragment, useEffect } from 'react';
import { Activity } from '../../../app/models/activity';
import ActivityFilters from './ActivityFilters';


export default function ActivityList() {
    const dispatch = useDispatch<AppDispatch>()
    const activities = useSelector((state: AppState) => state.activity.data);
    const groupedActivities = useSelector((state: AppState) => state.activity.groupedData);
    // console.log('Is response frozen?', Object.isFrozen(activities));
    const sortedActivities = [...activities].sort((a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime())

    useEffect(() => {
        // dispatch(sortActivitiesBy((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
        if (sortedActivities.length > 0) {
            dispatch(setGroupedActivities())
        }
    }, [dispatch, sortedActivities.length]);

    return (

        <Grid>
            <Grid.Column width='10'>
                {groupedActivities.map(([date, activities]) => (
                    <Fragment key={date}>
                        <Header sub color='teal'>
                            {date}
                        </Header>
                        {activities.map((activity: Activity) => (
                            <ActivityListItem key={activity.id} activity={activity} />
                        ))}

                    </Fragment>
                ))}

            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />
            </Grid.Column>
        </Grid>
    )
}