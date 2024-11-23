import { Grid, Header } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState, setGroupedActivities, sortActivitiesBy } from '../../../store';
import ActivityListItem from './ActivityListItem';
import { Fragment, useEffect } from 'react';
import { Activity } from '../../../app/models/activity';
import ActivityFilters from './ActivityFilters';


export default function ActivityList() {
    const dispatch = useDispatch<AppDispatch>()
    const groupedActivities = useSelector((state: AppState) => state.activity.groupedData);
    // console.log('Is response frozen?', Object.isFrozen(activities));sssss
    // const sortedActivities = [...activities].sort((a, b) =>
    //     new Date(a.date).getTime() - new Date(b.date).getTime())

    useEffect(() => {
        dispatch(sortActivitiesBy((a, b) => a.date! - b.date!));
        // if (sortedActivities.length > 0) {
        dispatch(setGroupedActivities());
        // }
    }, [dispatch]);

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