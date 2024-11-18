import { Button, Form, Segment } from 'semantic-ui-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Activity } from '../../../app/models/activity';
import { useDispatch } from 'react-redux';
import { AppDispatch, updateActivity } from '../../../store';



export default function ActivityForm() {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();
    const selectedActivity = location.state?.selectedActivity;

    const [activityForm, setActivityForm] = useState<Activity>({
        id: selectedActivity?.id,
        title: selectedActivity?.title ?? "",
        date: selectedActivity?.date ?? "",
        description: selectedActivity?.description ?? "",
        category: selectedActivity?.category ?? "",
        city: selectedActivity?.city ?? "",
        venue: selectedActivity?.venue ?? ""
    });

    const [submitting, setSubmitting] = useState(false);


    useEffect(() => {
        if (!selectedActivity) {
            // Redirect to another route if selectedActivity is null
            navigate("/activities/create");
        }
    }, [selectedActivity, navigate]);



    const handleSubmit = async () => {
        setSubmitting(true);
        await dispatch(updateActivity(activityForm));
        setSubmitting(false);
        // TODO : CURRENT ISSUE, the activity from location.state is not consistent when user
        // clicks forward button on the web. THE STATE IS ONLY KEPT UPDATE when user clicks EDIT BUTTON
        // 1. we can make it UP-TO-DATE by getting id from useParams() and pick up from redux store
        // 2. make new state in redux for this (THIS is more valid approach)
        if (location.state?.from) {
            navigate(-1); // Go back if history exists
        } else {
            navigate(`/activities/${activityForm.id}`); // Fallback to details page
        }

    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, name } = e.target;
        setActivityForm({ ...activityForm, [name]: value });
    }

    const handleFormClose = () => {
        navigate(`/activities/${activityForm.id}`); // Fallback to details page
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' name='title' value={activityForm.title} onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' name='description' value={activityForm.description} onChange={handleInputChange} />
                <Form.Input placeholder='Category' name='category' value={activityForm.category} onChange={handleInputChange} />
                <Form.Input placeholder='Date' type='date' name='date' value={activityForm.date} onChange={handleInputChange} />
                <Form.Input placeholder='City' name='city' value={activityForm.city} onChange={handleInputChange} />
                <Form.Input placeholder='Venue' name='venue' value={activityForm.venue} onChange={handleInputChange} />
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button onClick={handleFormClose} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}