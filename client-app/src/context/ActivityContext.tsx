// import { createContext, ReactNode, useCallback, useState } from "react";
// import { Activity } from "../app/models/activity";
// import agent from '../app/api/agent';
// import { v4 as uuid } from 'uuid';

// type ActivityContextType = {
//     activities: Activity[];
//     selectedActivity: Activity | undefined;
//     // editMode: boolean;
//     loading: boolean;
//     submitting: boolean;
//     handleSelectActivity: (id: string) => void;
//     handleCancleSelectActivity: () => void;
//     handleFormOpen: (id?: string) => void;
//     // handleFormClose: () => void;
//     getActivities: () => void;
//     handleCreateOrEditActivity: (activity: Activity) => void;
//     handleDeleteActivity: (id: string) => void;
// }


// const ActivityContext = createContext<ActivityContextType | null>(null);

// const ActivityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

//     const [activities, setActivities] = useState<Activity[]>([]);
//     const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
//     // const [editMode, setEditMode] = useState<boolean>(false);
//     const [loading, setLoading] = useState(true);
//     const [submitting, setSubmitting] = useState<boolean>(false);

//     const getActivities = useCallback(async () => {
//         agent.Activities.list().then(response => {
//             console.log(response);
//             response.forEach((activity: { date: string; }) => {
//                 // console.log(activity);
//                 activity.date = activity.date.split('T')[0];
//             })
//             setActivities(response);
//             setLoading(false);
//         });
//         // const response = await axios.get('http://localhost:5000/api/activities');
//         // setActivities(response.data);
//     }, [])

//     const sleep = (delay: number) => {
//         return new Promise((resolve) => {
//             setTimeout(resolve, delay);
//         });
//     };
//     const handleSelectActivity = async (id: string) => {
//         setLoading(true);
//         await sleep(1000);
//         setLoading(false);
//         setSelectedActivity(activities.find(x => x.id === id))
//     }

//     const handleCancleSelectActivity = () => {
//         setSelectedActivity(undefined);
//     }

//     const handleFormOpen = (id?: string) => {
//         if (id) {
//             handleSelectActivity(id);
//         } else {
//             setSelectedActivity(undefined);
//         }
//         // setEditMode(true);
//     }
//     // const handleFormClose = () => {
//     // setEditMode(false);
//     // }
//     // TODO: Seperate create and edit
//     const handleCreateOrEditActivity = async (activity: Activity) => {
//         setSubmitting(true);
//         // edit
//         if (activity.id) {
//             await agent.Activities.update(activity);
//             setActivities([...activities.filter((e) => e.id !== activity.id), activity]);
//             setSelectedActivity(activity);
//         } else {
//             // create
//             activity.id = uuid();
//             await agent.Activities.create(activity);
//             setActivities([...activities, { ...activity, id: activity.id }]);
//             setSelectedActivity(undefined);
//         }
//         // setEditMode(false);
//         setSubmitting(false);
//     }

//     const handleDeleteActivity = (id: string) => {
//         setSubmitting(true);
//         agent.Activities.delete(id)
//             .then(() => {
//                 setActivities([...activities.filter((e) => e.id !== id)]);
//                 setSubmitting(false);
//             });
//     }


//     return <ActivityContext.Provider value={
//         {
//             activities,
//             selectedActivity,
//             // editMode,
//             loading,
//             getActivities,
//             handleSelectActivity,
//             handleCancleSelectActivity,
//             handleFormOpen,
//             // handleFormClose,
//             handleCreateOrEditActivity,
//             handleDeleteActivity,
//             submitting
//         }}>
//         {children}
//     </ActivityContext.Provider>
// }
// export { ActivityProvider }
// export default ActivityContext;
