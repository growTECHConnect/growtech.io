import React from 'react';
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Network from '../Components/Network';

class Community extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    renderMarkup = (html) => {
        return {__html: html};
    };

    render() {
        const {page} = this.props;

        return (
            <div>
                <Header withSpace={true}/>
                <section className="mainframe community_mainframe">
                    <div className="mainframe_img about_img bg-color"></div>
                    <div className="container custom_container">
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <h1>{page.tagText}</h1>
                                <h2 dangerouslySetInnerHTML={this.renderMarkup(page.tagSubText)}></h2>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="community_section  about_section abt_us_section">
                    <div className="container custom_container">
                        <div className="row">
                            <div className="col-sm-12">
                                <p dangerouslySetInnerHTML={this.renderMarkup(page.bannerText)}></p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="community_content">
                    <div className="container custom_container">
                        <div className="row">
                            <div className="col-sm-7 about_content_left" dangerouslySetInnerHTML={this.renderMarkup(page.contentLeft)}></div>
                            <div className="col-sm-5 about_content_right">
                                <div className="about_resources" dangerouslySetInnerHTML={this.renderMarkup(page.contentResources)}></div>
                                <h4>Chico’s Cost of Living</h4>
                                <div className="abt_chico_img">
                                    <a href="/infographic/092117_growTECH_infographic.pdf">
                                        <img src="/images/Chico_Infographic.png" className="img-responsive"/>
                                    </a>
                                </div>
                                <h5>SHARE &amp; DOWNLOAD</h5>
                                <div className="abt_social">
                                    <a download="092117_growTECH_infographic.pdf" href="/infographic/092117_growTECH_infographic.pdf"><img src="/images/abt_download.png"/></a>
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
        page: state.pages.data.community || {},
    }
};

export default connect(mapStateToProps, null)(Community);
