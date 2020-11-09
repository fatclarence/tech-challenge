import { Route, Switch, withRouter } from 'react-router-dom';
import { ROUTES } from './Routes';
import { Albums, Login } from '../pages/pages';
import ProtectedRoute from './ProtectedRoute';
import Photos from '../pages/Photos';

const AppRouter = () => {
    return (
       <>
        <Switch>
            <Route path={ROUTES.LOGIN} exact component={Login} />
            <ProtectedRoute path={ROUTES.ALBUMS} exact component={Albums} />
            <ProtectedRoute path={ROUTES.ALBUMS + '/:albumId' + ROUTES.PHOTOS} exact component={Photos} />
        </Switch>
       </>
    )
}

export default withRouter(AppRouter);