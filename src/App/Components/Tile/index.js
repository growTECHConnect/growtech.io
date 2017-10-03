import React from 'react';
import { Redirect, Link } from 'react-router-dom';

const Tile = ({ company, id, type, large = false }) => {
    const columnClass = large ? 'col-sm-6 col-md-4 hiring_box' : 'col-sm-4 col-md-3 hiring_box';

    return (
        <div className={columnClass}>
            <Link to={`/company/${id}`} className="hiring_wrap">
                <span className="hiring_logo">
                    <img src="/images/demo_logo2.png" className="img-responsive"/>
                </span>
                <h2>{type}</h2>
                <h3>{company.name}</h3>
            </Link>
        </div>
    );
};

export default Tile;

