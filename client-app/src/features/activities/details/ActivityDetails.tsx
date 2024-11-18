import { Card, Image, CardMeta, CardContent, CardHeader, CardDescription, Button } from "semantic-ui-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../../../store";


export default function ActivityDetails() {

    const activities = useSelector((state: AppState) => state.activity.data);
    const { id } = useParams();
    const selectedActivity = activities.find(activity => activity.id == id);
    const location = useLocation();

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${selectedActivity?.category}.jpg`} />
            <CardContent>
                <CardHeader>{selectedActivity?.title}</CardHeader>
                <CardMeta>
                    <span>{selectedActivity?.date}</span>
                </CardMeta>
                <CardDescription>
                    {selectedActivity?.description}
                </CardDescription>
            </CardContent>
            <CardContent extra>
                <Button.Group width='2'>
                    <Button as={Link}
                        to={`/activities/manage/${selectedActivity?.id}`}
                        state={{ selectedActivity, from: location.pathname }}
                        basic
                        color="blue"
                        content='Edit' />
                    <Button as={Link} to={'/activities'} basic color="grey" content='Cancel' />
                </Button.Group>
            </CardContent>
        </Card>
    )
}