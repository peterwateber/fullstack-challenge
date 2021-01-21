import { OrderCollection } from "../api-contract"

export const transformOrderArrayForFrontend = (orderDoc: any): OrderCollection => {
    return orderDoc.map((d: any) => ({
        ...d.data(),
        id: d.id,
        fullAddress: cleanAddress(d.data()),
    }))
}

export const transformOrderDataForFrontend = (orderDoc: any): OrderCollection => {
    return {
        ...orderDoc,
        fullAddress: cleanAddress(orderDoc),
    }
}

const cleanAddress = (orderDoc: any) => {
    let fullAddress = ""
    const address =
        typeof orderDoc.address !== "undefined" ? orderDoc?.address : orderDoc

    if (address.street) fullAddress += (address?.street || "").concat("<br />")
    if (address.city) fullAddress += (address?.city || "").concat("<br />")
    if (address.zip) fullAddress += (address?.zip || "").concat("<br />")
    if (address.country) fullAddress += (address?.country || "").concat("<br />")

    return fullAddress
}
