import React from 'react';
import PropTypes from 'prop-types'
import {
    NavLink,
    Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux'
import './styles.css';
import Header from '../Components/Header';

class Admin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const {children} = this.props;

        return (
            <div className="admin base">
                <Header/>
                <div className="page">
                    <nav className="sidebar">
                        <ul>
                            <li>
                                <NavLink exact to="/admin">Accounts</NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/configuration">Configuration</NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/global-content">Global Content</NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/page-content">Page Content</NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div className="content">
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        access: state.access.data,
        user: state.user.data,
    }
};

export default connect(mapStateToProps, null)(Admin);
