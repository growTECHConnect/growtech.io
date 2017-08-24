import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Network from '../Components/Network';
import Featured from '../Components/Featured';
import Hiring from '../Components/Hiring';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hoursFilter: 'all',
            dropdown: {
                hours: null,
            },
        };
    }

    selectHours = (event) => {
        this.setState({
            hoursFilter: event.target.value,
        });
    };

    renderFeatured() {
        const { companies, site } = this.props;
        const featuredCompanies = site.featuredCompanies || [];

        return featuredCompanies.map((key, index) => {
            if (companies[key]) {
                return <Featured company={companies[key]} key={index}/>;
            }
        });
    }

    renderHiring() {
        const { companies } = this.props;
        const { hoursFilter } = this.state;

        return Object.keys(companies || {}).map((key, index) => {
            if (companies[key].hiring) {
                if (companies[key].hours === hoursFilter || hoursFilter === 'all') {
                    return <Hiring company={companies[key]} key={index}/>;
                }
            }
        });
    }

    render() {
        const { user, site } = this.props;
        const companies = Object.keys(this.props.companies || {}).map((key) => key);

        return (
            <div>
                <Header isHome={true}/>
                <section className="mainframe">
                    <div className="mainframe_img"><img src="/images/banner.jpg"/></div>
                    <div className="container custom_container">
                        <div className="row">
                            <div className="col-md-8 col-sm-7">
                                <h1>LET’S growTECH</h1>
                                <h2>Careers, Culture & Community</h2>
                                <h3>{companies.length} members and growing fast</h3>
                            </div>
                            <div className="col-md-4 col-sm-5 register_box">
                                <div className="register_wrap">
                                    <Link to="/sign-up" className="register_btn">Register</Link> or <Link to="/sign-in" className="sign_in_btn">Sign In</Link>
                                    <p>
                                        List your company today!<br/>
                                        Start by creating an account.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="about_section">
                    <div className="container custom_container">
                        <div className="row">
                            <div className="col-sm-12">
                                <p>{site.aboutText}</p>
                                <Link to="/sign-up">Learn More</Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="featured_companies">
                    <div className="container custom_container">
                        <div className="row">
                            <div className="col-sm-12 featured_top">
                                <h2>FEATURED COMPANIES</h2>
                                <p>{site.featuredText} <Link to="#">Get featured.</Link></p>
                            </div>
                        </div>
                        <div className="row">
                            {this.renderFeatured()}
                        </div>
                        <div className="row">
                            <div className="col-sm-12 featured_top featured_bottom">
                                <p>Don't see what you're looking for? <Link to="/companies">Browse our directory.</Link></p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="hiring">
                    <div className="container custom_container">
                        <div className="row">
                            <div className="col-sm-12 featured_top">
                                <h2>
                                    Now Hiring
                                    <div className="company_select">
                                        <select value={this.state.hoursFilter} onChange={this.selectHours}>
                                            <option value="all">All Companies</option>
                                            <option value="full">Full Time</option>
                                            <option value="part">Part Time</option>
                                        </select>
                                    </div>
                                </h2>
                            </div>
                        </div>
                        <div className="row">
                            {this.renderHiring()}
                        </div>
                        <div className="row">
                            <div className="col-sm-12 featured_top featured_bottom">
                                <p>Don't see what you're looking for? <Link to="#">See more opportunities.</Link></p>
                            </div>
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
        user: state.user.data,
        companies: state.companies.data,
        site: state.config.data.site,
    }
};

export default connect(mapStateToProps, null)(Home);