import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import Recaptcha from 'react-recaptcha';
import actions from '../actions';

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            confirm: '',
            errors: false,
            redirect: false,
            disabled: true,
        }
    }

    componentWillMount() {
        actions.user.signOut();
    }

    componentWillReceiveProps(nextProps) {
        const { error, user } = nextProps;

        if (error && error !== this.props.error) {
            if (error.code && error.code === 'auth/email-already-in-use') {
                this.setState({ errors: { email: error.message }});
            }
            if (error.code && error.code === 'auth/invalid-email') {
                this.setState({ errors: { email: error.message }});
            }
            if (error.code && error.code === 'auth/operation-not-allowed') {
                this.setState({ errors: { global: error.message }});
            }
            if (error.code && error.code === 'auth/weak-password') {
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

    setConfirm = (event) => {
        const { value } = event.target;
        let errors = false;

        if (value !== this.state.password) {
            errors = { confirm: 'Passwords must match.' };
        }

        this.setState({ confirm: value, errors });
    };

    signUp = (event) => {
        event.preventDefault();

        if (this.state.confirm !== this.state.password) {
            this.setState({ errors: { confirm: 'Passwords must match.' }});
            return;
        }

        actions.user.signUp(this.state).then(() => this.setState({ redirect: true }));
    };

    onVerify = () => {
        this.setState({ disabled: false });
    };

    render() {
        const { disabled, errors, redirect } = this.state;
        const emailGroupClass = `network_fields form-group ${errors.email ? 'has-error' : ''}`;
        const passwordGroupClass = `network_fields form-group ${errors.password ? 'has-error' : ''}`;
        const confirmGroupClass = `network_fields form-group ${errors.confirm ? 'has-error' : ''}`;

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
                    <Link to="/" className="back_to_site"><img src="/images/back_to_site.png"/>Back to main site</Link>
                </div>
                <div className="full_page_right">
                    <div className="full_right_inner">
                        <h3>Already have an account? <Link to="/sign-in">Sign In</Link></h3>
                        <div className="our_network">
                            <div className="network_form">
                                <h4>JOIN OUR NETWORK</h4>
                                <form noValidate onSubmit={this.signUp}>
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
                                    <div className={confirmGroupClass}>
                                        <label className="control-label" htmlFor="confirm">Password Again</label>
                                        <input id="confirm" className="form-control" type="password" value={this.state.confirm} onChange={this.setConfirm}/>
                                        <span className="help-block">{errors.confirm}</span>
                                    </div>
                                    <Recaptcha
                                        sitekey="6LeSlCYUAAAAAOvleAOIrHGXNDgcWsKezRIU-5vJ"
                                        verifyCallback={this.onVerify}
                                    />
                                    <div className="clearfix"></div>
                                    <div className="network_fields">
                                        <button className="network_submit_btn submit_disabled" disabled={disabled}>
                                            Sign Up
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

export default connect(mapStateToProps, null)(SignUp);
