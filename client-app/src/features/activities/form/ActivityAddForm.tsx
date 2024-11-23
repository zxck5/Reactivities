import { Button, Card, Form, Header, Segment } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { Activity } from '../../../app/models/activity';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import { AppDispatch, createActivity } from '../../../store';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import * as Yup from 'yup';

export default function ActivityAddForm() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [submitting, setSubmitting] = useState(false);

    // const [activityForm, setActivityForm] = useState<Activity>({
    //     id: "",
    //     title: "",
    //     date: null,
    //     description: "",
    //     category: "",
    //     city: "",
    //     venue: ""
    // });
    const activityForm = {
        id: "",
        title: "",
        date: null,
        description: "",
        category: "",
        city: "",
        venue: ""

    }

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity is required'),
        description: Yup.string().required('The description is required'),
        category: Yup.string().required('The category is required'),
        city: Yup.string().required('The city is required'),
        date: Yup.string().required('The date is required'),
        venue: Yup.string().required('The venue is required')
    })


    useEffect(() => {
        console.log('ADDFORM');
        return () => {
            console.log('ADDFORM UNMOUNT');
        }
    }, []);

    const handleSubmit = async (value: Activity) => {
        // e.preventDefault();
        setSubmitting(true);
        value = { ...value, id: uuid() };
        await dispatch(createActivity(value))
        setSubmitting(false);

        navigate(`/activities/${value.id}`); // Fallback to details page
    }

    // const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     const { value, name } = e.target;
    //     setActivityForm({ ...activityForm, [name]: value });
    // }
    const handleClose = () => {
        navigate(`/activities/${activityForm.id}`); // Fallback to details page
    }


    return (
        <Card fluid>
            <Segment fluid clearing>
                <Formik validationSchema={validationSchema} enableReinitialize initialValues={activityForm} onSubmit={(value) => handleSubmit(value)}>
                    {({ handleSubmit, isSubmitting, dirty, isValid }) => (
                        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                            <MyTextInput placeholder={'Title'} name={'title'} />
                            <MyTextArea placeholder={'Description'} name={'description'} rows={3} />
                            <MySelectInput placeholder={'Category'} name={'category'} options={categoryOptions} />
                            <MyDateInput
                                placeholderText='Date'
                                name='date'
                                showTimeSelect
                                timeCaption='time'
                                dateFormat={'MMMM d, yyyy h:mm aa'}
                            />
                            <Header content='Location Details' sub color='teal' />
                            <MyTextInput placeholder='City' name='city' />
                            <MyTextInput placeholder='Venue' name='venue' />
                            <Button
                                disabled={isSubmitting || !dirty || !isValid}
                                loading={submitting} floated='right' positive type='submit' content='Submit' />
                            <Button onClick={handleClose} floated='right' type='button' content='Cancel' />
                        </Form>
                    )}
                </Formik>
            </Segment>
        </Card>

    )
}