import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Network from '../Components/Network';
import Featured from '../Components/Featured';
import Tile from '../Components/Tile';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    renderFeatured() {
        const {companies, config: {site, types}} = this.props;
        const featuredCompanies = site.featuredCompanies || [];

        return featuredCompanies.map((key, index) => {
            if (companies[key]) {
                const companyType = companies[key].companyType;

                return <Featured key={index} id={key} company={companies[key]} type={types[companyType].text}/>;
            }
        });
    }

    renderHiring() {
        const {companies, config: {types}} = this.props;

        return Object.keys(companies)
            .filter((key) => {
                return companies[key].active;
            })
            .filter((key) => {
                return companies[key].fulltime || companies[key].parttime || companies[key].internship;
            })
            .sort((a, b) => {
                const nameA = companies[a].name.toLowerCase();
                const nameB = companies[b].name.toLowerCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                return 0;
            })
            .map((key, index) => {
                const companyType = companies[key].companyType;

                return <Tile key={index} id={key} company={companies[key]} type={types[companyType].text}/>;
            });
    }

    render() {
        const {companies} = this.props;
        const {page} = this.props;
        const companyCount = Object.keys(companies).filter((key) => companies[key].active).length;

        return (
            <div>
                <Header withSpace={true}/>
                <section className="mainframe">
                    <div className="mainframe_img home_img"></div>
                    <div className="container custom_container">
                        <div className="row">
                            <div className="col-md-8 col-sm-7">
                                <h1>{page.tagText}</h1>
                                <h2>{page.tagSubText}</h2>
                                <h3>{companyCount} members and growing fast</h3>
                            </div>
                            <div className="col-md-4 col-sm-5 register_box">
                                <div className="register_wrap">
                                    <Link to="/sign-up" className="register_btn">Register</Link> or <Link to="/sign-in"
                                                                                                          className="sign_in_btn">Sign
                                    In</Link>
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
                                <p>{page.bannerText}</p>
                                <Link to="/about">Learn More</Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="featured_companies">
                    <div className="container custom_container">
                        <div className="row">
                            <div className="col-sm-12 featured_top">
                                <h2>FEATURED COMPANIES</h2>
                                <p>{page.featuredText} <Link to="#">Get featured.</Link></p>
                            </div>
                        </div>
                        <div className="row">
                            {this.renderFeatured()}
                        </div>
                        <div className="row">
                            <div className="col-sm-12 featured_top featured_bottom">
                                <p>Don't see what you're looking for? <Link to="/directory">Browse our directory.</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="hiring">
                    <div className="container custom_container">
                        <div className="row">
                            <div className="col-sm-12 featured_top">
                                <h2>Now Hiring</h2>
                            </div>
                        </div>
                        <div className="row">
                            {this.renderHiring()}
                        </div>
                        <div className="row">
                            <div className="col-sm-12 featured_top featured_bottom">
                                <p>Don't see what you're looking for? <Link to="/directory">Browse our directory.</Link></p>
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
        companies: state.companies.data,
        config: state.config.data,
        page: state.pages.data.home || {},
    }
};

export default connect(mapStateToProps, null)(Home);
