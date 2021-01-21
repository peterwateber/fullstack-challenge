export interface ApiError {
    error: boolean
    message: string
    title: string
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

export interface OrderListState {
    orderList: OrderResultState
}

export interface OrderCollection {
    id: string
    title: string
    customer: {
        email: string
        phone: string
        name: string
    }
    address: {
        country: string
        zip: string
        street: string
        city: string
    }
    fullAddress: string
    bookingDate: any
}

export interface OrderResultState {
    total: number
    order: OrderCollection[]
}
