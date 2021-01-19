import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import FIREBASE_CONFIG from "../firebaseConfig"

if (firebase.apps.length === 0) {
    firebase.initializeApp(FIREBASE_CONFIG)
}

export default class AuthService {
    static async auth(email: string, password: string) {
        try {
            await firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
            const token = await firebase.auth().currentUser?.getIdToken(true)
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
}
