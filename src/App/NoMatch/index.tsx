import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Network from '../Components/Network';

class NoMatch extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <section className="featured_companies hiring">
                    <div className="col-sm-3" />
                    <div className="col-sm-6 text-center">
                        <h1>No Matching Page</h1>
                    </div>
                    <div className="col-sm-3" />
                </section>
                <Network />
                <Footer />
            </div>
        );
    }
}

export default NoMatch;
