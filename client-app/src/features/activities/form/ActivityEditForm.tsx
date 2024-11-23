import { Button, Card, Header, Segment } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Activity } from '../../../app/models/activity';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState, setSelectedActivity, updateActivity } from '../../../store';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';



export default function ActivityForm() {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();
    const selectedActivity = useSelector<AppState, Activity | undefined>(state => state.activity.selectedActivity);

    // const [activityForm, setActivityForm] = useState<Activity>({
    //     id: selectedActivity?.id ?? "",
    //     title: selectedActivity?.title ?? "",
    //     date: selectedActivity?.date ?? null,
    //     description: selectedActivity?.description ?? "",
    //     category: selectedActivity?.category ?? "",
    //     city: selectedActivity?.city ?? "",
    //     venue: selectedActivity?.venue ?? ""
    // });

    const [submitting, setSubmitting] = useState(false);

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity is required'),
        description: Yup.string().required('The description is required'),
        category: Yup.string().required('The category is required'),
        city: Yup.string().required('The city is required'),
        date: Yup.string().required('The date is required'),
        venue: Yup.string().required('The venue is required')
    })


    useEffect(() => {
        if (!selectedActivity) {
            // Redirect to another route if selectedActivity is null
            navigate("/activity/create");
        }

    }, [selectedActivity, navigate])



    const handleFormSubmit = async (value: Activity) => {
        setSubmitting(true);
        await dispatch(updateActivity(value));
        setSubmitting(false);
        dispatch(setSelectedActivity(value));
        // TODO : CURRENT ISSUE, the activity from location.state is not consistent when user
        // clicks forward button on the web. THE STATE IS ONLY KEPT UPDATE when user clicks EDIT BUTTON
        // 1. we can make it UP-TO-DATE by getting id from useParams() and pick up from redux store
        // 2. make new state in redux for this (THIS is more valid approach)
        if (location.state?.from) {
            navigate(-1); // Go back if history exists
        } else {
            navigate(`/activities/${selectedActivity!.id}`); // Fallback to details page
        }

    }

    // const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     const { value, name } = e.target;
    //     setActivityForm({ ...activityForm, [name]: value });
    // }

    const handleClose = () => {
        navigate(`/activities/${selectedActivity!.id}`); // Fallback to details page
    }

    return (
        <Card fluid>
            <Segment clearing>
                <Header content='Activity Details' sub color='teal' />
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={selectedActivity!}
                    onSubmit={(value) => handleFormSubmit(value)}>
                    {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                            {/* <FormField>
                                <Field placeholder='Title' name='title' />
                                <ErrorMessage name='title'
                                    render={error => <Label basic color='red' content={error} />} />
                            </FormField> */}
                            <MyTextInput name='title' placeholder='Title' />

                            <MyTextArea rows={3} placeholder='Description' name='description' />
                            <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
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