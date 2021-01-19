import Koa from "koa"
import * as admin from "firebase-admin"

export interface AuthResponse {
    uid: string
}

export class AuthService {
    public static async authenticate(token: string): Promise<AuthResponse> {
        try {
            const user = await admin.auth().verifyIdToken(token)
            return {
                uid: user.uid,
            }
        } catch (ex) {}
    }
}
