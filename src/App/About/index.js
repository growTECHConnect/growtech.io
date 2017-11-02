import React from 'react';
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import Instafeed from 'instafeed.js';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Network from '../Components/Network';

class About extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        const feed = new Instafeed({
            get: 'tagged',
            tagName: 'chicoca',
            userId: '',
            clientId: '6bdb72b86cc745f2bc2a1b519fff4db6',
            accessToken: '',
        });

        feed.run();
    }

    componentWillReceiveProps(nextProps) {

    }

    renderMarkup = (html) => {
        return {__html: html};
    };

    render() {
        const {page} = this.props;

        return (
            <div>
                <Header withSpace={true}/>
                <section className="mainframe abt_mainframe">
                    <div className="mainframe_img about_img"></div>
                    <div className="container custom_container">
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <h1>{page.tagText}</h1>
                                <h2>{page.tagSubText}</h2>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="about_section abt_us_section">
                    <div className="container custom_container">
                        <div className="row">
                            <div className="col-sm-12">
                                <p>{page.bannerText}</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="about_content">
                    <div className="container custom_container">
                        <div className="row">
                            <div className="col-sm-7 about_content_left" dangerouslySetInnerHTML={this.renderMarkup(page.contentLeft)}></div>
                            <div className="col-sm-5 about_content_right">
                                <div className="about_resources" dangerouslySetInnerHTML={this.renderMarkup(page.contentResources)}></div>
                                <h4>Chico’s Cost of Living</h4>
                                <div className="abt_chico_img">
                                    <img src="/images/Chico_Infographic.png" className="img-responsive"/>
                                </div>
                                <h5>SHARE &amp; DOWNLOAD</h5>
                                <div className="abt_social">
                                    <a href="#"><img src="/images/abt_twitter.png"/></a>
                                    <a href="#"><img src="/images/abt_linkedin.png"/></a>
                                    <a href="#"><img src="/images/abt_facebook.png"/></a>
                                    <a href="#"><img src="/images/abt_insta.png"/></a>
                                    <a download="Chico_Infographic.png" href="/images/Chico_Infographic.png"><img src="/images/abt_download.png"/></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="instagram_wrap">
                    <div className="container custom_container">
                        <div className="insta_head">
                            <div className="insta_logo">
                                <img src="/images/insta_big.png" className="img-responsive"/>
                            </div>
                            <div className="insta_text">
                                <h2>Photos From our community</h2>
                                <h3>Are you on instagram? Tag your photos with <a href="#">#chicoca</a> and <a href="#">#growchico</a> to be featured!</h3>
                            </div>
                        </div>
                        <div className="instafeed">
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
        page: state.pages.data.about || {},
    }
};

export default connect(mapStateToProps, null)(About);
