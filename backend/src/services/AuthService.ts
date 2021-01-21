import * as admin from "firebase-admin"

export interface AuthResponse {
    uid: string
}

export class AuthService {
    public static async authenticate(token: string): Promise<AuthResponse> {
        try {
            const user = await admin.auth().verifyIdToken(token, true)
            const metadataRef = admin.database().ref('metadata/' + user.uid);
            return {
                uid: user.uid,
            }
        } catch (ex) {
            console.log("Error", ex)
        }
    }
}
