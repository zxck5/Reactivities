import { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState, fetchActivities, setLoading } from '../../../store';
import { Outlet } from 'react-router-dom';
import { Activity } from '../../../app/models/activity';
import NavBar from '../../../app/layout/Navbar';


export default function ActivityDashboard() {
    const dispatch = useDispatch<AppDispatch>();
    // const { setLoading, fetchActivities } = activityStore;
    const loading = useSelector<AppState, boolean>(state => state.activity.loading);
    const activities = useSelector<AppState, Activity[]>(state => state.activity.data);

    useEffect(() => {
        const loadActivities = async () => {
            try {
                dispatch(setLoading(true));  // Start loadingssss
                await dispatch(fetchActivities());  // Fetch data
                // TODO: if it fails
            } catch (error) {
                console.error("Error fetching activities:", error);  // Handle any errors
            } finally {
                dispatch(setLoading(false));  // End loading
            }
        };
        if (activities.length == 0) loadActivities();

        // loadActivities();
        console.log('COMPONENT DID MOUNT - DASHBOARD')

        return () => {
            console.log('UNMOUNTED - DASHBOARD')
        }
    }, [dispatch, activities]);

    if (loading) return <LoadingComponent content='Loading Activities...' />


    return (
        <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
                <Outlet />
            </Container>
        </>
    );
}