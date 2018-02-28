import React from 'react';
import { Redirect, Link } from 'react-router-dom';

const Tile = ({ company, id, type, large = false }) => {
    const columnClass = large ? 'col-sm-6 col-md-4 hiring_box' : 'col-sm-4 col-md-3 hiring_box';
    const url = company.mediaFiles && company.mediaFiles.listingsImg ? company.mediaFiles.listingsImg.url : null;

    return (
        <div className={columnClass}>
            <Link to={`/company/${id}`} className="hiring_wrap">
                <div className="hiring_logo">
                    <img src={url}></img>
                </div>
                <h2>{type}</h2>
                <h3>{company.name}</h3>
            </Link>
        </div>
    );
};

export default Tile;

