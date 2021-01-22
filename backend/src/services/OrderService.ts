import admin from "../firebase"
import {
    transformOrderArrayForFrontend,
    transformOrderDataForFrontend,
} from "../utils/OrderTransformation"

class OrderService {
    constructor(
        private readonly db: admin.firestore.Firestore = admin.firestore()
    ) {}

    async getAllOrder(): Promise<any> {
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
        return typeof snapshot.data() !== "undefined"
            ? transformOrderDataForFrontend(snapshot.data())
            : {}
    }

    async updateOrderDetails(
        uid: string,
        title: string,
        bookingDate: string
    ): Promise<void> {
        try {
            await this.db.collection("orders").doc(uid).update({
                title,
                bookingDate,
            })
        } catch (ex) {
            throw "No order found."
        }
    }
}

export default OrderService
