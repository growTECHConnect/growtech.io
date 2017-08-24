import React from 'react';
import { Redirect, Link } from 'react-router-dom';

const Hiring = ({ company }) => {
    return (
        <div className="col-sm-4 col-md-3 hiring_box">
            <Link to="/company" className="hiring_wrap">
                <span className="hiring_logo">
                    <img src="/images/demo_logo2.png" className="img-responsive"/>
                </span>
                <h2>{company.type}</h2>
                <h3>{company.name}</h3>
            </Link>
        </div>
    );
};

export default Hiring;

