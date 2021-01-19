import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from './contexts/AuthProvider'

const PrivateRoute = ({ component: Component, ...rest }: any) => {
    const { auth }: any = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={(routeProps) => (
                auth.token ? <Component {...routeProps} /> : <Redirect to="/login" />
            )}
        />

    );
};

export default PrivateRoute;