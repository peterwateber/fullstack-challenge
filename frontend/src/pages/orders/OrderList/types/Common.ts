export interface DataType {
    id: string,
    title: string,
    bookingDate: string,
    address: string,
    customer: string,
}

export type Order = "asc" | "desc"

export type OrderBy = keyof DataType