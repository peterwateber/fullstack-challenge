import { AuthService } from "../AuthService"
import admin from "../../firebase"

describe("AuthService", () => {
    it("firebase/firestore should respond with the unique id", async () => {
        jest.spyOn(admin, "auth").mockImplementation(() => {
            return {
                onAuthStateChanged: jest.fn(),
                currentUser: {
                    displayName: "testDisplayName",
                    email: "test@test.com",
                    emailVerified: true,
                },
                verifyIdToken: jest.fn(() => ({
                    uid: "123"
                }))
            } as any
        })

        AuthService.authenticate("123")
        expect(admin.auth).toHaveBeenCalled()
    })
})
