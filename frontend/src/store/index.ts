import { AuthState, OrderListState } from "api-contract"
import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import AuthReducer from "./reducers/Auth"
import OrderReducer from "./reducers/Order"

export interface RootState {
    auth: AuthState
    orderList: OrderListState
}

const staticReducer = {
    // user: UserReducer,
    auth: AuthReducer,
    orderList: OrderReducer
}

const rootReducer = combineReducers<RootState>(staticReducer)

export default createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)
