import React from 'react';
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import queryString from 'query-string';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Network from '../Components/Network';

class ContactUs extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            thanks: false,
            redirect: false,
        };
    }

    componentDidMount() {
        const parsed = queryString.parse(location.search);

        if (parsed.thanks) {
            this.setState({thanks: true}, () => {
                setTimeout(() => this.setState({redirect: true, thanks: false}), 5000);
            })
        }
    }

    renderContent = () => {
        const {adminEmail} = this.props;
        const {thanks} = this.state;
        const style = {height: '250px'};
        const action = `http://formspree.io/${adminEmail}`;

        if (thanks) {
            return (
                <div style={style}>
                    <h2>Thanks for your request, we'll be in contact shortly.</h2>
                </div>
            );
        }

        return (
            <form noValidate={true} method="post" action={action}>
                <h2>Contact Us</h2>
                <div className="form-group">
                    <label htmlFor="email">Your Email</label>
                    <input className="form-control" id="email" type="email" name="email"/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Your Message</label>
                    <textarea className="form-control" name="message"></textarea>
                </div>
                <button className="btn btn-default" type="submit">Send</button>
                <input type="hidden" name="_next" value="/contact-us?thanks=true" />
            </form>
        );
    };

    render() {
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to="/"/>;
        }

        return (
            <div>
                <Header/>
                <section className="container base_page">
                    <div className="row">
                        <div className="col-sm-8 col-sm-offset-2">
                            {this.renderContent()}
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
        page: state.pages.data.partnership || {},
        adminEmail: state.config.data.site.adminEmail || '',
    }
};

export default connect(mapStateToProps, null)(ContactUs);
