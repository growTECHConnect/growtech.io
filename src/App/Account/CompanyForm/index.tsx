import 'easymde/dist/easymde.min.css';

import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import { connect } from 'react-redux';
import striptags from 'striptags';

interface IProps {
    actions: any;
    onRef: any;
    company: any;
    config: any;
}

interface IState {
    [index: string]: any;
    form: {
        name: string;
        url: string;
        founded: string;
        email: string;
        contactUsUrl: string;
        employeeSize: number;
        city: string;
        state: string;
        description: string;
        why: string;
        culture: string;
        benefits: string;
    };
    why: any;
    errors: any;
    dropdown: any;
}

class CompanyForm extends React.Component<IProps, IState> {
    updateTimeout!: NodeJS.Timeout;

    constructor(props: IProps) {
        super(props);

        this.state = {
            form: {
                name: '',
                url: '',
                founded: '',
                email: '',
                contactUsUrl: '',
                employeeSize: 0,
                city: '',
                state: '',
                description: '',
                why: '',
                culture: '',
                benefits: '',
            },
            why: {},
            // benefits: { text: '', tab: 'write' },
            // culture: { text: '', tab: 'write' },
            // why: { text: '', tab: 'write' },
            errors: {},
            dropdown: {},
        };
    }

    componentDidMount() {
        this.props.onRef(this);
        this.setData(this.props);
    }

    componentWillReceiveProps(nextProps: IProps) {
        if (nextProps.company !== null) {
            if (nextProps.company && nextProps.company !== this.props.company) {
                this.setData(nextProps);
            }
        }
    }

    getFormData = () => {
        return {
            ...this.state.form,
        };
    };

    setData = ({ company }: any) => {
        if (company) {
            this.setState({
                form: {
                    name: '',
                    url: '',
                    founded: '',
                    email: '',
                    contactUsUrl: '',
                    employeeSize: 0,
                    city: '',
                    state: '',
                    description: '',
                    why: '',
                    culture: '',
                    benefits: '',
                    ...company,
                },
            });
        }
    };

    update = (field: any) => {
        const { actions, company } = this.props;
        const { id, value } = field;

        if (value !== company[id]) {
            actions.company.update(this.state.form);
        }
    };

    setField = ({ target }: any) => {
        const { id, value } = target;
        this.setState({ form: { ...this.state.form, [id]: value }, errors: false }, () => {
            if (this.updateTimeout) {
                clearTimeout(this.updateTimeout);
            }
            this.updateTimeout = setTimeout(() => this.update({ id, value }), 2000);
        });
    };

    setChecked = (id: string, value: any) => {
        this.setField({ target: { id, value } });
    };

    getGroupClass = (field: string) => {
        const { errors } = this.state;

        return errors[field] ? 'network_fields form-group has-error' : 'network_fields form-group';
    };

    toggleDropdown = (field: string) => {
        this.setState({
            dropdown: {
                ...this.state.dropdown,
                [field]: this.state.dropdown[field] ? null : { display: 'block' },
            },
        });
    };

    onEditorChange = (value: any, id: string) => {
        const field = { target: { id, value: striptags(value) } };

        this.setField(field);
    };

    renderDropdownOptions(options: any, id: string) {
        return Object.keys(options).map((value, index) => {
            return (
                <li
                    key={index}
                    onClick={() => {
                        this.setField({ target: { id, value } });
                        this.toggleDropdown(id);
                    }}
                >
                    {options[value].text}
                </li>
            );
        });
    }

