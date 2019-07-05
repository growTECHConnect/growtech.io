import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import * as showdown from 'showdown';
import striptags from 'striptags';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Network from '../Components/Network';

interface IProps {
    companies: any;
    config: any;
    match: any;
}

const converter = new showdown.Converter();

class Company extends React.Component<IProps> {
    renderMarkup = (markdown: any) => {
        markdown = striptags(markdown);
        return { __html: converter.makeHtml(markdown) };
    };

    renderSocialLinks = (company: any) => {
        const social: { [index: string]: any } = {
            youtube: { url: company.youtubeUrl },
            facebook: { url: company.facebookUrl },
            twitter: { url: company.twitterUrl },
            instagram: { url: company.instagramUrl },
            linkedin: { url: company.linkedinUrl },
        };

        return Object.keys(social)
            .filter((key: string) => social[key].url && social[key].url.length > 0)
            .map((key, index) => {
                return (
                    <a key={index} href={social[key].url} target="_blank" rel="noopener noreferrer">
                        <img src={`/images/${key}-company.png`} className="img-responsive" alt="" />
                    </a>
                );
            });
    };

    renderEvents = (company: any) => {
        if (!company.events) {
            return null;
        }

        return company.events.map((item: any, index: number) => {
            const date = item.date ? moment(item.date).format('ll') : '';

            return (
                <div key={index} className="company_box">
                    <a target="_blank" href={item.link} rel="noopener noreferrer">
                        {item.title}
                    </a>
                    <h6>{date}</h6>
                </div>
            );
        });
    };

    renderNews = (company: any) => {
        if (!company.news) {
            return null;
        }

        return company.news.map((item: any, index: number) => {
            const date = item.date ? moment(item.date).format('ll') : '';

            return (
                <div key={index} className="list_company">
                    <a target="_blank" href={item.link} rel="noopener noreferrer">
                        {item.title}
                    </a>
                    <h4>{date}</h4>
                </div>
            );
        });
    };

    render() {
        const {
            companies,
            config: { industries, sizes, types },
            match: { params },
        } = this.props;
        const company = companies[params.key];
        const companyImg = company.mediaFiles && company.mediaFiles.companyImg ? company.mediaFiles.companyImg.url : null;
        const companyType = types[company.companyType] ? types[company.companyType].text : null;
        const industryType = industries[company.industryType] ? industries[company.industryType].text : null;

        if (!company || (company && !company.isApproved)) {
            return <Redirect to="/no-match" />;
        }

        return (
            <div>
                <Header />
                <section className="company_header">
                    <div className="container">
                        <div className="breadcrumb">
                            <Link to="/directory">
                                <span className="back_arrow">
                                    <img src="/images/breadcrumb_arrow.png" alt="" />
                                </span>
                                Back to Directory
                            </Link>
                        </div>
                    </div>
                    <div className="container custom_container company_top_details">
                        <div className="company_logo">
                            <img src={companyImg} alt="" />
                        </div>
                        <p>{company.description}</p>
                        <a href={company.contactUsUrl} target="_blank" rel="noopener noreferrer">
                            Contact Us
                        </a>
                    </div>
                </section>
                <section className="company_full_details">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-5 company_left">
                                <div className="company_block">
                                    <h3>OVERVIEW</h3>
                                    <div className="company_box">
                                        <h4>Website</h4>
                                        <a href={company.url} target="_blank" rel="noopener noreferrer">
                                            {company.url}
                                        </a>
                                    </div>
                                    <div className="company_box">
                                        <h4>Founded</h4>
                                        <h5>{company.founded}</h5>
                                    </div>
                                    <div className="company_box">
                                        <h4>Status</h4>
                                        <h5>{`${company.active ? 'Active' : 'Inactive'}`}</h5>
                                    </div>
                                    <div className="company_box">
                                        <h4>Size</h4>
                                        <h5>{sizes[company.employeeSize].text}</h5>
                                    </div>
                                    <div className="company_box">
                                        <h4>Location</h4>
                                        <h5>{`${company.city}, ${company.state}`}</h5>
                                    </div>
                                    <div className="company_box">
                                        <h4>Type</h4>
                                        <h5>{companyType}</h5>
                                    </div>
                                    <div className="company_box">
                                        <h4>Industry</h4>
                                        <h5>{industryType}</h5>
                                    </div>
                                    <div className="company_social">{this.renderSocialLinks(company)}</div>
                                </div>
                                <div className="company_block">
                                    <h3>JOB SITE</h3>
                                    <div className="company_box">
                                        <a href={company.jobsiteUrl} target="_blank" rel="noopener noreferrer">
                                            {company.jobsiteUrl}
                                        </a>
                                    </div>
                                </div>
                                <div className="company_block">
                                    <h3>UPCOMING EVENTS</h3>
                                    {this.renderEvents(company)}
                                </div>
                            </div>
                            <div className="col-sm-7 company_right">
                                <div className="company_info_details">
                                    <h2>Why Work With Us?</h2>
                                    <p dangerouslySetInnerHTML={this.renderMarkup(company.why)} />
                                </div>
                                <div className="company_info_details">
                                    <h2>Culture</h2>
                                    <p dangerouslySetInnerHTML={this.renderMarkup(company.culture)} />
                                </div>
                                <div className="company_info_details">
                                    <h2>Perks &amp; Benefits</h2>
                                    <p dangerouslySetInnerHTML={this.renderMarkup(company.benefits)} />
                                </div>
                                <h2>In the News</h2>
                                {this.renderNews(company)}
                            </div>
                        </div>
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
        user: state.user.data,
        companies: state.companies.data,
        config: state.config.data,
    };
};

export default connect(
    mapStateToProps,
    null
)(Company);
