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

    static showAuthError(err: Error) {
        return {
            ...err,
            error: true,
            title: "Authentication error.",
            message: "Authentication is required. You will need to login.",
        }
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
            return AsyncAction.showAuthError(ex)
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
        } catch (ex) {
            return AsyncAction.showAuthError(ex)
        }
    }
}
