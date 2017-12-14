import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import configStore from '../store';
import Home from './Home/index';
import Directory from './Directory';
import Company from './Company';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Account from './Account';
import NoMatch from './NoMatch';
import About from './About';
import Partnership from './Partnership';

const { reactions, store } = configStore();

const App = ({reactions, store}) => {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/directory" component={Directory}/>
                        <Route path="/company/:key" component={Company}/>
                        <Route path="/partnership" component={Partnership}/>
                        <Route path="/about" component={About}/>
                        <Route path="/sign-in" component={(props) => <SignIn {...props} reactions={reactions}/>}/>
                        <Route path="/sign-up" component={(props) => <SignUp {...props} reactions={reactions}/>}/>
                        <Route path="/account" component={(props) => <Account {...props} reactions={reactions}/>}/>
                        <Route component={NoMatch}/>
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
};

document.addEventListener('DOMContentLoaded', function () {
    try {
        let app = firebase.app();

        reactions.init().then(() => {
            ReactDOM.render(
                <App reactions={reactions} store={store}/>,
                document.getElementById("root")
            );
        });
    } catch (e) {
        console.error(e);
    }
});
