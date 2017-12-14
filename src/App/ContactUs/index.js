import React from 'react';
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import axios from 'axios';
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
            form: {
                email: '',
                message: '',
                subject: 'growTECH: Contact Us Request'
            },
            error: {
                email: false,
                message: false,
            },
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

    setValue = ({target}) => {
        const {id, value} = target;

        this.setState({
            form: {
                ...this.state.form,
                [id]: value,
            },
            error: {
                ...this.state.error,
                [id]: false,
            }
        });
    };

    onContactUs = (event) => {
        event.preventDefault();
        const {adminEmail} = this.props;
        const {form} = this.state;
        const url = `http://formspree.io/${adminEmail}`;

        axios.post(url, form)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({thanks: true}, () => {
                        setTimeout(() => this.setState({redirect: true, thanks: false}), 5000);
                    });
                }
            })
            .catch((error) => {
                const {response} = error;

                if (response && response.data && response.data.error) {
                    this.setState({
                        error: {
                            email: response.data.error.includes('email field'),
                            message: response.data.error.includes('message field'),
                        }
                    });
                }
            });
    };

    renderContent = () => {
        const {thanks} = this.state;
        const style = {height: '250px'};

        if (thanks) {
            return (
                <div style={style}>
                    <h2>Thanks for your request, we'll be in contact shortly.</h2>
                </div>
            );
        }

        return (
            <form noValidate={true} onSubmit={this.onContactUs}>
                <h2>Contact Us</h2>
                <div className={`form-group ${this.state.error.email ? 'has-error' : ''}`}>
                    <label htmlFor="email">Your Email</label>
                    <input className="form-control" id="email" type="email" name="email" onChange={this.setValue}/>
                </div>
                <div className={`form-group ${this.state.error.message ? 'has-error' : ''}`}>
                    <label htmlFor="message">Your Message</label>
                    <textarea className="form-control" id="message" name="message" onChange={this.setValue}></textarea>
                </div>
                <button className="btn btn-default" type="submit">Send</button>
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
