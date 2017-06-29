import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import actions from './actions';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    signOut = () => {
        actions.user.signOut();
    };

    renderLinks() {
        const { user } = this.props;

        if (user) {
            return (
                <div id="navbar" className="navbar-collapse collapse full_page_menu">
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/directory">Directory</Link></li>
                        <li><Link to="/partnership">THE Partnership</Link></li>
                        <li><Link to="/news">News</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><a onClick={this.signOut}>Sign Out</a></li>
                        <li className="register"><Link to="/my-account">Account</Link></li>
                    </ul>
                </div>
            );
        }

        return (
            <div id="navbar" className="navbar-collapse collapse full_page_menu">
                <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/directory">Directory</Link></li>
                    <li><Link to="/partnership">THE Partnership</Link></li>
                    <li><Link to="/news">News</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/sign-in">Sign In</Link></li>
                    <li className="register"><Link to="/sign-up">Register</Link></li>
                </ul>
            </div>
        );
    }

    render() {
        const { isHome } = this.props;
        const headerClass = isHome ? '' : 'inner_header';

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
                                <button type="button" className="navbar-toggle collapsed nav-icon" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
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

Header.propTypes = {
    isHome: PropTypes.bool,
    user: PropTypes.object,
};

Header.defaultProps = {
    isHome: false,
};

export default Header;

