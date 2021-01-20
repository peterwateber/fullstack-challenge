import { ApiError, AuthState } from "api-contract"

export enum AuthActionType {
    SET_AUTH_MODAL = "set/general/modal",
    SET_AUTH_USER = "set/general/user",
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

export const setAuthUser = (
    email: string,
    token: string
): AuthAction => ({
    type: AuthActionType.SET_AUTH_USER,
    payload: {
        user: {
            email,
            token,
        },
    },
})
