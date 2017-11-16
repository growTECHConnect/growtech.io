import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Network from '../Components/Network';
import AccountForm from './AccountForm';
import CompanyForm from './CompanyForm';
import MediaForm from './MediaForm';
import SocialForm from './SocialForm';
import NewsForm from './NewsForm';
import ListingForm from './ListingForm';
import EventsForm from './EventsForm';
import ConfigForm from './ConfigForm';

class Account extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { company, user } = this.props;

        if (!user) {
            return  <Redirect to="/"/>;
        }

        if (!company) {
            return <div/>;
        }

        return (
            <div>
                <Header/>
                <section className="my_company">
                    <div className="container-fluid my_company_container">
                        <AccountForm/>
                        <CompanyForm/>
                        <MediaForm/>
                        <SocialForm/>
                        <NewsForm/>
                        <EventsForm/>
                        <ListingForm/>
                        <ConfigForm/>
                    </div>
                </section>
                <Network/>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        company: state.company,
        user: state.user.data,
    }
};

export default connect(mapStateToProps, null)(Account);
