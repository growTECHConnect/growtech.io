import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

interface IProps {
    access?: any;
    actions?: any;
    user?: any;
    withSpace?: boolean;
}

interface IState {
    buttonOpen: boolean;
}

class Header extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            buttonOpen: false,
        };
    }

    signOut = () => {
        const { user } = this.props.actions;
        user.signOut();
    };

    onMenuClick = () => {
        this.setState({ buttonOpen: !this.state.buttonOpen });
    };

    renderAdminLink() {
        const { access } = this.props;

        if (access && access.role === 'admin') {
            return (
                <ul className="nav navbar-nav navbar-left">
                    <li>
                        <NavLink to="/admin">Admin</NavLink>
                    </li>
                </ul>
            );
        }
    }

    renderLinks() {
        const { user } = this.props;
        const menuClass = `navbar-collapse full_page_menu collapse ${this.state.buttonOpen ? 'in' : ''}`;

        if (user) {
            return (
                <div id="navbar" className={menuClass}>
                    {this.renderAdminLink()}
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <NavLink exact to="/">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/directory">Directory</NavLink>
                        </li>
                        <li>
                            <NavLink to="/news">News</NavLink>
                        </li>
                        <li>
                            <NavLink to="/community">Community</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about">About</NavLink>
                        </li>
                        <li>
                            <a href="/" onClick={this.signOut}>
                                Sign Out
                            </a>
                        </li>
                        <li className="register">
                            <NavLink to="/account">Account</NavLink>
                        </li>
                    </ul>
                </div>
            );
        }

        return (
            <div id="navbar" className={menuClass}>
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <NavLink exact to="/">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/directory">Directory</NavLink>
                    </li>
                    <li>
                        <NavLink to="/news">News</NavLink>
                    </li>
                    <li>
                        <NavLink to="/community">Community</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about">About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/sign-in">Sign In</NavLink>
                    </li>
                    <li className="register">
                        <NavLink to="/sign-up">Register</NavLink>
                    </li>
                </ul>
            </div>
        );
    }

    render() {
        const { withSpace } = this.props;
        const headerClass = withSpace ? '' : 'inner_header';
        const buttonClass = `navbar-toggle nav-icon ${this.state.buttonOpen ? 'open' : ''}`;

        return (
            <header className={headerClass}>
                <div className="container custom_container">
                    <div className="row">
                        <div className="col-sm-1 col-xs-12">
                            <div className="logo">
                                <Link to="/">
                                    <img src="/images/logo.png" className="img-responsive" alt="" />
                                </Link>
                            </div>
                        </div>
                        <div className="col-sm-11 col-xs-12 main_menu">
                            <div className="navbar-header">
                                <button
                                    type="button"
                                    className={buttonClass}
                                    data-toggle="collapse"
                                    data-target="#navbar"
                                    aria-expanded="false"
                                    aria-controls="navbar"
                                    onClick={this.onMenuClick}
                                >
                                    <span />
                                    <span />
                                    <span />
                                </button>
                            </div>
                            {this.renderLinks()}
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        actions: {
            user: state.user.actions,
        },
        user: state.user.data,
        access: state.access.data,
    };
};

export default connect(
    mapStateToProps,
    null
)(Header);
