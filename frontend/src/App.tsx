import React, { useEffect, useState } from "react"
import "./App.scss"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Login from "./pages/auth/Login"
import PrivateRoute from "./Routes"
import OrderDetails from "./pages/orders/OrderDetails"
import OrderList from "./pages/orders/OrderList"

function App() {
    const [token, setToken] = useState("")

    useEffect(() => {
        async function getToken() {
            //   setToken(await AuthService || "")
        }
        getToken()
    }, [])
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <PrivateRoute path="/" component={OrderList} />
                <PrivateRoute path="/details" component={OrderDetails} />
            </Switch>
        </BrowserRouter>
    )
}

export default App
