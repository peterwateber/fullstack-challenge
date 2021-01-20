import { AuthData } from "contexts/AuthProvider"

export class AuthUtil {
    static getTokenFromStorage(): AuthData {
        return JSON.parse(
            window.localStorage.getItem("authData") || ""
        ) as AuthData
    }

    static setTokenStorage(email: string, token: string) {
        window.localStorage.setItem(
            "authData",
            JSON.stringify({ email, token })
        )
    }
}
