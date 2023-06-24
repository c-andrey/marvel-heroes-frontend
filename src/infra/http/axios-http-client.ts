import axios, { AxiosResponse } from 'axios';
import { HttpClient, HttpRequest, } from './protocols/http-client.types';

export class AxiosHttpClient implements HttpClient {
    async request(data: HttpRequest): Promise<AxiosResponse> {
        let axiosResponse: AxiosResponse;

        if (data?.params) {
            Object.keys(data.params).forEach((key) => {
                if (data.params[key] === undefined || data.params[key] === null || data.params[key] === '') {
                    delete data.params[key];
                }
            });
        }

        try {
            axiosResponse = await axios.request({
                url: data.url,
                method: data.method,
                data: data.body,
                headers: data.headers,
                params: data.params
            });
        } catch (error) {
            throw error
        }

        return axiosResponse
    }
}