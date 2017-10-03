import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Network from '../Components/Network';

class NoMatch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div>
                <Header/>
                <section className="featured_companies hiring">
                    <h1>No Matching Page</h1>
                </section>
                <Network/>
                <Footer/>
            </div>
        );
    }
}

export default NoMatch;