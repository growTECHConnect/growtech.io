import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

interface IProps {
    actions: any;
    error: any;
    page: any;
    user: any;
}

interface IState {
    [index: string]: any;
    email: string;
    password: string;
    errors: any;
    redirect: boolean;
    resetSent: boolean;
}

class SignIn extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: false,
            redirect: false,
            resetSent: false,
        };
    }

    componentWillMount() {
        const { signOut } = this.props.actions.user;
        signOut();
    }

    componentWillReceiveProps(nextProps: IProps) {
        const { error } = nextProps;

        if (error && error !== this.props.error) {
            if (error.code && error.code === 'auth/invalid-email') {
                this.setState({ errors: { email: error.message } });
            }
            if (error.code && error.code === 'auth/user-disabled') {
                this.setState({ errors: { email: error.message } });
            }
            if (error.code && error.code === 'auth/user-not-found') {
                this.setState({ errors: { password: 'Invalid email or password' } });
            }
            if (error.code && error.code === 'auth/wrong-password') {
                this.setState({ errors: { password: error.message } });
            }
        }
    }

    forgotPassword = (event: any) => {
        event.preventDefault();
        const { passwordReset } = this.props.actions.user;
        const { email } = this.state;

        passwordReset(email)
            .then(() => {
                this.setState({ resetSent: true }, () => {
                    setTimeout(() => {
                        this.setState({ resetSent: false });
                    }, 3000);
                });
            })
            .catch(null);
    };

    setField = (event: any) => {
        const { id, value } = event.target;
        this.setState({ [id]: value, errors: false });
    };

    signIn = (event: any) => {
        event.preventDefault();
        const { signIn } = this.props.actions.user;

        signIn(this.state).then(() => {
            this.setState({ redirect: true });
        });
    };

    getGroupClass = (field: any) => {
        const { errors } = this.state;

        return errors[field] ? 'network_fields form-group has-error' : 'network_fields form-group';
    };

    renderForgotPassword = () => {
        const { resetSent } = this.state;

        if (resetSent) {
            return <label className="pull-left">Reset Email Sent</label>;
        }

        return (
            <label className="pull-left">
                <a href="forgot-password.html" onClick={this.forgotPassword}>
                    Forgot Password?
                </a>
            </label>
        );
    };

    render() {
        const { page } = this.props;
        const { errors, redirect } = this.state;

        if (redirect) {
            return <Redirect to="/account" />;
        }

        return (
            <section className="full_page_wrap">
                <div className="full_page_left">
                    <div className="full_page_logo">
                        <Link to="/">
                            <img src="/images/logo.png" className="img-responsive" alt="" />
                        </Link>
                    </div>
                    <h1>{page.tagText}</h1>
                    <h2>{page.tagSubText}</h2>
                    <div className="full_page_register_left">
                        <h5>Don't have an account?</h5>
                        <Link to="/sign-up">Register</Link>
                    </div>
                    <Link to="/" className="back_to_site">
                        <img src="/images/back_to_site.png" alt="" />
                        Back to main site
                    </Link>
                </div>
                <div className="full_page_right">
                    <div className="full_right_inner">
                        <h3>
                            Don’t have an account? <Link to="/sign-up">Create one now</Link>
                        </h3>
                        <div className="our_network">
                            <div className="network_form">
                                <h4>SIGN INTO GROW CHICO</h4>
                                <form noValidate onSubmit={this.signIn}>
                                    <div className={this.getGroupClass('email')}>
                                        <label className="control-label" htmlFor="email">
                                            Email Address
                                        </label>
                                        <input
                                            id="email"
                                            className="form-control"
                                            type="email"
                                            value={this.state.email}
                                            onChange={this.setField}
                                        />
                                        <span className="help-block">{errors.email}</span>
                                    </div>
                                    <div className={this.getGroupClass('password')}>
                                        <label className="control-label" htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            className="form-control"
                                            type="password"
                                            value={this.state.password}
                                            onChange={this.setField}
                                        />
                                        <span className="help-block">{errors.password}</span>
                                    </div>
                                    <div className="network_fields">
                                        <button className="network_submit_btn">Sign In</button>
                                        {this.renderForgotPassword()}
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

const mapStateToProps = (state: any) => {
    return {
        actions: {
            user: state.user.actions,
        },
        error: {
            ...state.user.error,
        },
        page: state.pages.data.signin || {},
    };
};

export default connect(
    mapStateToProps,
    null
)(SignIn);
