import { Route, Switch, withRouter } from 'react-router-dom';
import { ROUTES } from './Routes';
import { Albums, Login } from '../pages/pages';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
    return (
       <>
        <Switch>
            <Route path={ROUTES.LOGIN} exact component={Login}></Route>
            <ProtectedRoute path={ROUTES.ALBUMS} exact component={Albums}></ProtectedRoute>
        </Switch>
       </>
    )
}

export default withRouter(AppRouter);