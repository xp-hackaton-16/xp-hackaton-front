import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Incident from '../pages/Incident';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/incident/:id" component={Incident} />
        </Switch>
    </BrowserRouter>
);

export default Router;