import React from 'react';
import { Redirect, Link } from 'react-router-dom';

const Tile = ({ company, id, type, large = false }) => {
    const columnClass = large ? 'col-sm-6 col-md-4 hiring_box' : 'col-sm-4 col-md-3 hiring_box';
    const url = company.mediaFiles && company.mediaFiles.listingsImg ? `url(${company.mediaFiles.listingsImg.url})` : null;
    const style = {
        backgroundImage: url,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    console.log(company);

    return (
        <div className={columnClass}>
            <Link to={`/company/${id}`} className="hiring_wrap">
                <span className="hiring_logo" style={style}></span>
                <h2>{type}</h2>
                <h3>{company.name}</h3>
            </Link>
        </div>
    );
};

export default Tile;

