import React from 'react';
import PropTypes from 'prop-types'
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import Recaptcha from 'react-recaptcha';

class SignUp extends React.Component {
    static propTypes = {
        reactions: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            companyName: '',
            email: '',
            password: '',
            confirm: '',
            errors: false,
            redirect: false,
            disabled: true,
        }
    }

    componentWillMount() {
        const {user} = this.props.actions;
        user.signOut();
    }

    componentWillReceiveProps(nextProps) {
        const {access, actions, error} = nextProps;

        if (error && error !== this.props.error) {
            if (error.code && error.code === 'auth/email-already-in-use') {
                this.setState({errors: {email: error.message}});
            }
            if (error.code && error.code === 'auth/invalid-email') {
                this.setState({errors: {email: error.message}});
            }
            if (error.code && error.code === 'auth/operation-not-allowed') {
                this.setState({errors: {global: error.message}});
            }
            if (error.code && error.code === 'auth/weak-password') {
                this.setState({errors: {password: error.message}});
            }
        }

        if (access !== this.props.access && access && access.company) {
            actions.company.update({name: this.state.companyName})
                .then(() => this.setState({redirect: true}));
        }
    }

    setField = (event) => {
        const {id, value} = event.target;
        this.setState({[id]: value, errors: false});
    };

    signUp = (event) => {
        event.preventDefault();
        const {user} = this.props.actions;
        const {confirm, email, password} = this.state;

        if (confirm !== password) {
            this.setState({errors: {confirm: 'Passwords must match.'}});
            return;
        }

        user.signUp({email, password});
    };

    onVerify = () => {
        this.setState({disabled: false});
    };

    getGroupClass = (field) => {
        const {errors} = this.state;

        return errors[field] ? 'network_fields form-group has-error' : 'network_fields form-group';
    };

    render() {
        const {disabled, errors, redirect, waitForAccess} = this.state;

        if (redirect && !waitForAccess) {
            return <Redirect to="/account"/>;
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
                                    <div className={this.getGroupClass('companyName')}>
                                        <label className="control-label" htmlFor="email">Company Name</label>
                                        <input id="companyName" className="form-control" type="text"
                                               value={this.state.companyName} onChange={this.setField}/>
                                        <span className="help-block">{errors.companyName}</span>
                                    </div>
                                    <div className={this.getGroupClass('email')}>
                                        <label className="control-label" htmlFor="email">Email Address</label>
                                        <input id="email" className="form-control" type="email" value={this.state.email}
                                               onChange={this.setField}/>
                                        <span className="help-block">{errors.email}</span>
                                    </div>
                                    <div className={this.getGroupClass('password')}>
                                        <label className="control-label" htmlFor="password">Password</label>
                                        <input id="password" className="form-control" type="password"
                                               value={this.state.password} onChange={this.setField}/>
                                        <span className="help-block">{errors.password}</span>
                                    </div>
                                    <div className={this.getGroupClass('confirm')}>
                                        <label className="control-label" htmlFor="confirm">Password Again</label>
                                        <input id="confirm" className="form-control" type="password"
                                               value={this.state.confirm} onChange={this.setField}/>
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
        access: state.access.data,
        actions: {
            company: state.company.actions,
            user: state.user.actions,
        },
        error: {
            ...state.user.error
        },
    }
};

export default connect(mapStateToProps, null)(SignUp);