import React from 'react';
import {connect} from 'react-redux'

class ConfigForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                companyType: '',
                industryType: [],
            },
            dropdown: {
                companyType: null,
            },
            errors: false,
        };
    }

    componentDidMount() {
        this.setData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.company && nextProps.company !== this.props.company) {
            this.setData(nextProps);
        }
    }

    setData = ({company}) => {
        if (company) {
            this.setState({
                form: {
                    companyType: company.companyType || '',
                    industryType: company.industryType || [],
                },
            });
        }
    };

    setField = (event) => {
        const {id, value} = event.target;
        this.setState({form: {...this.state.form, [id]: value}, errors: false}, () => {
            if (this.updateTimeout) {
                clearTimeout(this.updateTimeout);
            }
            this.updateTimeout = setTimeout(() => this.update({id, value}), 2000);
        });
    };

    setIndustry= (value) => {
        let types;

        if (this.state.form.industryType.indexOf(value) > -1) {
            types = this.state.form.industryType.filter((type) => type !== value);
        } else {
            types = [...this.state.form.industryType, value];
        }

        if (types.length < 3) {
            this.setState({
                form: {
                    ...this.state.form,
                    industryType: types,
                },
            }, () => {
                if (this.updateTimeout) {
                    clearTimeout(this.updateTimeout);
                }
                this.updateTimeout = setTimeout(() => this.update({
                    id: 'industryType',
                    value: this.state.form.industryType,
                }), 2000);
            });
        }
    };

    update = (field) => {
        const {actions, company} = this.props;
        const {id, value} = field;

        if (value !== company[id]) {
            this.setState({saveMsg: 'saving...'}, () => {
                actions.company.update(this.state.form).then(() => {
                    this.setState({saveMsg: 'saved'}, () => {
                        setTimeout(() => this.setState({saveMsg: null}), 1000);
                    })
                });
            });
        }
    };

    getGroupClass = (field) => {
        const {errors} = this.state;

        return errors[field] ? 'network_fields form-group has-error' : 'network_fields form-group';
    };

    toggleDropdown = (field) => {
        event.preventDefault();
        this.setState({
            dropdown: {
                ...this.state.dropdown,
                [field]: this.state.dropdown[field] ? null : {display: 'block'},
            }
        })
    };

    renderDropdownOptions(options, id) {
        return Object.keys(options).map((key, index) => {
            return (
                <li
                    key={index}
                    onClick={() => {
                        this.setField({target: {id, value: key}});
                        this.toggleDropdown(id);
                    }}
                >
                    {options[key].text}
                </li>
            );
        });
    }

    renderIndustry() {
        const {industries} = this.props.config;
        const {form} = this.state;

        return Object.keys(industries).map((key, index) => {
            const checked = form.industryType.indexOf(key) > -1;

            return (
                <div key={index} className="col-md-4 col-sm-6">
                    <div className="gt_checkbox">
                        <input id={`industry${index}`} name="checkbox" type="checkbox" checked={checked}
                               onChange={() => this.setIndustry(key)}/>
                        <label htmlFor={`industry${index}`}>{industries[key].text}</label>
                    </div>
                </div>
            );
        });
    }

    render() {
        const {dropdown, form} = this.state;
        const {types} = this.props.config;
        const companyTypeText = types[form.companyType] ? types[form.companyType].text : null;
        const remaining = 2 - form.industryType.length;

        return (
            <div className="acc_form_section">
                <h2>Company Type and Industry</h2>
                <form noValidate onSubmit={(event) => event.preventDefault()}>
                    <div className="acc_form_fields">
                        <div className="type_wrap">
                            <h3 className="form_subtitle">Type</h3>
                            <div className="btn-group gt_select">
                                <button
                                    className="btn btn-default btn-lg dropdown-toggle"
                                    onClick={() => this.toggleDropdown('companyType')}
                                >
                                    <span className="gt_selected">{companyTypeText}</span>
                                    <span className="caret"></span>
                                </button>
                                <ul className="dropdown-menu" style={dropdown.companyType}>
                                    {this.renderDropdownOptions(types, 'companyType')}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="type_wrap inds_wrap">
                        <h3>Industry <span>{`Select up to 2 industries (${remaining} remain)`}</span></h3>
                        <div className="clearfix"></div>
                        {this.renderIndustry()}
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        actions: {
            company: state.company.actions,
        },
        company: state.company.data,
        config: state.config.data,
    }
};

export default connect(mapStateToProps, null)(ConfigForm);
