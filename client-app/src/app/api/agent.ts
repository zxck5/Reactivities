import axios, { AxiosResponse } from 'axios';
import { Activity } from '../models/activity';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve,delay);
    })
}

// const myPromise = new Promise((resolve) => {
//     setTimeout(() => {
//         resolve("Operation successful!"); // Fulfill the Promise after 2 seconds
//     }, 2000);
// });

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get : <T> (url: string) => axios.get<T>(url).then((response: AxiosResponse) => response.data),
    post : async <T>(url: string, body: object) => await axios.post<T>(url,body),
    put : async <T>(url: string, body: object) => await axios.put<T>(url,body),
    del : <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Activities = {
    list : () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: async (activity: Activity) => await requests.post<void>(`/activities`, activity),
    update: async (activity: Activity) => await requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del<void>(`/activities/${id}`)
}

const agent = {
    Activities
}
export default agent;