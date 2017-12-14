import React from 'react';
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Network from '../Components/Network';

class Partnership extends React.Component {

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
                <Header/>
                <section className="partnership">
                    <div dangerouslySetInnerHTML={this.renderMarkup(page.content)}></div>
                </section>
                <Network/>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        page: state.pages.data.partnership || {},
    }
};

export default connect(mapStateToProps, null)(Partnership);
