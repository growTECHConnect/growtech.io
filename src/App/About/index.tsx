import React from 'react';
import { connect } from 'react-redux';
import Gallery from 'react-photo-gallery';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Network from '../Components/Network';

interface IProps {
    images: any;
    tags: any;
    page: any;
}

class About extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);

        this.state = {};
    }

    renderMarkup = (html: any) => {
        return { __html: html };
    };

    renderImages = () => {
        const { images, tags } = this.props;

        if (images && tags) {
            return tags.map((key: string, index: number) => {
                const photos = images[key].map((image: any) => {
                    return {
                        src: image.src,
                        width: 1,
                        height: 1,
                    };
                });

                return (
                    <div className="insta_feed" key={index}>
                        <h3>#{key}</h3>
                        <Gallery photos={photos} />
                    </div>
                );
            });
        }
    };

    render() {
        const { page } = this.props;

        return (
            <div>
                <Header withSpace={true} />
                <section className="mainframe abt_mainframe">
                    <div className="mainframe_img about_img bg-color" />
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
                            <div className="col-sm-7 about_content_left" dangerouslySetInnerHTML={this.renderMarkup(page.contentLeft)} />
                            <div className="col-sm-5 about_content_right">
                                <div className="about_resources" dangerouslySetInnerHTML={this.renderMarkup(page.contentResources)} />
                                <h4>Chico’s Cost of Living</h4>
                                <div className="abt_chico_img">
                                    <a href="/infographic/092117_growTECH_infographic.pdf">
                                        <img src="/images/Chico_Infographic.png" className="img-responsive" alt="" />
                                    </a>
                                </div>
                                <h5>SHARE &amp; DOWNLOAD</h5>
                                <div className="abt_social">
                                    {/*<a href="#"><img src="/images/abt_twitter.png"/></a>*/}
                                    {/*<a href="#"><img src="/images/abt_linkedin.png"/></a>*/}
                                    {/*<a href="#"><img src="/images/abt_facebook.png"/></a>*/}
                                    {/*<a href="#"><img src="/images/abt_insta.png"/></a>*/}
                                    <a download="092117_growTECH_infographic.pdf" href="/infographic/092117_growTECH_infographic.pdf">
                                        <img src="/images/abt_download.png" alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="instagram_wrap">
                    <div className="container custom_container">
                        <div className="insta_head">
                            <div className="insta_logo">
                                <img src="/images/insta_big.png" className="img-responsive" alt="" />
                            </div>
                            <div className="insta_text">
                                <h2>Photos From our community</h2>
                                <h3>
                                    Are you on instagram? Tag your photos with{' '}
                                    <a
                                        href="https://www.instagram.com/explore/tags/growtechchico/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        #growtechchico
                                    </a>{' '}
                                    to be featured!
                                </h3>
                            </div>
                        </div>
                        {this.renderImages()}
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
        page: state.pages.data.about || {},
        images: state.config.data.images.data || [],
        tags: state.config.data.images.tags || [],
    };
};

export default connect(
    mapStateToProps,
    null
)(About);
