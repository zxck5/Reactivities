import { Button, Header, Item, Segment, Image } from 'semantic-ui-react'
import { Activity } from "../../../app/models/activity";
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};
interface Props {
    activity: Activity
}



export default function ActivityDetailedHeader({ activity }: Props) {


    // if (!activity) return <Navigate to={'/not-found'} />
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                <Image src={`/assets/categoryImages/${activity!.category}.jpg`} fluid style={activityImageStyle} />
                <Segment style={activityImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={activity!.title}
                                    style={{ color: 'white' }}
                                />
                                <p>{format(new Date(activity.date!), 'dd MMM yyyy h:mm aa')}</p>
                                <p>
                                    Hosted by <strong>Bob</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join Activity</Button>
                <Button>Cancel attendance</Button>
                <Button as={Link} to={`/activities/manage/${activity!.id}`} color='orange' floated='right'>
                    Manage Event
                </Button>
            </Segment>
        </Segment.Group>
    );
}