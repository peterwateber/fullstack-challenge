import { AuthState } from "api-contract"

export enum AuthActionType {
    SET_AUTH_MODAL = "set/general/modal",
    SET_AUTH_USER = "set/general/user",
    CLEAR_AUTH_USER = "set/general/clear",
    SET_ORDER = "set/order",
}

export interface AuthAction {
    type: AuthActionType
    payload: Partial<AuthState>
}

/**
 * Action Creator
 */
export const setAuthModal = (
    payload: Pick<AuthState, "modal">
): AuthAction => ({
    type: AuthActionType.SET_AUTH_MODAL,
    payload,
})

export const setAuthUser = (email: string, token: string): AuthAction => ({
    type: AuthActionType.SET_AUTH_USER,
    payload: {
        user: {
            email,
            token,
        },
    },
})

export const clearAuthUser = (): AuthAction => ({
    type: AuthActionType.CLEAR_AUTH_USER,
    payload: {
        user: {
            email: "",
            token: "",
        },
    },
})



// const getOrderDetails = (uid: string) => {
//     return (dispatch) => {
//         dispatch
//     }
// }
