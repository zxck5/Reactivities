import { useLocation } from "react-router-dom";
import { Container, Header, Segment } from "semantic-ui-react";




export default function ServerError() {
    const location = useLocation();
    const message = location.state?.message; // Access the state
    const details = location.state?.details;

    return (
        <Container>
            <Header as={'h1'} content='Server Error' />
            <Header sub as={'h5'} color="red" content={message} />
            {details && (
                <Segment>
                    <Header as={'h4'} content='Stack trace' color="teal" />
                    <code style={{ marginTop: '10px' }}>{details}</code>
                </Segment>
            )}
        </Container>
    )
}