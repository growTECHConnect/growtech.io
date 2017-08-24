import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types'

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <footer>
                <div className="container custom_container">
                    <div className="row">
                        <div className="col-sm-3 col-md-3 social_links">
                            <h2>FOLLOW GROWTECH</h2>
                            <Link to="/"><img src="/images/twitter.png" className="img-responsive"/></Link>
                            <Link to="/"><img src="/images/linkedin.png" className="img-responsive"/></Link>
                            <Link to="/"><img src="/images/facebook.png" className="img-responsive"/></Link>
                            <Link to="/"><img src="/images/instagram.png" className="img-responsive"/></Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="foot_logo">
                                <Link to="/"><img src="images/foot_logo.png" className="img-responsive"/></Link>
                                <p>&copy; 2017 Chicostart - All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;

