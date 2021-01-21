import { OrderCollection, OrderListState } from "api-contract"
import OrderService from "services/OrderService"
import { Action } from "redux"
import { ThunkAction } from "redux-thunk"

export enum OrderActionType {
    SET_ORDER = "set/order",
}

export interface OrderAction {
    type: OrderActionType
    payload: Partial<OrderListState>
}

const setOrder = (order: OrderCollection[], total: number): OrderAction => ({
    type: OrderActionType.SET_ORDER,
    payload: {
        orderList: {
            order,
            total,
        },
    },
})

export const getAllOrders = (
    token: string = ""
): ThunkAction<any, any, any, Action> => {
    return async (dispatch) => {
        if (token) {
            const { order, total } = await OrderService.getAllOrder(token)
            // To avoid internal server errors
            dispatch(setOrder(order || [], total || 0))
        }
    }
}
