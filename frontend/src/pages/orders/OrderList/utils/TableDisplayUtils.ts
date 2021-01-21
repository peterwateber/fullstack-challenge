import { OrderCollection } from "api-contract"
import { DataType, Order } from "../types/Common"

export const createTableData = (
    id: string | undefined = "",
    title: string | undefined = "",
    bookingDate: any,
    address: string | undefined = "",
    customer: string | undefined = "",
): DataType => {
    return { id, title, bookingDate, address, customer }
}

const descendingComparator = <T>(a: T, b: T, orderBy: keyof T) => {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

export function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
) => number {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}

export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
}


export const tableRowDisplay = (order: Partial<OrderCollection>) => (createTableData(
    order.id,
    order.title,
    order.bookingDate,
    order.fullAddress,
    order.customer?.name
))