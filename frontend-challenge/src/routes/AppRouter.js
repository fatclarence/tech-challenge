import { Route, Switch } from 'react-router-dom';
import { ROUTES } from './Routes';
import { Albums, Login } from '../pages/pages'

const AppRouter = () => {
    return (
       <>
        <Switch>
            <Route path={ROUTES.LOGIN} exact component={Login}></Route>
            <Route path={ROUTES.ALBUMS} exact component={Albums}></Route>
        </Switch>
       </>
    )
}

export default AppRouter;