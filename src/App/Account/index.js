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

        this.state = {
            scrollOffsetStyle: null,
            //saveNow: false,
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    onScroll = (event) => {
        if ( window.pageYOffset > 138) {
            if (!this.state.scrollOffsetStyle) {
                this.setState({ scrollOffsetStyle: { position: 'fixed', top: 0}});
            }
        } else {
            if (this.state.scrollOffsetStyle) {
                this.setState({ scrollOffsetStyle: null});
            }
        }
    };

    saveNow = () => {
        const {actions} = this.props;
        const account = this.accountForm.getFormData();
        const company = {
            ...this.companyForm.getFormData(),
            ...this.socialForm.getFormData(),
            ...this.listingForm.getFormData(),
            ...this.configForm.getFormData(),
        };

        Promise.all([actions.account.update(account), actions.company.update(company)]);
    };

    render() {
        const {status, user} = this.props;

        if (!user) {
            return  <Redirect to="/"/>;
        }

        return (
            <div>
                <Header/>
                <div className="account_save" style={this.state.scrollOffsetStyle}>
                    <div className="custom_container container">
                        <span>{status}</span>
                        <button className="gt_small_button" onClick={this.saveNow}>Save</button>
                    </div>
                </div>
                <section className="my_company">
                    <div className="container-fluid my_company_container">
                        <AccountForm onRef={(ref) => (this.accountForm = ref)}/>
                        <CompanyForm onRef={(ref) => (this.companyForm = ref)}/>
                        <MediaForm/>
                        <SocialForm onRef={(ref) => (this.socialForm = ref)}/>
                        <NewsForm/>
                        <EventsForm/>
                        <ListingForm onRef={(ref) => (this.listingForm = ref)}/>
                        <ConfigForm onRef={(ref) => (this.configForm = ref)}/>
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
        actions: {
            account: state.account.actions,
            company: state.company.actions,
        },
        company: state.company,
        status: state.messages.status,
        user: state.user.data,
    }
};

export default connect(mapStateToProps, null)(Account);
