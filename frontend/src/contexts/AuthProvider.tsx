import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import { AuthState } from "api-contract"
import React, { createContext, useEffect, useState } from "react"
import { connect } from "react-redux"
import AuthService from "services/Auth"
import { RootState } from "store"
import { AuthAction, setAuthUser, clearAuthUser } from "store/actions/Auth"

export const AuthContext = createContext({})

export interface AuthData {
    email: string
    token: string
}

interface DispatchProps {
    setAuthUser: (email: string, token: string) => AuthAction
    clearAuthUser: () => AuthAction
}

interface Props extends DispatchProps {
    auth?: AuthState
}

const AuthProvider: React.FC<Props> = (props) => {
    const [auth, setAuth] = useState({ loading: true, email: "", token: "" })
    const [modal, setModal] = useState({
        open: false,
        title: props.auth?.modal.title || "",
        message: props.auth?.modal.message,
    })
    const [unauthorized, setUnauthorized] = useState(true)

    const setGeneralError = (title: string, message: string) => {
        setModal({
            open: true,
            title,
            message,
        })
        setUnauthorized(false)
    }

    const handleModalClose = async () => {
        setModal({
            ...modal,
            open: false,
        })

        if (unauthorized) {
            await AuthService.signOut()
            props.clearAuthUser()
            window.location.reload()
        }
    }

    const setAuthData = (loading: boolean, email: string, token: string) => {
        setAuth({ loading, email, token })
    }

    const { setAuthUser } = props
    useEffect(() => {
        const authData = JSON.parse(
            window.localStorage.getItem("authData") || "{}"
        ) as AuthData
        setAuthUser(authData.email, authData.token)
    }, [setAuthUser])

    useEffect(() => {
        async function getToken() {
            if (props.auth?.user?.token) {
                const user = await AuthService.validateAuth(
                    props.auth?.user?.token
                )
                if (user.error) {
                    setModal({
                        open: true,
                        message: user.message,
                        title: user.title,
                    })
                }
            }
            setAuth({
                loading: props?.auth?.loading || false,
                email: props.auth?.user?.email || "",
                token: props.auth?.user?.token || "",
            })
        }
        getToken()
    }, [props.auth?.user])

    return (
        <AuthContext.Provider value={{ auth, setAuthData, setGeneralError }}>
            <div className="container">
                {props.children}
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={modal.open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {modal.title}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {modal.message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleModalClose} color="primary">
                            Okay
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </AuthContext.Provider>
    )
}

const mapStateToProps = (state: RootState) => ({
    auth: state.auth,
})

const mapDispatchToProps = {
    setAuthUser,
    clearAuthUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider)
