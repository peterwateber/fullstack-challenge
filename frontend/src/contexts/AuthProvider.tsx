import React, { createContext, useEffect, useState } from "react"

export const AuthContext = createContext({})

export interface AuthData {
    email: string
    token: string
}

const AuthProvider = (props: any) => {
    const [auth, setAuth] = useState({ email: "", token: "" })

    const setAuthData = async (authData: AuthData) => {
        setAuth(authData)
    }

    useEffect(() => {
        const authData = (window.localStorage.getItem("authData") ||
            {}) as AuthData
        setAuth({
            email: authData?.email,
            token: authData?.token,
        })
    }, [])

    useEffect(() => {
        window.localStorage.setItem("authData", JSON.stringify(auth))
    }, [auth.token])

    return (
        <AuthContext.Provider value={{ auth, setAuthData }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
