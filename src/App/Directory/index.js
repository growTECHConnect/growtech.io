import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Network from '../Components/Network';
import Featured from '../Components/Featured';
import Tile from '../Components/Tile';

class Directory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filters: {
                fulltime: true,
                internship: true,
                parttime: true,
                notHiring: true,
            },
            search: '',
            types: [],
            sizes: [],
            industries: [],
        };
    }

    componentWillMount() {
        this.setFilters(this.props);
    }

    componentWillReceiveProps(nextProps) {
        const {companies, config} = this.props;

        if (companies !== nextProps.companies || config !== nextProps.config) {
            this.setFilters(nextProps);
        }
    }

    setFilters = (props) => {
        const {companies, config: {industries, sizes, types}} = props;
        const typeFilters = Object.keys(types)
            .map((type) => {
                const count = Object.keys(companies).filter((company) => {
                    return companies[company].active && companies[company].companyType === type;
                }).length;

                return {...types[type], key: type, count};
            })
            .filter((type) => {
                return type.count > 0;
            })
            .sort(function (a, b) {
                return b.count - a.count;
            });
        const industryFilters = Object.keys(industries)
            .map((industry) => {
                const count = Object.keys(companies).filter((company) => {
                    return companies[company].active && companies[company].industryType === industry;
                }).length;

                return {...industries[industry], key: industry, count};
            })
            .filter((industry) => {
                return industry.count > 0;
            })
            .sort(function (a, b) {
                return b.count - a.count;
            });
        const sizeFilters = sizes.map((size, index) => {
                const count = Object.keys(companies).filter((company) => {
                    return companies[company].active && companies[company].employeeSize === index.toString();
                }).length;
                const key = size.text.replace('-', '_').replace(' ', '_');

                return {...size, key, count};
            })
            .filter((size) => {
                return size.count > 0;
            })
            .sort(function (a, b) {
                return b.count - a.count;
            });
        let filters = {};

        industryFilters.forEach((industry) => {
            filters[industry.key] = true;
        });

        typeFilters.forEach((type) => {
            filters[type.key] = true;
        });

        sizeFilters.forEach((size) => {
            filters[size.key] = true;
        });

        this.setState({
            filters: {
                ...filters,
                ...this.state.filters,
            },
            industries: industryFilters,
            sizes: sizeFilters,
            types: typeFilters,
        });
    };

    searchFilter = ({target: {value}}) => {
        this.setState({search: value});
    };

    toggleFilter = ({target: {id}}) => {
        this.setState({
            filters: {
                ...this.state.filters,
                [id]: !this.state.filters[id],
            }
        });
    };

    renderTypeFilters = () => {
        const {types} = this.state;

        return types.map((filter, index) => {
            const text = `${filter.text} ${filter.count > 0 ? '(' + filter.count + ')' : ''}`;

            return (
                <li key={index}>
                    <div className="gt_checkbox">
                        <input id={filter.key}
                               type="checkbox"
                               checked={this.state.filters[filter.key]}
                               onChange={this.toggleFilter}
                        />
                        <label htmlFor={filter.key}>{text}</label>
                    </div>
                </li>
            );
        });
    };

    renderIndustryFilters = () => {
        const {industries} = this.state;

        return industries.map((filter, index) => {
            const text = `${filter.text} ${filter.count > 0 ? '(' + filter.count + ')' : ''}`;

            return (
                <li key={index}>
                    <div className="gt_checkbox">
                        <input id={filter.key}
                               type="checkbox"
                               checked={this.state.filters[filter.key]}
                               onChange={this.toggleFilter}
                        />
                        <label htmlFor={filter.key}>{text}</label>
                    </div>
                </li>
            );
        });
    };

    renderSizeFilters = () => {
        const {sizes} = this.state;

        return sizes.map((filter, index) => {
            const text = `${filter.text} ${filter.count > 0 ? '(' + filter.count + ')' : ''}`;

            return (
                <li key={index}>
                    <div className="gt_checkbox">
                        <input id={filter.key}
                               type="checkbox"
                               checked={this.state.filters[filter.key]}
                               onChange={this.toggleFilter}
                        />
                        <label htmlFor={filter.key}>{text}</label>
                    </div>
                </li>
            );
        });
    };

    renderFeatured = () => {
        const {companies, config: {site, types}} = this.props;
        const featuredCompanies = site.featuredCompanies || [];

        return featuredCompanies.map((key, index) => {
            if (companies[key]) {
                const companyType = companies[key].companyType;

                return <Featured key={index} id={key} company={companies[key]} type={types[companyType].text}/>;
            }
        });
    };

    renderCompanies = () => {
        const {companies, config: {sizes, types}} = this.props;
        const {filters, search} = this.state;
        const filteredKeys = Object.keys(companies)
            .filter((key) => {
                const company = companies[key];
                return company.active && company.isApproved;
            })
            .filter((key) => {
                const company = companies[key];
                return company.name.toLowerCase().includes(search.toLowerCase());
            })
            .filter((key) => {
                const company = companies[key];

                if (company.fulltime && filters.fulltime) {
                    return true;
                }

                if (company.parttime && filters.parttime) {
                    return true;
                }

                if (company.internship && filters.internship) {
                    return true;
                }

                if (!company.fulltime && !company.parttime && !company.internship && filters.notHiring) {
                    return true;
                }
            })
            .filter((key) => {
                const company = companies[key];
                const filtersKey = Object.keys(filters);
                const matches = filtersKey.filter((key) => {
                    return filters[key] && key === company.companyType;
                });

                return matches.length > 0;
            })
            .filter((key) => {
                const company = companies[key];
                const filtersKey = Object.keys(filters);
                const matches = filtersKey.filter((key) => {
                    return filters[key] && key === company.industryType;
                });

                return matches.length > 0;
            })
            .filter((key) => {
                const company = companies[key];
                const filtersKey = Object.keys(filters);
                const sizeKey = sizes[company.employeeSize].text.replace('-', '_').replace(' ', '_');
                const matches = filtersKey.filter((key) => {
                    return filters[key] && key === sizeKey;
                });

                return matches.length > 0;
            })
            .sort((a, b) => {
                const nameA = companies[a].name.toLowerCase();
                const nameB = companies[b].name.toLowerCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                return 0;
            });

        return filteredKeys.map((key, index) => {
            const companyType = companies[key].companyType;
            const companyTypeText = types[companyType] ? types[companyType].text : null;

            return <Tile key={index} id={key} company={companies[key]} type={companyTypeText} large={true}/>;
        });
    };

    render() {
        const {page} = this.props;

        return (
            <div>
                <Header/>
                <section className="featured_companies hiring">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 add_company">
                                <a href="#">Add Your Company</a>
                            </div>
                        </div>
                        <div className="row featured_three">
                            {this.renderFeatured()}
                        </div>
                        <div className="row">
                            <div className="col-sm-12 featured_top featured_bottom">
                                <p>{page.featuredText} <a href="#">Get featured.</a></p>
                            </div>
                        </div>
                    </div>
                    <div className="container matches_wrap">
                        <div className="row">
                            <div className="col-sm-5 filters_wrap">
                                <h2>Filters</h2>
                                <div className="search_wrap">
                                    <input id="name" type="text" placeholder="Search" value={this.state.search} onChange={this.searchFilter}/>
                                    <button type="submit">
                                        <img src="images/search_filter.png" className="img-responsive"/>
                                    </button>
                                </div>
                                <div className="filters">
                                    <h3>Hiring Status</h3>
                                    <ul>
                                        <li>
                                            <div className="gt_checkbox">
                                                <input id="fulltime"
                                                       type="checkbox"
                                                       checked={this.state.filters.fulltime}
                                                       onChange={this.toggleFilter}
                                                />
                                                <label htmlFor="fulltime">Full Time</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="gt_checkbox">
                                                <input id="parttime"
                                                       type="checkbox"
                                                       checked={this.state.filters.parttime}
                                                       onChange={this.toggleFilter}
                                                />
                                                <label htmlFor="parttime">Part Time</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="gt_checkbox">
                                                <input id="internship"
                                                       type="checkbox"
                                                       checked={this.state.filters.internship}
                                                       onChange={this.toggleFilter}
                                                />
                                                <label htmlFor="internship">Internship</label>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="gt_checkbox">
                                                <input id="notHiring"
                                                       type="checkbox"
                                                       checked={this.state.filters.notHiring}
                                                       onChange={this.toggleFilter}
                                                />
                                                <label htmlFor="notHiring">Not Hiring</label>
                                            </div>
                                        </li>
                                    </ul>
                                    <h3>Company Type</h3>
                                    <ul>
                                        {this.renderTypeFilters()}
                                    </ul>
                                    <h3>Industry Type</h3>
                                    <ul>
                                        {this.renderIndustryFilters()}
                                    </ul>
                                    <h3>Company Size</h3>
                                    <ul>
                                        {this.renderSizeFilters()}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-sm-7">
                                <div className="featured_top">
                                    <h2 className="text-left">All Matches</h2>
                                </div>
                                <div className="row">
                                    {this.renderCompanies()}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Network/>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    user: state.user.data,
    companies: state.companies.data,
    config: state.config.data,
    page: state.pages.data.directory || {},
}
};

export default connect(mapStateToProps, null)(Directory);
