import React from 'react';
import { Redirect, Link } from 'react-router-dom';

const Featured = ({ company, id, type }) => {
    return (
        <div className="col-sm-6 feat_box">
            <div className="feat_wrap">
                <div className="feat_img">
                    <img src="/images/feat_img.jpg"/>
                </div>
                <Link to={`/company/${id}`} className="feat_info">
                    <h2>{type}</h2>
                    <h3>{company.name}</h3>
                    <p>{company.description}</p>
                    <span>Learn More<br/><i><img src="/images/learn_more.png"/></i></span>
                </Link>
            </div>
        </div>
    );
};

export default Featured;

