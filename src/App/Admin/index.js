import React from 'react';
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Network from '../Components/Network';

class Admin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        const { user } = this.props;

        if (!user) {
            return  <Redirect to="/"/>;
        }

        return (
            <div>
                <Header/>
                <section className="admin">
                    <h1>Admin</h1>
                </section>
                <Network/>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        actions: {
            account: state.account.actions,
        },
        account: state.account.data,
        company: state.company.data,
        user: state.user.data,
    }
};

export default connect(mapStateToProps, null)(Admin);
