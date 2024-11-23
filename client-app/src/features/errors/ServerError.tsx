import { useSelector } from "react-redux";
import { Container, Header, Segment } from "semantic-ui-react";
import { AppState } from "../../store";

export default function ServerError() {
    const message = useSelector<AppState>(state => state.error.message);
    const details = useSelector<AppState>(state => state.error.details);
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