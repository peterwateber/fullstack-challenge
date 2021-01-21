import { sanitizeInput } from "../SanitizeInput"

describe("SanitizeInput", () => {
    it("should throw string error for empty object values", () => {
        expect(() =>
            sanitizeInput({
                title: "",
                message: "",
            })
        ).toThrowError(
            "Field 'title' cannot be empty. Field 'message' cannot be empty."
        )
    })
})
