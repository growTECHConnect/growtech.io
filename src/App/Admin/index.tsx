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
                                <NavLink exact to="/admin">
                                    Accounts
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/configuration">Configuration</NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/page-content">Page Content</NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/news-items">News Items</NavLink>
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

export default connect(
    mapStateToProps,
    null
)(Admin);
