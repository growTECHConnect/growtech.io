import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import store from './store';
import Home from './Home';
import Directory from './Directory';
import SignIn from './SignIn';
import SignUp from './SignUp';
import MyAccount from './MyAccount';
import MyCompany from './MyCompany';

const App = ({ store }) => (
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/directory" component={Directory}/>
                <Route path="/sign-in" component={SignIn}/>
                <Route path="/sign-up" component={SignUp}/>
                <Route path="/my-account" component={MyAccount}/>
                <Route path="/my-company" component={MyCompany}/>
            </div>
        </Router>
    </Provider>
);

ReactDOM.render(
    <App store={store}/>,
    document.getElementById("root")
);