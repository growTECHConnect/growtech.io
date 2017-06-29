import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import actions from '../actions';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: false,
            redirect: false,
        }
    }

    componentWillMount() {
        actions.user.signOut();
    }

    componentWillReceiveProps(nextProps) {
        const { error, user } = nextProps;

        if (error && error !== this.props.error) {
            if (error.code && error.code === 'auth/invalid-email') {
                this.setState({ errors: { email: error.message }});
            }
            if (error.code && error.code === 'auth/user-disabled') {
                this.setState({ errors: { email: error.message }});
            }
            if (error.code && error.code === 'auth/user-not-found') {
                this.setState({ errors: { email: error.message }});
            }
            if (error.code && error.code === 'auth/wrong-password') {
                this.setState({ errors: { password: error.message }});
            }
        }
    }

    setEmail = (event) => {
        this.setState({ email: event.target.value, errors: false });
    };

    setPassword = (event) => {
        this.setState({ password: event.target.value, errors: false });
    };

    signIn = (event) => {
        event.preventDefault();

        actions.user.signIn(this.state).then(() => {
            this.setState({ redirect: true })
        });
    };

    render() {
        const { errors, redirect } = this.state;
        const emailGroupClass = `network_fields form-group ${errors.email ? 'has-error' : ''}`;
        const passwordGroupClass = `network_fields form-group ${errors.password ? 'has-error' : ''}`;

        if (redirect) {
            return  <Redirect to="/my-account"/>;
        }

        return (
            <section className="full_page_wrap">
                <div className="full_page_left">
                    <div className="full_page_logo">
                        <Link to="/"><img src="/images/logo.png" className="img-responsive"/></Link>
                    </div>
                    <h1>Let’s GROW Chico</h1>
                    <h2>make a life, not just a living</h2>
                    <div className="full_page_register_left">
                        <h5>Don't have an account?</h5>
                        <Link to="/sign-up">Register</Link>
                    </div>
                    <Link to="/" className="back_to_site"><img src="/images/back_to_site.png"/>Back to main site</Link>
                </div>
                <div className="full_page_right">
                    <div className="full_right_inner">
                        <h3>Don’t have an account? <Link to="/sign-up">Create one now</Link></h3>
                        <div className="our_network">
                            <div className="network_form">
                                <h4>SIGN INTO GROW CHICO</h4>
                                <form noValidate onSubmit={this.signIn}>
                                    <div className={emailGroupClass}>
                                        <label className="control-label" htmlFor="email">Email Address</label>
                                        <input id="email" className="form-control" type="email" value={this.state.email} onChange={this.setEmail}/>
                                        <span className="help-block">{errors.email}</span>
                                    </div>
                                    <div className={passwordGroupClass}>
                                        <label className="control-label" htmlFor="password">Password</label>
                                        <input id="password" className="form-control" type="password" value={this.state.password} onChange={this.setPassword}/>
                                        <span className="help-block">{errors.password}</span>
                                    </div>
                                    <div className="network_fields">
                                        <button className="network_submit_btn">
                                            Sign In
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.error,
        user: state.user,
    }
};

export default connect(mapStateToProps, null)(SignIn);