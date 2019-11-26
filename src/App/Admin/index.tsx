import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './styles.css';
import Header from '../Components/Header';

interface IProps {
    children: any;
}

class Admin extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);

        this.state = {};
    }

    render() {
        const { children } = this.props;

        return (
            <div className="admin base">
                <Header />
                <div className="page">
                    <nav className="sidebar">
                        <ul>
                            <li>
                                <NavLink exact to="/admin/requests">
                                    Requests
                                </NavLink>
                            </li>
                            <li>
                                <NavLink exact to="/admin/accounts">
                                    Accounts
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/configuration">Configuration</NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/global-content">Global Content</NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/news">News</NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div className="content">{children}</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        access: state.access.data,
        user: state.user.data,
    };
};

export default connect(mapStateToProps, null)(Admin);
