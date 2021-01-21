import admin from "../../firebase"
import OrderService from "../OrderService"

const sampleOrder = {
    customer: {
        name: "Ajah Chukwuemeka",
        email: "talk2ajah@gmail.com",
        phone: "08034017159",
    },
    title: "Ajah3232453677000",
    bookingDate: 1607904000000,
    address: {
        city: "California",
        zip: "333",
        street: "Freemont",
        country: "United States of America",
    },
    id: "0169f9a2-886e-428e-a26e-8b42f7512248",
    fullAddress:
        "Freemont<br />California<br />333<br />United States of America<br />",
}

describe("OrderService", () => {
    let orderService: OrderService

    beforeEach(async () => {
        jest.spyOn(admin, "firestore").mockImplementation(() => {
            return {
                collection: jest.fn(() => ({
                    get: jest.fn(() => ({
                        size: 1,
                        docs: [
                            {
                                id: sampleOrder.id,
                                data() {
                                    return sampleOrder
                                },
                            },
                        ],
                    })),
                    doc: jest.fn(() => ({
                        get: jest.fn(() => ({
                            id: sampleOrder.id,
                            data() {
                                return sampleOrder
                            },
                        })),
                        update: jest.fn(),
                    })),
                })),
            } as any
        })
        orderService = new OrderService()
    })

    it("firebase/firestore should return collection orders", async () => {
        expect(await orderService.getAllOrder()).toEqual({
            total: 1,
            order: [sampleOrder],
        })
    })

    it("firebase/firestore should get order details based on uid", async () => {
        expect(await orderService.getOrderDetails("123")).toEqual(sampleOrder)
    })

    it("firebase/firestore should successfully perform update based on uid", async () => {
        expect(
            await orderService.updateOrderDetails("123", "Title", "1234567")
        ).toEqual(undefined)
    })
})
