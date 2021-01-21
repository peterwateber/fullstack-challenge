import format from "date-fns/format"

export const formatBookingDate = (bookingDate: string = "") => {
    return format(parseInt(bookingDate) || 0, "MMM d, yyyy")
}
