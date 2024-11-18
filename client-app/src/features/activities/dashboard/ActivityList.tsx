import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, deleteActivity, AppDispatch } from '../../../store';


export default function ActivityList() {
    const [target, setTarget] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const activities = useSelector((state: AppState) => state.activity.data);
    const dispatch = useDispatch<AppDispatch>();

    const handleActivityDelete = async (id: string) => {
        setTarget(id);
        setSubmitting(true);
        await dispatch(deleteActivity(id));
        setSubmitting(false);

    }
    // console.log('Is response frozen?', Object.isFrozen(activities));
    // useEffect(() => {
    //     if (activities.length > 0) {
    //         dispatch(sortActivitiesBy((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    //     }
    // }, [dispatch, activities]);


    // useEffect(() => {
    //     console.log('ACTIVITY LIST');
    //     return () => {
    //         console.log('ACTIVITY LIST UNMOUNT');
    //     }
    // }, [])

    const sortedActivities = [...activities].sort((a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime())
    return (
        <Segment>
            <Item.Group divided>
                {sortedActivities.map(activity => {
                    return (
                        <Item key={activity.id}>
                            <Item.Content>
                                <Item.Header as={'a'}>{activity.title}</Item.Header>
                                <Item.Meta>{activity.date}</Item.Meta>
                                <Item.Description>
                                    <div>{activity.description}</div>
                                    <div>{activity.city}, {activity.venue}</div>
                                </Item.Description>
                                <Item.Extra>
                                    <Button as={Link} to={`/activities/${activity.id}`} floated='right' content='View' color='blue' />
                                    <Button
                                        loading={submitting && target === activity.id}
                                        onClick={() => handleActivityDelete(activity?.id)}
                                        floated='right'
                                        content='Delete'
                                        color='red' />
                                    <Label basic content={activity.category} />
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    )
                }
                )}
            </Item.Group>
        </Segment>
    )
}