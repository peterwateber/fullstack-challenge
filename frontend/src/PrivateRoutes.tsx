import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import { AuthContext } from "./contexts/AuthProvider"

const PrivateRoute = ({ component: Component, ...rest }: any) => {
    const { auth }: any = useContext(AuthContext)
    return auth.loading ? null : (
        <Route
            {...rest}
            render={(routeProps) =>
                Boolean(auth.token) ? (
                    <Component {...routeProps} />
                ) : (
                    <Redirect push to="/login" />
                )
            }
        />
    )
}

export default PrivateRoute
