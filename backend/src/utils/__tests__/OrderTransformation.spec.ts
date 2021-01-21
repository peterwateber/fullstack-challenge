import {
    transformOrderArrayForFrontend,
    transformOrderDataForFrontend,
} from "../OrderTransformation"

const sampleOrder1 = [
    {
        id: "0169f9a2-886e-428e-a26e-8b42f7512248",
        data() {
            return {
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
            }
        },
    },
]

const sampleOrder2 = {
    id: "0169f9a2-886e-428e-a26e-8b42f7512248",
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
}

describe("AuthService", () => {
    it("should add fullAddress and id for transformOrderArrayForFrontend()", async () => {
        expect(transformOrderArrayForFrontend(sampleOrder1)).toEqual([
            {
                address: {
                    city: "California",
                    country: "United States of America",
                    street: "Freemont",
                    zip: "333",
                },
                bookingDate: 1607904000000,
                customer: {
                    email: "talk2ajah@gmail.com",
                    name: "Ajah Chukwuemeka",
                    phone: "08034017159",
                },
                fullAddress:
                    "Freemont<br />California<br />333<br />United States of America<br />",
                id: "0169f9a2-886e-428e-a26e-8b42f7512248",
                title: "Ajah3232453677000",
            },
        ])
    })

    it("should add fullAddress and id for transformOrderDataForFrontend()", async () => {
        expect(transformOrderDataForFrontend(sampleOrder2)).toEqual({
            address: {
                city: "California",
                country: "United States of America",
                street: "Freemont",
                zip: "333",
            },
            bookingDate: 1607904000000,
            customer: {
                email: "talk2ajah@gmail.com",
                name: "Ajah Chukwuemeka",
                phone: "08034017159",
            },
            fullAddress:
                "Freemont<br />California<br />333<br />United States of America<br />",
            id: "0169f9a2-886e-428e-a26e-8b42f7512248",
            title: "Ajah3232453677000",
        })
    })
})
