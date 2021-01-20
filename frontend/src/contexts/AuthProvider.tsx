import Modal from "@material-ui/core/Modal"
import { AuthState } from "api-contract"
import React, { createContext, useEffect, useState } from "react"
import { connect } from "react-redux"
import AuthService from "services/Auth"
import { RootState } from "store"
import { AuthAction, setAuthUser } from "store/actions/Auth"

export const AuthContext = createContext({})

export interface AuthData {
    email: string
    token: string
}

interface DispatchProps {
    setAuthUser: (email: string, token: string) => AuthAction
}

interface Props extends DispatchProps {
    auth?: AuthState
}

const AuthProvider: React.FC<Props> = (props) => {
    const [auth, setAuth] = useState({ loading: true, email: "", token: "" })
    const [modal, setModal] = useState({
        open: props.auth?.modal.error || false,
        message: props.auth?.modal.message,
    })

    const handleClose = () => {
        setModal({ open: false, message: modal.message })
    }

    const setAuthData = (loading: boolean, email: string, token: string) => {
        setAuth({ loading, email, token })
    }

    // set once
    useEffect(() => {
        const authData = JSON.parse(
            window.localStorage.getItem("authData") || "{}"
        ) as AuthData
        props.setAuthUser(authData.email, authData.token)
    }, [])

    useEffect(() => {
        async function getToken() {
            await AuthService.validateAuth(props.auth?.user?.token)
            setAuth({
                loading: !props.auth?.loading,
                email: props.auth?.user?.email || "",
                token: props.auth?.user?.token || "",
            })
        }
        getToken()
    }, [props.auth])

    return (
        <AuthContext.Provider value={{ auth, setAuthData }}>
            <div className="container">
                {props.children}
                <Modal open={modal.open} onClose={handleClose}>
                    <strong>{modal.message}</strong>
                </Modal>
            </div>
        </AuthContext.Provider>
    )
}

const mapStateToProps = (state: RootState) => ({
    auth: state.auth,
})

const mapDispatchToProps = {
    setAuthUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider)
