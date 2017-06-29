import React from 'react';
import {connect} from 'react-redux'
import actions from '../../actions';

class ContactForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                name: '',
                url: '',
                founded: '',
                email: '',
                employees: '0',
                active: false,
                city: '',
                state: '',
                description: '',
                why: '',
                culture: '',
                benefits: '',
            },
            errors: false,
            dropdown: {
                employees: null,
            }
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

    setData = ({ company, initialized }) => {
        if (initialized.company && company) {
            this.setState({
                form: {
                    name: company.name || '',
                    url: company.url || '',
                    founded: company.founded || '',
                    email: company.email || '',
                    employees: company.employees || '0',
                    active: company.active,
                    city: company.city || '',
                    state: company.state || '',
                    description: company.description || '',
                    why: company.why || '',
                    culture: company.culture || '',
                    benefits: company.benefits || '',
                },
            });
        }
    };

    setField = (event) => {
        const { id, value } = event.target;

        this.setState({
            form: {
                ...this.state.form,
                [id]: value,
            },
            errors: false,
        });
    };

    setRadio = (id, value) => {
        this.setField({ target: { id, value }});
    };

    updateCompany = (event) => {
        event.preventDefault();
        const { account: { group } } = this.props;
        actions.company.update(group, this.state.form);
    };

    cancel = (event) => {
        event.preventDefault();
        this.setData(this.props);
    };

    hasError = (field) => {
        const { errors } = this.state;
        return errors[field] ? 'has-error' : '';
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
        return options.map((value, index) => {
            return (
                <li
                    key={index}
                    onClick={() => {
                        this.setField({ target: { id, value }});
                        this.toggleDropdown(id);
                    }}
                >
                    {value}
                </li>
            );
        });
    }

    render() {
        const { dropdown, errors, form } = this.state;

        return (
            <form noValidate onSubmit={(event) => event.preventDefault()}>
                <div className="acc_form_wrap acc_form_three_col">
                    <div className="acc_form_fields">
                        <div className={`network_fields form-group ${this.hasError('name')}`}>
                            <label className="control-label" htmlFor="name">Company Name</label>
                            <input id="name" className="form-control" type="text" value={form.name} onChange={this.setField}/>
                            <span className="help-block">{errors.name}</span>
                        </div>
                    </div>
                    <div className="acc_form_fields">
                        <div className={`network_fields form-group ${this.hasError('url')}`}>
                            <label className="control-label" htmlFor="url">Company URL</label>
                            <input id="url" className="form-control" type="text" value={form.url} onChange={this.setField}/>
                            <span className="help-block">{errors.name}</span>
                        </div>
                    </div>
                    <div className="acc_form_fields">
                        <div className={`network_fields form-group ${this.hasError('founded')}`}>
                            <label className="control-label" htmlFor="founded">Year Founded</label>
                            <input id="founded" className="form-control" type="text" value={form.founded} onChange={this.setField}/>
                            <span className="help-block">{errors.founded}</span>
                        </div>
                    </div>
                </div>
                <div className="acc_form_wrap acc_form_three_col">
                    <div className="acc_form_fields">
                        <div className={`network_fields form-group ${this.hasError('email')}`}>
                            <label className="control-label" htmlFor="email">Company Email</label>
                            <input id="email" className="form-control" type="text" value={form.email} onChange={this.setField}/>
                            <span className="help-block">{errors.email}</span>
                        </div>
                    </div>
                    <div className="acc_form_fields">
                        <div className="network_fields">
                            <label>Number of Employees</label>
                            <div className="btn-group gt_select">
                                <button
                                    className="btn btn-default btn-lg dropdown-toggle"
                                    onClick={() => this.toggleDropdown('employees')}
                                >
                                    <span className="gt_selected">{form.employees}</span>
                                    <span className="caret"></span>
                                </button>
                                <ul className="dropdown-menu" style={dropdown.employees}>
                                    {this.renderDropdownOptions(['10', '50', '100'], 'employees')}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="acc_form_fields">
                        <div className="network_fields radio_group_wrap">
                            <label>Company Status</label>
                            <div className="clearfix"></div>
                            <span className="gt_radio">
                                <input type="radio" id="active" name="active" checked={form.active ? 'on' : ''} onChange={() => this.setRadio('active', true)}/>
                                <label htmlFor="active">Active</label>
                            </span>
                            <span className="gt_radio">
                                <input type="radio" id="inactive" name="active" checked={form.active ? '' : 'on'} onChange={() => this.setRadio('active', false)}/>
                                <label htmlFor="inactive">Inactive</label>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="acc_form_wrap acc_form_three_col">
                    <div className="acc_form_fields">
                         <div className={`network_fields form-group ${this.hasError('city')}`}>
                            <label className="control-label" htmlFor="city">City</label>
                            <input id="city" className="form-control" type="text" value={form.city} onChange={this.setField}/>
                            <span className="help-block">{errors.city}</span>
                        </div>
                    </div>
                    <div className="acc_form_fields">
                        <div className="network_fields">
                            <label>State</label>
                            <div className="btn-group gt_select">
                                <button
                                    className="btn btn-default btn-lg dropdown-toggle"
                                    onClick={() => this.toggleDropdown('state')}
                                >
                                    <span className="gt_selected">{form.state}</span>
                                    <span className="caret"></span>
                                </button>
                                <ul className="dropdown-menu" style={dropdown.state}>
                                    {this.renderDropdownOptions(['CA', 'NV', 'OR'], 'state')}
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div className="acc_form_fields"></div>
                </div>
                <div className="acc_form_wrap">
                    <div className="acc_form_fields">
                        <div className={`network_fields form-group ${this.hasError('description')}`}>
                            <label className="control-label" htmlFor="description">Company Description</label>
                            <textarea id="description" className="form-control" value={form.description} onChange={this.setField}/>
                            <span className="help-block">{errors.description}</span>
                        </div>
                    </div>
                    <div className="acc_form_fields">
                        <div className={`network_fields form-group ${this.hasError('why')}`}>
                            <label className="control-label" htmlFor="why">Why Work With Us</label>
                            <textarea id="why" className="form-control" value={form.why} onChange={this.setField}/>
                            <span className="help-block">{errors.why}</span>
                        </div>
                    </div>
                </div>
                <div className="acc_form_wrap">
                    <div className="acc_form_fields">
                        <div className={`network_fields form-group ${this.hasError('culture')}`}>
                            <label className="control-label" htmlFor="culture">Culture</label>
                            <textarea id="culture" className="form-control" value={form.culture} onChange={this.setField}/>
                            <span className="help-block">{errors.culture}</span>
                        </div>
                    </div>
                    <div className="acc_form_fields">
                        <div className={`network_fields form-group ${this.hasError('benefits')}`}>
                            <label className="control-label" htmlFor="benefits">Perks &amp; Benefits</label>
                            <textarea id="benefits" className="form-control" value={form.benefits} onChange={this.setField}/>
                            <span className="help-block">{errors.benefits}</span>
                        </div>
                    </div>
                </div>
                <div className="acc_form_wrap">
                    <div className="acc_form_fields acc_form_btns">
                        <button onClick={this.cancel}>Cancel</button>
                        <button onClick={this.updateCompany}>Save</button>
                    </div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account,
        company: state.company,
        error: state.error,
        initialized: state.initialized,
    }
};

export default connect(mapStateToProps, null)(ContactForm);
