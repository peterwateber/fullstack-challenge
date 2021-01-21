import admin, { firestore } from "firebase-admin"
import {
    transformOrderArrayForFrontend,
    transformOrderDataForFrontend,
} from "../utils/OrderTransformation"

class OrderService {
    constructor(private readonly db: firestore.Firestore = admin.firestore()) {}

    async getAllOrder(lastId: string, limitDisplay: number): Promise<any> {
        const allSnapshot = await this.db.collection("orders").get()
        return {
            total: allSnapshot.size,
            order: transformOrderArrayForFrontend(allSnapshot.docs),
        }
        // const snapshot = await this.db
        //     .collection("orders")
        //     .orderBy("bookingDate", "desc")
        //     .startAfter(lastId)
        //     .limit(limitDisplay)
        //     .get()
        // return {
        //     total: allSnapshot.size,
        //     order: transformOrderArrayForFrontend(snapshot.docs),
        // }
    }

    async getOrderDetails(uid: string): Promise<any> {
        const snapshot = await this.db.collection("orders").doc(uid).get()
        return transformOrderDataForFrontend(snapshot.data())
    }
}

export default OrderService
