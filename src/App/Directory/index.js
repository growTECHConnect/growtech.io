import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Network from '../Components/Network';
import Featured from '../Components/Featured';
import Tile from '../Components/Tile';

class Directory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: {
                hiring: true,
                interns: true,
            },
            search: '',
        };

        this.filterCompanies.bind(this);
    }

    filterCompanies = ({target: {id}}) => {
        this.setState({
            filter: {
                ...this.state.filter,
                [id]: !this.state.filter[id],
            }
        }, () => {



            console.log('filterCompanies', id);
        });
    };

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

    renderCompanies() {
        const {companies, config: {types}} = this.props;
        const filteredKeys = Object.keys(companies).filter((key) => {
                const company = companies[key];

                return company.hiring === this.state.filter.hiring &&
                    company.interns === this.state.filter.interns;
            });

        return filteredKeys.map((key, index) => {
            const companyType = companies[key].companyType;

            return <Tile key={index} id={key} company={companies[key]} type={types[companyType].text} large={true}/>;
        });
    }

    render() {
        const {user, config: {site, types}} = this.props;
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
                            {this.renderFeatured()}
                        </div>
                        <div className="row">
                            <div className="col-sm-12 featured_top featured_bottom">
                                <p>{site.featuredText} <a href="#">Get featured.</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="container matches_wrap">
                        <div className="row">
                            <div className="col-sm-5 filters_wrap">

                                <h2>
                                    Filters
                                    <button className="c-hamburger c-hamburger--htla filter_icon">
                                        <span>toggle menu</span>
                                    </button>
                                </h2>
                                <div className="search_wrap">
                                    <input type="text" placeholder="Search"/>
                                    <button type="submit">
                                        <img src="images/search_filter.png" className="img-responsive"/>
                                    </button>
                                </div>
                                <div className="filters">
                                    <h3>Status</h3>
                                    <ul>
                                        <li>
                                            <div className="gt_checkbox">
                                                <input id="hiring"
                                                       type="checkbox"
                                                       checked={this.state.filter.hiring}
                                                       onChange={this.filterCompanies}
                                                />
                                                <label htmlFor="hiring">Now Hiring</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="gt_checkbox">
                                                <input id="interns"
                                                       type="checkbox"
                                                       checked={this.state.filter.interns}
                                                       onChange={this.filterCompanies}
                                                />
                                                <label htmlFor="interns">Looking For Interns</label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-7">
                                <div className="featured_top">
                                    <h2 className="text-left">All Matches</h2>
                                </div>
                                <div className="row">
                                    {this.renderCompanies()}
                                </div>
                            </div>



                            {/*<div className="col-sm-5 col-md-4 filters_wrap">*/}


                                {/*<div className="row filter_responsive">*/}
                                    {/*<div className="col-sm-12">*/}


                                        {/*<div className="filters">*/}
                                            {/*<h3>Type</h3>*/}
                                            {/*<ul>*/}
                                                {/*<li>*/}
                                                    {/*<div className="gt_checkbox">*/}
                                                        {/*<input id="checkboxt1" name="checkbox" type="checkbox"*/}
                                                               {/*checked={false}*/}
                                                               {/*onChange={this.onCheck}*/}
                                                        {/*/>*/}
                                                        {/*<label htmlFor="checkboxt1">Advertising/Marketing (68)</label>*/}
                                                    {/*</div>*/}
                                                {/*</li>*/}
                                                {/*<li>*/}
                                                    {/*<div className="gt_checkbox">*/}
                                                        {/*<input id="checkboxt2" name="checkbox" type="checkbox"/>*/}
                                                        {/*<label htmlFor="checkboxt2">Agency (91)</label>*/}
                                                    {/*</div>*/}
                                                {/*</li>*/}
                                                {/*<li>*/}
                                                    {/*<div className="gt_checkbox">*/}
                                                        {/*<input id="checkboxt3" name="checkbox" type="checkbox"/>*/}
                                                        {/*<label htmlFor="checkboxt3">Angel or VC Firm (19)</label>*/}
                                                    {/*</div>*/}
                                                {/*</li>*/}
                                                {/*<li>*/}
                                                    {/*<div className="gt_checkbox">*/}
                                                        {/*<input id="checkboxt4" name="checkbox" type="checkbox"/>*/}
                                                        {/*<label htmlFor="checkboxt4">Automotive (15)</label>*/}
                                                    {/*</div>*/}
                                                {/*</li>*/}
                                                {/*<li>*/}
                                                    {/*<div className="gt_checkbox">*/}
                                                        {/*<input id="checkboxt5" name="checkbox" type="checkbox"/>*/}
                                                        {/*<label htmlFor="checkboxt5">Big Data (62)</label>*/}
                                                    {/*</div>*/}
                                                {/*</li>*/}
                                                {/*<li>*/}
                                                    {/*<div className="gt_checkbox">*/}
                                                        {/*<input id="checkboxt6" name="checkbox" type="checkbox"/>*/}
                                                        {/*<label htmlFor="checkboxt6">Clean &amp; Green Tech (25)</label>*/}
                                                    {/*</div>*/}
                                                {/*</li>*/}
                                                {/*<li>*/}
                                                    {/*<div className="gt_checkbox">*/}
                                                        {/*<input id="checkboxt7" name="checkbox" type="checkbox"/>*/}
                                                        {/*<label htmlFor="checkboxt7">Co-Working Space or Incubator*/}
                                                            {/*(2)</label>*/}
                                                    {/*</div>*/}
                                                {/*</li>*/}
                                                {/*<li>*/}
                                                    {/*<div className="gt_checkbox">*/}
                                                        {/*<input id="checkboxt8" name="checkbox" type="checkbox"/>*/}
                                                        {/*<label htmlFor="checkboxt8">Professional Services (31)</label>*/}
                                                    {/*</div>*/}
                                                {/*</li>*/}
                                                {/*<li>*/}
                                                    {/*<div className="gt_checkbox">*/}
                                                        {/*<input id="checkboxt9" name="checkbox" type="checkbox"/>*/}
                                                        {/*<label htmlFor="checkboxt9">Technology Company (44)</label>*/}
                                                    {/*</div>*/}
                                                {/*</li>*/}
                                            {/*</ul>*/}
                                            {/*<ul className="toggle_options">*/}
                                                {/*<li>*/}
                                                    {/*<div className="gt_checkbox">*/}
                                                        {/*<input id="checkboxt10" name="checkbox" type="checkbox"/>*/}
                                                        {/*<label htmlFor="checkboxt10">Co-Working Space or Incubator*/}
                                                            {/*(2)</label>*/}
                                                    {/*</div>*/}
                                                {/*</li>*/}
                                                {/*<li>*/}
                                                    {/*<div className="gt_checkbox">*/}
                                                        {/*<input id="checkboxt11" name="checkbox" type="checkbox"/>*/}
                                                        {/*<label htmlFor="checkboxt11">Professional Services (31)</label>*/}
                                                    {/*</div>*/}
                                                {/*</li>*/}
                                                {/*<li>*/}
                                                    {/*<div className="gt_checkbox">*/}
                                                        {/*<input id="checkboxt12" name="checkbox" type="checkbox"/>*/}
                                                        {/*<label htmlFor="checkboxt12">Technology Company (44)</label>*/}
                                                    {/*</div>*/}
                                                {/*</li>*/}
                                            {/*</ul>*/}
                                            {/*<span className="option_toggler">Show More</span>*/}
                                        {/*</div>*/}

                                        {/*<div className="filters">*/}
                                            {/*<h3>Sort By</h3>*/}
                                            {/*<ul>*/}
                                                {/*<li>*/}
                                                    {/*<div className="gt_checkbox">*/}
                                                        {/*<input id="checkboxso1" name="checkbox" type="checkbox"*/}
                                                               {/*checked={false}*/}
                                                               {/*onChange={this.onCheck}*/}
                                                        {/*/>*/}
                                                        {/*<label htmlFor="checkboxso1">Recently Launched</label>*/}
                                                    {/*</div>*/}
                                                {/*</li>*/}
                                                {/*<li>*/}
                                                    {/*<div className="gt_checkbox">*/}
                                                        {/*<input id="checkboxso2" name="checkbox" type="checkbox"/>*/}
                                                        {/*<label htmlFor="checkboxso2">Recently Funded</label>*/}
                                                    {/*</div>*/}
                                                {/*</li>*/}
                                                {/*<li>*/}
                                                    {/*<div className="gt_checkbox">*/}
                                                        {/*<input id="checkboxso3" name="checkbox" type="checkbox"/>*/}
                                                        {/*<label htmlFor="checkboxso3">Recent Exits</label>*/}
                                                    {/*</div>*/}
                                                {/*</li>*/}
                                            {/*</ul>*/}
                                        {/*</div>*/}

                                        {/*<div className="filters">*/}
                                            {/*<h3>Company Size</h3>*/}
                                            {/*<ul>*/}
                                                {/*<li>*/}
                                                    {/*<div className="gt_checkbox">*/}
                                                        {/*<input id="checkboxc1" name="checkbox" type="checkbox"/>*/}
                                                        {/*<label htmlFor="checkboxc1">Self-employed / Remote</label>*/}
                                                    {/*</div>*/}
                                                {/*</li>*/}
                                                {/*<li>*/}
                                                    {/*<div className="gt_checkbox">*/}
                                                        {/*<input id="checkboxc2" name="checkbox" type="checkbox"/>*/}
                                                        {/*<label htmlFor="checkboxc2">1-10 employees</label>*/}
                                                    {/*</div>*/}
                                                {/*</li>*/}
                                                {/*<li>*/}
                                                    {/*<div className="gt_checkbox">*/}
                                                        {/*<input id="checkboxc3" name="checkbox" type="checkbox"/>*/}
                                                        {/*<label htmlFor="checkboxc3">11-50 employees</label>*/}
                                                    {/*</div>*/}
                                                {/*</li>*/}
                                                {/*<li>*/}
                                                    {/*<div className="gt_checkbox">*/}
                                                        {/*<input id="checkboxc4" name="checkbox" type="checkbox"/>*/}
                                                        {/*<label htmlFor="checkboxc4">51-200 employees</label>*/}
                                                    {/*</div>*/}
                                                {/*</li>*/}
                                                {/*<li>*/}
                                                    {/*<div className="gt_checkbox">*/}
                                                        {/*<input id="checkboxc5" name="checkbox" type="checkbox"/>*/}
                                                        {/*<label htmlFor="checkboxc5">201-500 employees</label>*/}
                                                    {/*</div>*/}
                                                {/*</li>*/}
                                                {/*<li>*/}
                                                    {/*<div className="gt_checkbox">*/}
                                                        {/*<input id="checkboxc6" name="checkbox" type="checkbox"/>*/}
                                                        {/*<label htmlFor="checkboxc6">501-1000 employees</label>*/}
                                                    {/*</div>*/}
                                                {/*</li>*/}
                                                {/*<li>*/}
                                                    {/*<div className="gt_checkbox">*/}
                                                        {/*<input id="checkboxc7" name="checkbox" type="checkbox"/>*/}
                                                        {/*<label htmlFor="checkboxc7">1001-5000 employees</label>*/}
                                                    {/*</div>*/}
                                                {/*</li>*/}
                                                {/*<li>*/}
                                                    {/*<div className="gt_checkbox">*/}
                                                        {/*<input id="checkboxc8" name="checkbox" type="checkbox"/>*/}
                                                        {/*<label htmlFor="checkboxc8">5001-10,000 employees</label>*/}
                                                    {/*</div>*/}
                                                {/*</li>*/}
                                                {/*<li>*/}
                                                    {/*<div className="gt_checkbox">*/}
                                                        {/*<input id="checkboxc9" name="checkbox" type="checkbox"/>*/}
                                                        {/*<label htmlFor="checkboxc9">10,001+ employees</label>*/}
                                                    {/*</div>*/}
                                                {/*</li>*/}
                                            {/*</ul>*/}
                                        {/*</div>*/}


                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}


                            {/*<div className="col-sm-7 col-md-8 all_matches_wrap">*/}
                                {/*<div className="row">*/}
                                    {/*<div className="col-sm-12 featured_top">*/}
                                        {/*<h2 className="text-left">All Matches</h2>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                {/*<div className="row">*/}
                                    {/*<div className="col-sm-6 col-md-4 hiring_box">*/}
                                        {/*<a href="company.html" className="hiring_wrap">*/}
                                            {/*<span className="hiring_logo">*/}
                                                {/*<img src="images/demo_logo2.png" className="img-responsive"/>*/}
                                            {/*</span>*/}
                                            {/*<h2>DIGITAL AGENCY</h2>*/}
                                            {/*<h3>Springbox</h3>*/}
                                        {/*</a>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                {/*<div className="row">*/}
                                    {/*<div className="col-sm-12 load_companies">*/}
                                        {/*<a href="#">LOAD MORE COMPANIES</a>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}


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
    config: state.config.data,
}
};

export default connect(mapStateToProps, null)(Directory);