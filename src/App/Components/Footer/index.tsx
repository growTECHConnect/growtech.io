import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

interface IProps {
    config: any;
}

interface IState {
    year: string;
}

class Footer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            year: moment().format('YYYY'),
        };
    }

    renderSocialLinks = () => {
        const { config } = this.props;

        if (config) {
            return Object.keys(config.social).map((key, index) => {
                return (
                    <a key={index} href={config.social[key].url}>
                        <img src={`/images/${key}.png`} className="img-responsive" alt="" />
                    </a>
                );
            });
        }

        return null;
    };

    render() {
        return (
            <footer>
                <div className="container custom_container">
                    <div className="row">
                        <div className="col-sm-3 col-md-3 social_links">
                            <h2>FOLLOW GROWTECH</h2>
                            {this.renderSocialLinks()}
                        </div>
                        <ul className="col-md-5 foot_menu">
                            <li>
                                <Link to="/contact-us">Contact Us</Link>
                                <br />
                            </li>
                            <li>
                                <a href="https://www.facebook.com/pg/growTECH.io/events">Events</a>
                                <br />
                            </li>
                            <li>
                                <a href="/contact-us">Newsletter</a>
                                <br />
                            </li>
                        </ul>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="foot_logo">
                                <Link to="/">
                                    <img src="images/foot_logo.png" className="img-responsive" alt="" />
                                </Link>
                                <p>&copy; {this.state.year} Chicostart - All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        config: state.config.data,
    };
};

export default connect(
    mapStateToProps,
    null
)(Footer);
