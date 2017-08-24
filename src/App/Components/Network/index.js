import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types'

class Network extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="chico_network">
                <div className="container custom_container">
                    <div className="row">
                        <div className="col-sm-12">
                            <p>A member of the GROW Chico Network - Tech | <Link to="/">Manu</Link> | <Link to="/">Ag</Link></p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Network;

