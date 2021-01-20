export interface ApiError {
    error: boolean
    message: string
}

export interface UserState {
    email: string | undefined
    token: string | undefined
}

export interface AuthState {
    loading: boolean
    modal: ApiError
    user: UserState
}
