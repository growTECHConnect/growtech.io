import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Home from './Home/index';
import Directory from './Directory';
import Company from './Company';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Account from './Account';
import NoMatch from './NoMatch';
import About from './About';
import Partnership from './Partnership';
import ContactUs from './ContactUs';
import News from './News';
import Community from './Community';
import Admin from './Admin';
import Configuration from './Admin/Configuration';
import Accounts from './Admin/Accounts';
import GlobalContent from './Admin/GlobalContent';
import NewsData from './Admin/NewsData';
import PageContent from './Admin/PageContent';
import Requests from './Admin/Requests';
import configStore from '../store';
import theme from './theme';

interface IState {
    initted: boolean;
}

export default class App extends React.Component<any, IState> {
    reactions: any;
    store: any;

    constructor(props: any) {
        super(props);

        const { reactions, store } = configStore();

        this.reactions = reactions;
        this.store = store;

        this.state = {
            initted: false,
        };
    }

    public componentDidMount() {
        this.reactions
            .init()
            .then(() => {
                this.setState({ initted: true });
            })
            .catch((error: any) => {
                console.error(error);

                this.setState({ initted: true });
            });
    }

    public render() {
        const { initted } = this.state;

        if (!initted) {
            return null;
        }

        return (
            <MuiThemeProvider theme={theme}>
                <Provider store={this.store}>
                    <Router>
                        <div>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route path="/directory" component={Directory} />
                                <Route path="/company/:key" component={Company} />
                                <Route path="/partnership" component={Partnership} />
                                <Route path="/about" component={About} />
                                <Route path="/news/:index" component={News} />
                                <Route path="/news" component={News} />
                                <Route path="/sign-in" component={(props: any) => <SignIn {...props} reactions={this.reactions} />} />
                                <Route path="/sign-up" component={(props: any) => <SignUp {...props} reactions={this.reactions} />} />
                                <Route path="/account" component={(props: any) => <Account {...props} reactions={this.reactions} />} />
                                <Route path="/contact-us" component={ContactUs} />
                                <Route path="/community" component={Community} />
                                <Route
                                    path="/admin"
                                    render={() => {
                                        const access: any = this.store.getState().access.data;

                                        if (access && access.role === 'admin') {
                                            return (
                                                <Admin>
                                                    <Route exact path="/admin/requests" component={Requests} />
                                                    <Route exact path="/admin/accounts" component={Accounts} />
                                                    <Route path="/admin/configuration" component={Configuration} />
                                                    <Route path="/admin/global-content" component={GlobalContent} />
                                                    <Route path="/admin/news" component={NewsData} />
                                                    <Route path="/admin/page-content" component={PageContent} />
                                                    <Redirect to="/admin/requests" />
                                                </Admin>
                                            );
                                        }

                                        return <Route component={NoMatch} />;
                                    }}
                                />
                                <Route component={NoMatch} />
                            </Switch>
                        </div>
                    </Router>
                </Provider>
            </MuiThemeProvider>
        );
    }
}