    render() {
        const {
            config: { sizes, states },
        } = this.props;
        const { dropdown, errors, form } = this.state;

        return (
            <div className="acc_form_section">
                <h2>Company Info</h2>
                <form noValidate onSubmit={(event) => event.preventDefault()}>
                    <div className="acc_form_wrap acc_form_three_col">
                        <div className="acc_form_fields">
                            <div className={this.getGroupClass('name')}>
                                <label className="control-label" htmlFor="name">
                                    Company Name
                                </label>
                                <input id="name" className="form-control" type="text" value={form.name} onChange={this.setField} />
                                <span className="help-block">{errors.name}</span>
                            </div>
                        </div>
                        <div className="acc_form_fields">
                            <div className={this.getGroupClass('url')}>
                                <label className="control-label" htmlFor="url">
                                    Company URL
                                </label>
                                <input id="url" className="form-control" type="text" value={form.url} onChange={this.setField} />
                                <span className="help-block">{errors.url}</span>
                            </div>
                        </div>
                        <div className="acc_form_fields">
                            <div className={this.getGroupClass('founded')}>
                                <label className="control-label" htmlFor="founded">
                                    Year Founded
                                </label>
                                <input id="founded" className="form-control" type="text" value={form.founded} onChange={this.setField} />
                                <span className="help-block">{errors.founded}</span>
                            </div>
                        </div>
                    </div>
                    <div className="acc_form_wrap acc_form_three_col">
                        <div className="acc_form_fields">
                            <div className={this.getGroupClass('email')}>
                                <label className="control-label" htmlFor="email">
                                    Company Email
                                </label>
                                <input id="email" className="form-control" type="text" value={form.email} onChange={this.setField} />
                                <span className="help-block">{errors.email}</span>
                            </div>
                        </div>
                        <div className="acc_form_fields">
                            <div className="network_fields">
                                <label>Number of Employees</label>
                                <div className="btn-group gt_select">
                                    <button
                                        className="btn btn-default btn-lg dropdown-toggle"
                                        onClick={() => this.toggleDropdown('employeeSize')}
                                    >
                                        <span className="gt_selected">{sizes[form.employeeSize].text}</span>
                                        <span className="caret" />
                                    </button>
                                    <ul className="dropdown-menu" style={dropdown.employeeSize}>
                                        {this.renderDropdownOptions(sizes, 'employeeSize')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="acc_form_fields">
                            <div className={this.getGroupClass('contactUsUrl')}>
                                <label className="control-label" htmlFor="url">
                                    Contact Us URL
                                </label>
                                <input
                                    id="contactUsUrl"
                                    className="form-control"
                                    type="text"
                                    value={form.contactUsUrl}
                                    onChange={this.setField}
                                />
                                <span className="help-block">{errors.contactUsUrl}</span>
                            </div>
                        </div>
                    </div>
                    <div className="acc_form_wrap acc_form_three_col">
                        <div className="acc_form_fields">
                            <div className={this.getGroupClass('city')}>
                                <label className="control-label" htmlFor="city">
                                    City
                                </label>
                                <input id="city" className="form-control" type="text" value={form.city} onChange={this.setField} />
                                <span className="help-block">{errors.city}</span>
                            </div>
                        </div>
                        <div className="acc_form_fields">
                            <div className="network_fields">
                                <label>State</label>
                                <div className="btn-group gt_select">
                                    <button className="btn btn-default btn-lg dropdown-toggle" onClick={() => this.toggleDropdown('state')}>
                                        <span className="gt_selected">{form.state}</span>
                                        <span className="caret" />
                                    </button>
                                    <ul className="dropdown-menu" style={dropdown.state}>
                                        {this.renderDropdownOptions(states, 'state')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="acc_form_fields" />
                    </div>
                    <div className="acc_form_wrap">
                        <div className="acc_form_fields full">
                            <div className={this.getGroupClass('description')}>
                                <label className="control-label" htmlFor="description">
                                    Company Description
                                </label>
                                <textarea id="description" className="form-control" value={form.description} onChange={this.setField} />
                                <span className="help-block">{errors.description}</span>
                            </div>
                        </div>
                    </div>
                    <div className="acc_form_wrap">
                        <div className="acc_form_fields full">
                            <div className={this.getGroupClass('why')}>
                                <SimpleMDE
                                    className={''}
                                    label="Why Work With Us"
                                    value={this.state.form.why}
                                    onChange={(value) => this.onEditorChange(value, 'why')}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="acc_form_wrap">
                        <div className="acc_form_fields full">
                            <div className={this.getGroupClass('culture')}>
                                <SimpleMDE
                                    className={''}
                                    label="Culture"
                                    value={this.state.form.culture}
                                    onChange={(value) => this.onEditorChange(value, 'culture')}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="acc_form_wrap">
                        <div className="acc_form_fields full">
                            <div className={this.getGroupClass('benefits')}>
                                <SimpleMDE
                                    className={''}
                                    label="Perks & Benefits"
                                    value={this.state.form.benefits}
                                    onChange={(value) => this.onEditorChange(value, 'benefits')}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        actions: {
            company: state.company.actions,
        },
        company: state.company.data,
        config: state.config.data,
    };
};

export default connect(mapStateToProps, null)(CompanyForm);
