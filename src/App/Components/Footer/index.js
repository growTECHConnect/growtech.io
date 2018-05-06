import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import moment from 'moment';

class Footer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            year: moment().format('YYYY'),
        };
    }

    renderSocialLinks = () => {
        const {social} = this.props.config;

        return Object.keys(social).map((key, index) => {
            return (
                <a key={index} href={social[key].url}><img src={`/images/${key}.png`} className="img-responsive"/></a>
            );
        });
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
                                <Link to="/contact-us">Contact Us</Link><br/>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/pg/growTECH.io/events">Events</a><br/>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/pg/growTECH.io/events">Newsletter</a><br/>
                            </li>
                        </ul>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="foot_logo">
                                <Link to="/"><img src="images/foot_logo.png" className="img-responsive" /></Link>
                                <p>&copy; {this.state.year} Chicostart - All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        config: state.config.data,
    }
};

export default connect(mapStateToProps, null)(Footer);

