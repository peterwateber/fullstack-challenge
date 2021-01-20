import { AuthState } from "api-contract"
import { createStore, combineReducers } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { AuthReducer } from "./reducers/Auth"

export interface RootState {
    auth: AuthState
}

const staticReducer = {
    // user: UserReducer,
    auth: AuthReducer,
}

const rootReducer = combineReducers<RootState>(staticReducer)

export default createStore(rootReducer, composeWithDevTools())
