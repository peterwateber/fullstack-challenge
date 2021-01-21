import admin from "../firebase"

export interface AuthResponse {
    uid: string
}

export class AuthService {
    public static async authenticate(token: string): Promise<AuthResponse> {
        try {
            const user = await admin.auth().verifyIdToken(token, true)
            return {
                uid: user.uid,
            }
        } catch (ex) {
            console.log("Error", ex)
        }
    }
}
