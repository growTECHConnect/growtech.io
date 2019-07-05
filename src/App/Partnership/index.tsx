import React from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Network from '../Components/Network';

interface IProps {
    page: any;
}

class Partnership extends React.Component<IProps> {
    renderMarkup = (html: any) => {
        return { __html: html };
    };

    render() {
        const { page } = this.props;

        return (
            <div>
                <Header />
                <section className="base_page">
                    <div className="row">
                        <div className="col-sm-12">
                            <div dangerouslySetInnerHTML={this.renderMarkup(page.content)} />
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
        page: state.pages.data.partnership || {},
    };
};

export default connect(
    mapStateToProps,
    null
)(Partnership);
