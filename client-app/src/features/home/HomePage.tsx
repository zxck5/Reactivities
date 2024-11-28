import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { AppDispatch, AppState, openModal, store } from "../../store";
import { User } from "../../app/models/user";
import NavBar from "../../app/layout/Navbar";
import LoadingComponent from "../../app/layout/LoadingComponents";

export default function Home() {
    const user = useSelector<AppState, User | undefined>(state => state.account.user);
    const loading = useSelector<AppState>(state => state.common.appLoaded);

    const dispatch = useDispatch<AppDispatch>();
    console.log(store.getState())

    if (loading) return <LoadingComponent content='Loading App' />

    return (
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as='h1' inverted>
                    <Image size="massive" src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
                    Reactivities
                </Header>
                {user ? (
                    <>
                        <NavBar />
                        <Header as={'h2'} inverted content='Welcome to Reactivities' />
                        <Button as={Link} to='/activities' size="huge" inverted>
                            Go to the Activities
                        </Button>

                    </>
                ) : (
                    <>
                        <Button onClick={() => dispatch(openModal("LoginForm"))} size="huge" inverted>
                            Login!
                        </Button>
                        <Button onClick={() => dispatch(openModal("RegisterForm"))} size="huge" inverted>
                            Register!
                        </Button>

                    </>
                )}
            </Container>

        </Segment>
    )
}