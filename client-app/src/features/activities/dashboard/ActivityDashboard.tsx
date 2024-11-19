import { useEffect } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActivities, AppDispatch, AppState, setLoading } from '../../../store';
import { Outlet } from 'react-router-dom';
import NavBar from '../../../app/layout/Navbar';


export default function ActivityDashboard() {
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector<AppState>(state => state.activity.loading);

    useEffect(() => {
        const loadActivities = async () => {
            try {
                dispatch(setLoading(true));  // Start loading
                await dispatch(fetchActivities());  // Fetch data
            } catch (error) {
                console.error("Error fetching activities:", error);  // Handle any errors
            } finally {
                dispatch(setLoading(false));  // End loading
            }
        };
        loadActivities()
        console.log('COMPONENT DID MOUNT - DASHBOARD')

        return () => {
            console.log('UNMOUNTED - DASHBOARD')
        }
    }, [dispatch]);

    if (loading) return <LoadingComponent content='Loading App' />


    return (
        <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
                <Outlet />
            </Container>
        </>

    );
}