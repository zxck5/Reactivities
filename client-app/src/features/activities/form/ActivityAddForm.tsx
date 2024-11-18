import { Button, Form, Segment } from 'semantic-ui-react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Activity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import { AppDispatch, createActivity } from '../../../store';
import { useNavigate } from 'react-router-dom';

export default function ActivityAddForm() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [submitting, setSubmitting] = useState(false);
    const [activityForm, setActivityForm] = useState<Activity>({
        id: "",
        title: "",
        date: "",
        description: "",
        category: "",
        city: "",
        venue: ""
    });
    useEffect(() => {
        console.log('ADDFORM');
        return () => {
            console.log('ADDFORM UNMOUNT');
        }
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        await dispatch(createActivity({ ...activityForm, id: uuid() }))
        setSubmitting(false);

        navigate(`/activities/${activityForm.id}`); // Fallback to details page
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, name } = e.target;
        setActivityForm({ ...activityForm, [name]: value });
    }


    return (
        <Segment clearing>
            <Form onSubmit={(e) => handleSubmit(e)} autoComplete='off'>
                <Form.Input placeholder='Title' name='title' value={activityForm.title} onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' name='description' value={activityForm.description} onChange={handleInputChange} />
                <Form.Input placeholder='Category' name='category' value={activityForm.category} onChange={handleInputChange} />
                <Form.Input placeholder='Date' type='date' name='date' value={activityForm.date} onChange={handleInputChange} />
                <Form.Input placeholder='City' name='city' value={activityForm.city} onChange={handleInputChange} />
                <Form.Input placeholder='Venue' name='venue' value={activityForm.venue} onChange={handleInputChange} />
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}