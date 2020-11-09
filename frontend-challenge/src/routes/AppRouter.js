import { Route, Switch, withRouter } from 'react-router-dom';
import { ROUTES } from './Routes';
import { Albums, Login, Photos, ErrorPage } from '../pages/pages';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
    return (
       <>
        <Switch>
            <Route path={ROUTES.LOGIN} exact component={Login} />
            <ProtectedRoute path={ROUTES.ALBUMS} exact component={Albums} />
            <ProtectedRoute path={ROUTES.ALBUMS + '/:albumId' + ROUTES.PHOTOS} exact component={Photos} />
            <Route path={ROUTES.NOT_FOUND} component={ErrorPage} />
        </Switch>
       </>
    )
}

export default withRouter(AppRouter);