import { useContext } from "react";
import ActivityContext from '../../../context/ActivityContext';

export default function useActivityContext() {
    const context = useContext(ActivityContext);
    if (!context) {
        throw new Error("useActivityContext must be used within an ActivityProvider");
    }
    return context;
}