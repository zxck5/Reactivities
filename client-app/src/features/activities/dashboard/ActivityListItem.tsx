import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { Link } from "react-router-dom";
// import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, setSelectedActivity } from "../../../store";
import { format } from 'date-fns';

interface Props {
    activity: Activity
}

export default function ActivityListItem({ activity }: Props) {
    // const [target, setTarget] = useState('');
    // const [submitting, setSubmitting] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    // const handleActivityDelete = async (id: string) => {
    //     setTarget(id);
    //     setSubmitting(true);
    //     await dispatch(deleteActivity(id));
    //     setSubmitting(false);

    // }
    const handleActivityDetail = (activity: Activity) => {
        dispatch(setSelectedActivity(activity));
    }
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                            <Item.Description>Hosted By Bob</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(activity.date!, 'dd MMM yyyy h:mm aa')}
                    <Icon name="marker" /> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                Attendees go here
            </Segment>
            <Segment>
                <span>{activity.description}</span>
                {/* <Button
                    loading={submitting && target === activity.id}
                    onClick={() => handleActivityDelete(activity.id)}
                    floated='right'
                    content='Delete'
                    color='red' /> */}
                <Label basic content={activity.category} />
                <Button as={Link} to={`/activities/${activity.id}`} onClick={() => handleActivityDetail(activity)} floated='right' content='View' color='blue' />
            </Segment>
        </Segment.Group>

    );
}