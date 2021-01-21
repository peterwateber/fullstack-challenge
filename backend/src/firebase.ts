import * as admin from "firebase-admin"
import serviceAccount from "../serviceACcountKey.json"

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
    databaseURL: "https://construyo-coding-challenge.firebaseio.com",
})


export default admin