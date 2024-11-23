import { Button, Header, Segment } from "semantic-ui-react";
import { useState } from "react";
import ValidationError from "./ValidationError";
import { axiosInstance } from "../../app/api/agent";


export default function TestErrors() {
    const [errors, setErrors] = useState(null);


    const handleNotFound = () => {
        axiosInstance.get('/buggy/not-found').catch(err => console.log(err.response));
    };

    const handleBadRequest = () => {
        axiosInstance.get('/buggy/bad-request').catch(err => console.log(err.response));
    };

    const handleServerError = () => {
        axiosInstance.get('/buggy/server-error').catch(err => console.log(err.response));
    };

    const handleUnauthorised = () => {
        axiosInstance.get('/buggy/unauthorised').catch(err => console.log(err.response))
    };

    const handleBadGuid = () => {
        axiosInstance.get('/activities/notaguid').catch(err => console.log(err.response));
    };

    const handleValidationError = () => {
        axiosInstance.post('/activities', {}).catch((err) => {
            console.log("What error is being catched", err);
            if (err) setErrors(() => err);
        });
    };


    return (
        <>
            <Header as='h1' content='Test Error component' />
            <Segment>
                <Button.Group widths='7'>
                    <Button onClick={handleNotFound} content='Not Found' basic primary />
                    <Button onClick={handleBadRequest} content='Bad Request' basic primary />
                    <Button onClick={handleValidationError} content='Validation Error' basic primary />
                    <Button onClick={handleServerError} content='Server Error' basic primary />
                    <Button onClick={handleUnauthorised} content='Unauthorised' basic primary />
                    <Button onClick={handleBadGuid} content='Bad Guid' basic primary />
                </Button.Group>
            </Segment>
            {errors && <ValidationError errors={errors} />}
        </>
    )
}
