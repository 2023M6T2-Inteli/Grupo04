import axiosPackage, {AxiosInstance} from "axios";
import {getSession} from "next-auth/react";

interface Axios extends AxiosInstance {
    CancelToken?: any;
    isCancel?: any;
}

const axios: Axios = axiosPackage.create({
    // withCredentials: true,
    baseURL: 'http://3.217.9.103:3001',
    headers: {
        common: {
            Accept: "application/json",
        },
    },
});

axios.interceptors.request.use(async (config) => {
    const session = await getSession();
    // @ts-ignore
    config.headers.Authorization = `Bearer ${session?.accessToken}`;
    return config;
});

axios.CancelToken = axiosPackage.CancelToken;
axios.isCancel = axiosPackage.isCancel;

export {axios};