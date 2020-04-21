import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import App from './pages/App';
import HomePage from './pages/Home';
import RandomPage from './pages/Random';
import TournamentPage from './pages/Tournament';
import ConfirmPage from './pages/Confirm';

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/home" component={HomePage} />
            <Route path="/random" component={RandomPage} />
            <Route path="/tournament" component={TournamentPage} />
            <Route path="/confirm" component={ConfirmPage} />
        </Switch>
    </Router>,
    document.getElementById('root'));
