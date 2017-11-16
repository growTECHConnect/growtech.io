import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class Footer extends React.Component {

    constructor(props) {
        super(props);
    }

    renderSocialLinks = () => {
        const {social} = this.props.config;

        return Object.keys(social).map((key) => {
            return (
                <a href={social[key].url}><img src={`/images/${key}.png`} className="img-responsive"/></a>
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


const mapStateToProps = (state) => {
    return {
        config: state.config.data,
    }
};

export default connect(mapStateToProps, null)(Footer);

