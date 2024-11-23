import { Card, Grid } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState, getActivity } from "../../../store";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSideBar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Activity } from "../../../app/models/activity";



export default function ActivityDetails() {

    const { id } = useParams<string>();
    const dispatch = useDispatch<AppDispatch>();
    const activity = useSelector<AppState, Activity | undefined>(state => state.activity.selectedActivity);

    useEffect(() => {
        if (id && !activity) {
            dispatch(getActivity(id))
        }


    }, [id, dispatch, activity])

    // if (!selectedActivity) return <Navigate to={'/not-found'} />
    return (
        <Card fluid>
            <Grid>
                <Grid.Column width={10}>
                    {activity && <ActivityDetailedHeader activity={activity} />}
                    {activity && <ActivityDetailedInfo activity={activity} />}
                    <ActivityDetailedChat />
                </Grid.Column>
                <Grid.Column width={6}>
                    <ActivityDetailedSidebar />
                </Grid.Column>
            </Grid>
        </Card>

    )


    // < Card fluid >
    //     <Image src={`/assets/categoryImages/${selectedActivity?.category}.jpg`} />
    //     <CardContent>
    //         <CardHeader>{selectedActivity?.title}</CardHeader>
    //         <CardMeta>
    //             <span>{selectedActivity?.date}</span>
    //         </CardMeta>
    //         <CardDescription>
    //             {selectedActivity?.description}
    //         </CardDescription>
    //     </CardContent>
    //     <CardContent extra>
    //         <Button.Group width='2'>
    //             <Button as={Link}
    //                 to={`/activities/manage/${selectedActivity?.id}`}
    //                 state={{ selectedActivity, from: location.pathname }}
    //                 basic
    //                 color="blue"
    //                 content='Edit' />
    //             <Button as={Link} to={'/activities'} basic color="grey" content='Cancel' />
    //         </Button.Group>
    //     </CardContent>
    // </Card >
}