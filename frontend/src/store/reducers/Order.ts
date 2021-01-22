import { OrderListState } from "api-contract"
import { OrderAction, OrderActionType } from "store/actions/Order"

const INITIAL_STATE: OrderListState = {
    loading: true,
    orderList: {
        order: [],
        total: 0,
    },
}

const OrderReducer = (
    state = INITIAL_STATE,
    action: OrderAction
): OrderListState => {
    switch (action.type) {
        case OrderActionType.SET_ORDER:
            return {
                ...state,
                ...action.payload,
            }
        case OrderActionType.SET_ORDER_LOADING:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return {
                ...state,
            }
    }
}

export default OrderReducer
