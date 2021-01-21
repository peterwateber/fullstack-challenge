import { ApiError } from "api-contract"
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import AsyncAction from "utils/AsyncAuth"
import FIREBASE_CONFIG from "../firebaseConfig"

if (firebase.apps.length === 0) {
    firebase.initializeApp(FIREBASE_CONFIG)
}

export default class AuthService {
    // static checkUser() {
    //     firebase.auth().onAuthStateChanged(function (user) {
    //         if (user) {
    //             console.log(user)
    //         } else {
    //             console.log("logged out")
    //         }
    //     })
    // }

    static async validateAuth(token: string | undefined): Promise<ApiError> {
        return await AsyncAction.get(token, "auth")
    }

    static async auth(email: string, password: string) {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
            const token = await firebase.auth().currentUser?.getIdToken()
            return {
                email,
                token,
                error: false,
            }
        } catch (ex) {
            return {
                ...ex,
                error: true,
            }
        }
    }

    static async signOut() {
        await firebase.auth().signOut()
    }
}
