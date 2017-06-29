import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import actions from '../actions';
import Header from '../Header';
import Footer from '../Footer';
import Network from '../Network';
import ContactForm from './ContactForm';
import MediaForm from './MediaForm';
import SocialForm from './SocialForm';
import NewsForm from './NewsForm';
import ListingForm from './ListingForm';
import EventsForm from './EventsForm';
import ConfigForm from './ConfigForm';

class MyCompany extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { initialized, user } = this.props;

        if (!user) {
            return  <Redirect to="/"/>;
        }

        if (!initialized.company || !initialized.user) {
            return <div></div>;
        }

        return (
            <div>
                <Header user={user}/>
                <section className="my_company">
                    <div className="container">
                        <div className="breadcrumb">
                            <Link to="/my-account"><span className="back_arrow">
                                <img src="/images/breadcrumb_arrow.png"/></span>
                                Back to My Account
                            </Link>
                        </div>
                    </div>
                    <div className="container-fluid my_company_container">
                        <div className="acc_form_section">
                            <h2>Company Info</h2>
                            <ContactForm/>
                        </div>
                        <div className="acc_form_section">
                            <h2>Company Media</h2>
                            <MediaForm/>
                        </div>
                        <div className="acc_form_section">
                            <h2>Company Social</h2>
                            <SocialForm/>
                        </div>
                        <div className="acc_form_section company_news_links">
                            <h2>Company News</h2>
                            <NewsForm/>
                        </div>
                        <div className="acc_form_section">
                            <h2>Company Job Listings</h2>
                            <ListingForm/>
                        </div>
                        <div className="acc_form_section cmp_event_wrap">
                            <h2>Company Event Listings</h2>
                            <EventsForm/>
                        </div>
                        <div className="acc_form_section cmp_type_inds">
                            <h2>Company Type and Industry</h2>
                            <ConfigForm/>
                        </div>
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
        error: state.error,
        initialized: state.initialized,
        user: state.user,
    }
};

export default connect(mapStateToProps, null)(MyCompany);
