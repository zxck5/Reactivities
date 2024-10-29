import { Button, Item, Label, Segment } from 'semantic-ui-react';
import useActivityContext from '../hooks/activity-context';
import { SyntheticEvent, useState } from 'react';


export default function ActivityList() {
    const {activities,submitting, handleSelectActivity,handleDeleteActivity} = useActivityContext();
    const [target, setTarget] = useState('');

    const handleActivityDelete = (e : SyntheticEvent<HTMLButtonElement>, id : string) => {
        setTarget(e.currentTarget.name);
        handleDeleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as={'a'}>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={()=> handleSelectActivity(activity.id)} floated='right' content='View' color='blue'/>
                                <Button 
                                    name={activity.id}
                                    loading={submitting && target === activity.id} 
                                    onClick={(e)=> handleActivityDelete(e,activity.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red'/>
                                <Label basic content={activity.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}