import { ApiError } from "api-contract"
import axios, { AxiosResponse } from "axios"

const API_URL = "/api/v1/"

export default class AsyncAction {
    private static _setHeader(token: string | undefined) {
        axios.defaults.headers = {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            token: token ?? "",
        }
    }

    static async showAuthError(error: ApiError) {
        // show modal
    }

    static async get(
        token: string | undefined,
        url: string,
        parameter?: object
    ): Promise<any> {
        AsyncAction._setHeader(token)
        try {
            const response: AxiosResponse = await axios.get(
                API_URL.concat(url),
                parameter
            )
            return response.data
        } catch (ex) {
            AsyncAction.showAuthError(ex)
            return {
                ...ex,
                error: true,
            }
        }
    }

    static async post(
        token: string,
        url: string,
        parameter?: object
    ): Promise<any> {
        AsyncAction._setHeader(token)
        try {
            const response: AxiosResponse = await axios.post(
                API_URL.concat(url),
                parameter
            )
            return response.data
        } catch (ex) {}
    }
}
