import { AuthContext } from "contexts/AuthProvider"
import React, { useContext } from "react"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import "./App.scss"
import Login from "./pages/auth/Login"
import OrderDetails from "./pages/orders/OrderDetails"
import OrderList from "./pages/orders/OrderList"
import PrivateRoute from "./PrivateRoutes"

const App: React.FC = () => {
    const { auth }: any = useContext(AuthContext)
    return (
        <BrowserRouter>
            <Switch>
                <PrivateRoute exact path="/" component={OrderList} />
                {!auth.loading && !Boolean(auth.token) && (
                    <Route path="/login" component={Login} />
                )}
                <PrivateRoute path="/order/:id" component={OrderDetails} />
                <Route>
                    <Redirect to="/" />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default App
