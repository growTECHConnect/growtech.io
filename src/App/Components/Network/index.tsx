import React from 'react';

class Network extends React.Component {
    render() {
        return (
            <section className="chico_network">
                <div className="container custom_container">
                    <div className="row">
                        <div className="col-sm-12">
                            <p>
                                A member of the GROW Chico Network<span className="nodisplay-cellphone"> - </span>
                                <span className="display-cellphone">
                                    <br />
                                </span>
                                Tech |{' '}
                                <a target="_blank" rel="noopener noreferrer" href="https://growmanufacturing.com/about">
                                    Manu
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Network;
