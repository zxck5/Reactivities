import { Card, Image, CardMeta, CardContent, CardHeader, CardDescription, Button, Grid } from "semantic-ui-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../../../store";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSideBar";


export default function ActivityDetails() {

    const selectedActivity = useSelector((state: AppState) => state.activity.selectedActivity);


    return (
        <Card fluid>
            <Grid>
                <Grid.Column width={10}>
                    <ActivityDetailedHeader activity={selectedActivity} />
                    <ActivityDetailedInfo activity={selectedActivity} />
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