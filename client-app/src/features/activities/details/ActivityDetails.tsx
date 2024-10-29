import React from "react";
import { Card,Image,CardMeta,CardContent,CardHeader,CardDescription, Button } from "semantic-ui-react";
import useActivityContext from "../hooks/activity-context";


export default function ActivityDetails() {
    const {selectedActivity, handleCancleSelectActivity, handleFormOpen} = useActivityContext();
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
                    <Button onClick={()=> handleFormOpen(selectedActivity?.id)} basic color="blue" content='Edit'/>
                    <Button onClick={handleCancleSelectActivity} basic color="grey" content='Cancel'/>
                </Button.Group>
            </CardContent>
      </Card>
    )
}