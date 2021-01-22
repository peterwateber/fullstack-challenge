import { OrderCollection, OrderResultState } from "api-contract"
import AsyncAction from "utils/AsyncAuth"

export default class Order {
    static async getAllOrder(token: string = ""): Promise<OrderResultState> {
        return await AsyncAction.get(token, `order`)
    }

    static async getOrderDetails(
        token: string = "",
        uid: string
    ): Promise<OrderCollection> {
        const { order } = await AsyncAction.get(token, `order/${uid}`)
        return order
    }

    static async updateOrderDetails(
        token: string,
        uid: string,
        title: string,
        bookingDate: string
    ): Promise<any> {
        return await AsyncAction.put(token, "order/update", {
            uid,
            title,
            bookingDate,
        })
    }
}
