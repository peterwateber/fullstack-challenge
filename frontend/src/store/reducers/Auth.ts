import { AuthState } from "api-contract"
import { AuthAction, AuthActionType } from "store/actions/Auth"

const INITIAL_STATE: AuthState = {
    loading: true,
    modal: {
        error: false,
        message: "",
        title: ""
    },
    user: {
        email: undefined,
        token: undefined,
    },
}

const AuthReducer = (
    state = INITIAL_STATE,
    action: AuthAction
): AuthState => {
    switch (action.type) {
        case AuthActionType.SET_AUTH_MODAL:
            return {
                ...state,
                loading: false,
                ...action.payload,
            }
        case AuthActionType.SET_AUTH_USER:
            window.localStorage.setItem(
                "authData",
                JSON.stringify(action.payload.user)
            )
            return {
                ...state,
                loading: false,
                ...action.payload,
            }
        case AuthActionType.CLEAR_AUTH_USER:
            window.localStorage.clear()
            return {
                ...state,
                loading: false,
                ...action.payload,
            }
        default:
            return {
                ...state,
            }
    }
}

export default AuthReducer