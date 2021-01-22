import * as admin from "firebase-admin"
import serviceAccount from "../serviceACcountKey.json"

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
    databaseURL: process.env.FIREBASE_DB_URL,
})


export default admin