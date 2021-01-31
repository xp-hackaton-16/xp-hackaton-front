import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={Dashboard} />
        </Switch>
    </BrowserRouter>
);

export default Router;