import { ErrorMessage, Form, Formik, FormikErrors } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Header, Label } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { UserFormValues } from "../../app/models/user";
import { registerUserAsyncThunk } from "../../store/slice/Api/AccountSliceAsyncThunk";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import ValidationError from "../errors/ValidationError";
export default function RegisterForm() {
    const [submitting, setSubmitting] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const initialValues = {
        email: "",
        password: "",
        displayName: "",
        userName: "",
        error: null
    }
    const validationSchema = Yup.object({
        email: Yup.string().required('The email is required'),
        password: Yup.string().required('The password is required'),
        displayName: Yup.string().required('The display name is required'),
        userName: Yup.string().required('The username is required'),
    })


    const handleFormSubmit = async (
        value: UserFormValues,
        setErrors: (errors: FormikErrors<{ email: string; password: string; displayName: string; userName: string; error: null; }>) => void
    ) => {
        setSubmitting(true);
        dispatch(registerUserAsyncThunk(value))
            .then((action) => {
                console.log(action)
                if (action.type === registerUserAsyncThunk.fulfilled.toString()) {
                    navigate('/');
                } else if (action.type === registerUserAsyncThunk.rejected.toString()) {
                    console.log('Error during register : ', action.payload);
                    setErrors({ error: action.payload })
                }
            }).finally(() => {
                setSubmitting(false);
            })
        // try {
        //     // await dispatch(loginUserAsyncThunk(value)).unwrap();
        //     const result = await dispatch(loginUserAsyncThunk(value));
        //     // unwrap returns the payload(fullfilled) or throws error directly
        // } catch (error) {
        //     console.log('Error during login : ', error);
        //     setErrors({ error: "Invalid email or password" });
        // } finally {
        //     setSubmitting(false);
        // }
        // Without unwrap(), the dispatched action returns a full action object(which includes meta, payload, error, etc.),
        // rather than just the payload.You need to check the meta.requestStatus to determine if the action was fulfilled or rejected.
    };


    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={(values, { setErrors }) => handleFormSubmit(values, setErrors)}
        >
            {({ handleSubmit, errors, dirty, isValid }) => (
                <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
                    <Header as='h2' content='Sign up to Reactivities' color='teal' textAlign="center" />
                    <MyTextInput placeholder="Display Name" name="displayName" />
                    <MyTextInput placeholder="Username" name="userName" />
                    <MyTextInput placeholder="Email" name="email" />
                    <MyTextInput placeholder="Password" name="password" type='password' />
                    <ErrorMessage
                        name={"error"} render={() =>
                            // <Label style={{ marginBottom: 10 }} basic color="red" content={errors.error} />}
                            <ValidationError errors={errors.error as unknown as string[]} />}
                    />
                    <Button loading={submitting} positive content='Register' type="submit" fluid
                        disabled={submitting || !dirty || !isValid} />
                </Form>
            )}

        </Formik>
    )
}