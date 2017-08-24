import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import configStore from '../store';
import Home from './Home/index';
import Directory from './Directory';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Account from './Account';

const { reactions, store } = configStore();

const App = ({reactions, store}) => {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Route exact path="/" component={Home}/>
                    <Route path="/directory" component={Directory}/>
                    <Route path="/sign-in" component={(props) => <SignIn {...props} reactions={reactions}/>}/>
                    <Route path="/sign-up" component={(props) => <SignUp {...props} reactions={reactions}/>}/>
                    <Route path="/account" component={(props) => <Account {...props} reactions={reactions}/>}/>
                </div>
            </Router>
        </Provider>
    );
};

reactions.init().then(() => {
    ReactDOM.render(
        <App reactions={reactions} store={store}/>,
        document.getElementById("root")
    );
});