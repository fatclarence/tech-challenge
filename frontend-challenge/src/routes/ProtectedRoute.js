import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../wrappers/UserProvider';

import { ROUTES } from './Routes';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { isAuthenticated } = useContext(UserContext);
    return (<Route {...rest} 
            render={(props) => (
            isAuthenticated ? <Component {...props} />
                            : <Redirect to={ROUTES.LOGIN} />
            )} />);
}

export default ProtectedRoute;