import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
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
import StatusForm from './StatusForm';

interface IProps {
    actions: any;
    company: any;
    status: any;
    user: any;
}

interface IState {
    scrollOffsetStyle: any;
    redirectCompany: boolean;
}

class Account extends React.Component<IProps, IState> {
    accountForm: any;
    companyForm: any;
    socialForm: any;
    listingForm: any;
    configForm: any;
    statusForm: any;

    constructor(props: IProps) {
        super(props);

        this.state = {
            scrollOffsetStyle: null,
            redirectCompany: false,
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    onScroll = (event: any) => {
        if (window.pageYOffset > 138) {
            if (!this.state.scrollOffsetStyle) {
                this.setState({ scrollOffsetStyle: { position: 'fixed', top: 0 } });
            }
        } else {
            if (this.state.scrollOffsetStyle) {
                this.setState({ scrollOffsetStyle: null });
            }
        }
    };

    saveNow = () => {
        const { actions } = this.props;
        const account = this.accountForm.getFormData();
        const company = {
            ...this.companyForm.getFormData(),
            ...this.socialForm.getFormData(),
            ...this.listingForm.getFormData(),
            ...this.configForm.getFormData(),
        };

        Promise.all([actions.account.update(account), actions.company.update(company)]);
    };

    viewNow = () => {
        this.setState({ redirectCompany: true });
    };

    render() {
        const { redirectCompany } = this.state;
        const { company, status, user } = this.props;

        if (!user) {
            return <Redirect to="/" />;
        }

        if (redirectCompany) {
            return <Redirect to={`/company/${company.id}`} />;
        }

        return (
            <div>
                <Header />
                <div className="account_save" style={this.state.scrollOffsetStyle}>
                    <div className="custom_container container">
                        <span>{status}</span>
                        <button className="gt_small_button" onClick={this.saveNow}>
                            Save
                        </button>
                        <button className="gt_small_button" onClick={this.viewNow}>
                            View
                        </button>
                    </div>
                </div>
                <section className="my_company">
                    <div className="container-fluid my_company_container">
                        <AccountForm onRef={(ref: any) => (this.accountForm = ref)} />
                        <StatusForm onRef={(ref: any) => (this.statusForm = ref)} />
                        <CompanyForm onRef={(ref: any) => (this.companyForm = ref)} />
                        <MediaForm />
                        <SocialForm onRef={(ref: any) => (this.socialForm = ref)} />
                        <NewsForm />
                        <EventsForm />
                        <ListingForm onRef={(ref: any) => (this.listingForm = ref)} />
                        <ConfigForm onRef={(ref: any) => (this.configForm = ref)} />
                    </div>
                </section>
                <Network />
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        actions: {
            account: state.account.actions,
            company: state.company.actions,
        },
        company: state.company.data,
        status: state.messages.status,
        user: state.user.data,
    };
};

export default connect(
    mapStateToProps,
    null
)(Account);
