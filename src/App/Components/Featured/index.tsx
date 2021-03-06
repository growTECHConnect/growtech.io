import React from 'react';
import { Link } from 'react-router-dom';

const Featured = ({ company, id, type }: any) => {
    const url = company.mediaFiles && company.mediaFiles.featuredImg ? company.mediaFiles.featuredImg.url : null;

    return (
        <div className="col-sm-6 feat_box">
            <div className="feat_wrap">
                <div className="feat_img">
                    <img src={url} alt="" />
                </div>
                <Link to={`/company/${id}`} className="feat_info">
                    <h2>{type}</h2>
                    <h3>{company.name}</h3>
                    <p>{company.description}</p>
                    <span>
                        Learn More
                        <br />
                        <i>
                            <img src="/images/learn_more.png" alt="" />
                        </i>
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default Featured;
