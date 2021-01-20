import { AuthState } from "api-contract"
import { AuthAction, AuthActionType } from "store/actions/Auth"

const INITIAL_STATE: AuthState = {
    loading: false,
    modal: {
        error: false,
        message: "",
    },
    user: {
        email: undefined,
        token: undefined,
    },
}

export const AuthReducer = (
    state = INITIAL_STATE,
    action: AuthAction
): AuthState => {
    switch (action.type) {
        case AuthActionType.SET_AUTH_MODAL:
            return {
                ...state,
                loading: true,
                ...action.payload,
            }
        case AuthActionType.SET_AUTH_USER:
            window.localStorage.setItem(
                "authData",
                JSON.stringify(action.payload.user)
            )
            return {
                ...state,
                loading: true,
                ...action.payload,
            }
        default:
            return {
                ...state,
            }
    }
}
