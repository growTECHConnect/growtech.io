import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Network from '../Components/Network';
import Featured from '../Components/Featured';
import Hiring from '../Components/Hiring';

class Directory extends React.Component {
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
        const {companies, site: {featuredCompanies}} = this.props;

        return featuredCompanies.map((key, index) => {
            if (companies[key]) {
                return <Featured company={companies[key]} key={index}/>;
            }
        });
    }

    renderHiring() {
        const {companies} = this.props;
        const {hoursFilter} = this.state;

        return Object.keys(companies).map((key, index) => {
            if (companies[key].hiring) {
                if (companies[key].hours === hoursFilter || hoursFilter === 'all') {
                    return <Hiring company={companies[key]} key={index}/>;
                }
            }
        });
    }

    render() {
        const {initialized, user, site} = this.props;
        const companies = Object.keys(this.props.companies || {}).map((key) => key);

        return (
            <div>
                <Header/>
                <section className="featured_companies hiring">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 add_company">
                                <a href="#">Add Your Company</a>
                            </div>
                        </div>
                        <div className="row featured_three">
                            <div className="col-sm-4 feat_box">
                                <div className="feat_wrap">
                                    <div className="feat_img">
                                        <img src="images/feat_img.jpg"/>
                                    </div>
                                    <a href="company.html" className="feat_info">
                                        <h2>Advertising</h2>
                                        <h3>Kern Group</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce elementum
                                            tortor in dapibus bibendum.</p>
                                        <span>Learn More<br/><i><img src="images/learn_more.png"/></i></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 featured_top featured_bottom">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce elementum tortor in
                                    dapibus bibendum. <a href="#">Get featured.</a></p>
                            </div>
                        </div>
                    </div>


                    <div className="container matches_wrap">
                        <div className="row">

                            <div className="col-sm-5 col-md-4 filters_wrap">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <h2>
                                            Filters
                                            <button className="c-hamburger c-hamburger--htla filter_icon">
                                                <span>toggle menu</span>
                                            </button>
                                        </h2>
                                    </div>
                                </div>


                                <div className="row filter_responsive">
                                    <div className="col-sm-12">
                                        <div className="search_wrap">
                                            <input type="text" placeholder="Search"/>
                                            <button type="submit"><img src="images/search_filter.png"
                                                                       className="img-responsive"/></button>
                                        </div>
                                        <div className="filters">
                                            <h3>Status</h3>
                                            <ul>
                                                <li>
                                                    <div className="gt_checkbox">
                                                        <input id="checkboxs1" name="checkbox" type="checkbox"
                                                               checked="checked"/>
                                                        <label for="checkboxs1">Now Hiring</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="gt_checkbox">
                                                        <input id="checkboxs2" name="checkbox" type="checkbox"/>
                                                        <label for="checkboxs2">Looking For Interns</label>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="filters">
                                            <h3>Type</h3>
                                            <ul>
                                                <li>
                                                    <div className="gt_checkbox">
                                                        <input id="checkboxt1" name="checkbox" type="checkbox"
                                                               checked="checked"/>
                                                        <label for="checkboxt1">Advertising/Marketing (68)</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="gt_checkbox">
                                                        <input id="checkboxt2" name="checkbox" type="checkbox"/>
                                                        <label for="checkboxt2">Agency (91)</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="gt_checkbox">
                                                        <input id="checkboxt3" name="checkbox" type="checkbox"/>
                                                        <label for="checkboxt3">Angel or VC Firm (19)</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="gt_checkbox">
                                                        <input id="checkboxt4" name="checkbox" type="checkbox"/>
                                                        <label for="checkboxt4">Automotive (15)</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="gt_checkbox">
                                                        <input id="checkboxt5" name="checkbox" type="checkbox"/>
                                                        <label for="checkboxt5">Big Data (62)</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="gt_checkbox">
                                                        <input id="checkboxt6" name="checkbox" type="checkbox"/>
                                                        <label for="checkboxt6">Clean &amp; Green Tech (25)</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="gt_checkbox">
                                                        <input id="checkboxt7" name="checkbox" type="checkbox"/>
                                                        <label for="checkboxt7">Co-Working Space or Incubator
                                                            (2)</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="gt_checkbox">
                                                        <input id="checkboxt8" name="checkbox" type="checkbox"/>
                                                        <label for="checkboxt8">Professional Services (31)</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="gt_checkbox">
                                                        <input id="checkboxt9" name="checkbox" type="checkbox"/>
                                                        <label for="checkboxt9">Technology Company (44)</label>
                                                    </div>
                                                </li>
                                            </ul>
                                            <ul className="toggle_options">
                                                <li>
                                                    <div className="gt_checkbox">
                                                        <input id="checkboxt10" name="checkbox" type="checkbox"/>
                                                        <label for="checkboxt10">Co-Working Space or Incubator
                                                            (2)</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="gt_checkbox">
                                                        <input id="checkboxt11" name="checkbox" type="checkbox"/>
                                                        <label for="checkboxt11">Professional Services (31)</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="gt_checkbox">
                                                        <input id="checkboxt12" name="checkbox" type="checkbox"/>
                                                        <label for="checkboxt12">Technology Company (44)</label>
                                                    </div>
                                                </li>
                                            </ul>
                                            <span className="option_toggler">Show More</span>
                                        </div>

                                        <div className="filters">
                                            <h3>Sort By</h3>
                                            <ul>
                                                <li>
                                                    <div className="gt_checkbox">
                                                        <input id="checkboxso1" name="checkbox" type="checkbox"
                                                               checked="checked"/>
                                                        <label for="checkboxso1">Recently Launched</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="gt_checkbox">
                                                        <input id="checkboxso2" name="checkbox" type="checkbox"/>
                                                        <label for="checkboxso2">Recently Funded</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="gt_checkbox">
                                                        <input id="checkboxso3" name="checkbox" type="checkbox"/>
                                                        <label for="checkboxso3">Recent Exits</label>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="filters">
                                            <h3>Company Size</h3>
                                            <ul>
                                                <li>
                                                    <div className="gt_checkbox">
                                                        <input id="checkboxc1" name="checkbox" type="checkbox"/>
                                                        <label for="checkboxc1">Self-employed / Remote</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="gt_checkbox">
                                                        <input id="checkboxc2" name="checkbox" type="checkbox"/>
                                                        <label for="checkboxc2">1-10 employees</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="gt_checkbox">
                                                        <input id="checkboxc3" name="checkbox" type="checkbox"/>
                                                        <label for="checkboxc3">11-50 employees</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="gt_checkbox">
                                                        <input id="checkboxc4" name="checkbox" type="checkbox"/>
                                                        <label for="checkboxc4">51-200 employees</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="gt_checkbox">
                                                        <input id="checkboxc5" name="checkbox" type="checkbox"/>
                                                        <label for="checkboxc5">201-500 employees</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="gt_checkbox">
                                                        <input id="checkboxc6" name="checkbox" type="checkbox"/>
                                                        <label for="checkboxc6">501-1000 employees</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="gt_checkbox">
                                                        <input id="checkboxc7" name="checkbox" type="checkbox"/>
                                                        <label for="checkboxc7">1001-5000 employees</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="gt_checkbox">
                                                        <input id="checkboxc8" name="checkbox" type="checkbox"/>
                                                        <label for="checkboxc8">5001-10,000 employees</label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="gt_checkbox">
                                                        <input id="checkboxc9" name="checkbox" type="checkbox"/>
                                                        <label for="checkboxc9">10,001+ employees</label>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>


                                    </div>
                                </div>
                            </div>


                            <div className="col-sm-7 col-md-8 all_matches_wrap">
                                <div className="row">
                                    <div className="col-sm-12 featured_top">
                                        <h2 className="text-left">All Matches</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-md-4 hiring_box">
                                        <a href="company.html" className="hiring_wrap">
                                            <span className="hiring_logo">
                                                <img src="images/demo_logo2.png" className="img-responsive"/>
                                            </span>
                                            <h2>DIGITAL AGENCY</h2>
                                            <h3>Springbox</h3>
                                        </a>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 load_companies">
                                        <a href="#">LOAD MORE COMPANIES</a>
                                    </div>
                                </div>
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
    user: state.user,
    companies: state.companies,
    site: state.config ? state.config.site : null,
    initialized: state.initialized,
}
};

export default connect(mapStateToProps, null)(Directory);