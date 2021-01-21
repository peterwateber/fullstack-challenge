export interface LoginRequest {
    token: string
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
    bookingDate: number
}
