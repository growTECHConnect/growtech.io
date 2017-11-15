import React from 'react';
import { Redirect, Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Header extends React.Component {
    static propTypes = {
        withSpace: PropTypes.bool,
    };

    static defaultProps = {
        withSpace: false,
    };

    constructor(props) {
        super(props);

        this.state = {
            buttonOpen: false,
        };
    }

    signOut = () => {
        const {user} = this.props.actions;
        user.signOut();
    };

    onMenuClick = () => {
        this.setState({buttonOpen: !this.state.buttonOpen});
    };

    renderLinks() {
        const { user } = this.props;
        const homeClass = document.location.pathname === '/' ? 'active' : '';
        const menuClass = `navbar-collapse full_page_menu collapse ${this.state.buttonOpen ? 'in' : ''}`;

        if (user) {
            return (
                <div id="navbar" className={menuClass}>
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="" className={homeClass}>Home</Link></li>
                        <li><NavLink to="/directory">Directory</NavLink></li>
                        <li><NavLink to="/news">News</NavLink></li>
                        <li><NavLink to="/about">About</NavLink></li>
                        <li><a href="/" onClick={this.signOut}>Sign Out</a></li>
                        <li className="register"><NavLink to="/account">Account</NavLink></li>
                    </ul>
                </div>
            );
        }

        return (
            <div id="navbar" className={menuClass}>
                <ul className="nav navbar-nav navbar-right">
                    <li><Link to="" className={homeClass}>Home</Link></li>
                    <li><NavLink to="/directory">Directory</NavLink></li>
                    <li><NavLink to="/news">News</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/sign-in">Sign In</NavLink></li>
                    <li className="register"><NavLink to="/sign-up">Register</NavLink></li>
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
                        <div className="col-sm-2 col-xs-12">
                            <div className="logo">
                                <Link to="/">
                                    <img src="/images/logo.png" className="img-responsive"/>
                                </Link>
                            </div>
                        </div>
                        <div className="col-sm-10 col-xs-12 main_menu">
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
                                    <span></span>
                                    <span></span>
                                    <span></span>
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

const mapStateToProps = (state) => {
    return {
        actions: {
            user: state.user.actions,
        },
        user: state.user.data,
    }
};

export default connect(mapStateToProps, null)(Header);

