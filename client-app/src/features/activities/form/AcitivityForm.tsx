import { Button, Form, Segment } from 'semantic-ui-react';
import useActivityContext from '../hooks/activity-context';
import { ChangeEvent, useState } from 'react';
import { ActivityFormType, mapFormToActivity } from '../../../app/models/activity';

export default function ActivityForm() {

    const {handleFormClose, selectedActivity, handleCreateOrEditActivity, submitting} = useActivityContext();
    const [activityForm, setActivityForm] = useState<ActivityFormType>({
        title : selectedActivity?.title ?? "",
        date : selectedActivity?.date ?? "",
        description : selectedActivity?.description ?? "",
        category : selectedActivity?.category ?? "",
        city : selectedActivity?.city ?? "",
        venue : selectedActivity?.venue ?? ""
    });
    const handleSubmit = () => {
        if (selectedActivity?.id) {
            handleCreateOrEditActivity(mapFormToActivity(activityForm, selectedActivity?.id));
        } else {
            handleCreateOrEditActivity(mapFormToActivity(activityForm, undefined));
        }

    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {value, name} = e.target;
        setActivityForm({...activityForm, [name] : value});
    }


    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' name='title' value= {activityForm.title} onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' name = 'description' value={activityForm.description} onChange={handleInputChange}/>
                <Form.Input placeholder='Category' name = 'category' value = {activityForm.category} onChange={handleInputChange}/>
                <Form.Input placeholder='Date' type='date' name = 'date' value = {activityForm.date} onChange={handleInputChange}/>
                <Form.Input placeholder='City' name = 'city' value = {activityForm.city} onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' name = 'venue' value = {activityForm.venue} onChange={handleInputChange}/>
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' onChange={handleInputChange}/>
                <Button onClick={handleFormClose} floated='right' type='button' content='Cancel' onChange={handleInputChange}/>
            </Form>
        </Segment>
    )
}