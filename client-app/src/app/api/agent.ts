import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Activity } from '../models/activity';
import { toast } from 'react-toastify';
import { router } from '../router/Routes';
import { User, UserFormValues } from '../models/user';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}
axios.defaults.baseURL = 'http://localhost:5000/api';

// let cancelTokenSource = axios.CancelToken.source();

// let requestInterceptor = undefined;

// if (!requestInterceptor) {
//     requestInterceptor = axios.interceptors.request.use(
//         (config) => {
//             console.log("Interceptor is working");
//             // Cancel the previous request if it's still pending
//             cancelTokenSource.cancel('Operation canceled due to new request.');
//             cancelTokenSource = axios.CancelToken.source();
//             config.cancelToken = cancelTokenSource.token;
//             return config;
//         },
//         (error) => {
//             return Promise.reject(error);
//         }
//     );sss
// }

// if (import.meta.hot) {
//     import.meta.hot.accept(() => {
//         axios.interceptors.request.eject(requestInterceptor);
//         console.log("Interceptor ejected due to HMR");
//     });
// }sssssssss
// if (import.meta.hot) {
//     import.meta.hot.accept(() => {
//         window.location.reload();
//     });
// }

// axios.interceptors.response.use(async response => {
//     await sleep(1000);
//     return response;

// }, (error: AxiosError) => {
//     const { data, status } = error.response as AxiosResponse;
//     switch (status) {
//         case 400:
//             if (data.errors) {
//                 const modalStateErrors = [];
//                 for (const key in data.errors) {
//                     if (data.errors[key]) {
//                         modalStateErrors.push(data.errors[key])
//                     }
//                 }
//                 throw modalStateErrors.flat();
//             } else {
//                 toast.error('bad request');
//             }
//             break;
//         case 401:
//             toast.error('unauthorized');
//             break;
//         case 403:
//             toast.error('forbidden');
//             break;
//         case 404:
//             // toast.error('not found');
//             router.navigate('/not-found');
//             break;
//         case 500:
//             toast.error('server error');
//             store.dispatch(setError(data));
//             router.navigate('/server-error');
//             break;
//         default:
//             break;
//     }
//     return Promise.reject(error);s
// })

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
})





axiosInstance.interceptors.response.use(async response => {
    await sleep(1000);
    return response;

}, (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (config.method === 'get' && Object.prototype.hasOwnProperty.call(data.errors, 'id')) {
                console.log(data.errors);
                router.navigate('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } else {
                toast.error('bad request');
            }
            break;
        case 401:
            toast.error('unauthorized');
            break;
        case 403:
            toast.error('forbidden');
            break;
        case 404:
            toast.error('not found');
            router.navigate('/not-found');
            break;
        case 500:
            toast.error('server error');
            // store.dispatch(setError(data));
            console.log(data)
            router.navigate('/server-error', {
                state: {
                    message: data.message,
                    details: data.details
                }
            });
            break;
        default:
            break;
    }
    return Promise.reject(error);
})


const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string, config?: AxiosRequestConfig) => axiosInstance.get<T>(url, { ...config }).then((response: AxiosResponse) => response.data),
    post: <T>(url: string, body: object) => axiosInstance.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: object) => axiosInstance.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axiosInstance.delete<T>(url).then(responseBody)
}

const Activities = {
    list: (config: AxiosRequestConfig) => requests.get<Activity[]>('/activities', config),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => requests.post<void>(`/activities`, activity),
    update: (activity: Activity) => requests.put<Activity>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del<void>(`/activities/${id}`)
}

const Account = {
    current: (config: AxiosRequestConfig) => requests.get<User>('/account', config),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

const agent = {
    Activities,
    Account
}
export default agent;