import React from 'react';
import { connect } from 'react-redux';
import ReactMde, { commands } from 'react-mde';
import striptags from 'striptags';
import 'react-mde/lib/styles/css/react-mde-all.css';

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
    benefits: { text: string; selection: any };
    culture: { text: string; selection: any };
    why: { text: string; selection: any };
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
            benefits: { text: '', selection: null },
            culture: { text: '', selection: null },
            why: { text: '', selection: null },
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
            benefits: this.state.benefits.text,
            culture: this.state.culture.text,
            why: this.state.why.text,
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
                benefits: {
                    ...this.state.benefits,
                    text: company.benefits,
                },
                culture: {
                    ...this.state.culture,
                    text: company.culture,
                },
                why: {
                    ...this.state.why,
                    text: company.why,
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
        // event.preventDefault();
        this.setState({
            dropdown: {
                ...this.state.dropdown,
                [field]: this.state.dropdown[field] ? null : { display: 'block' },
            },
        });
    };

    onEditorChange = (value: any, id: string) => {
        value.text = striptags(value.text);

        this.setState({ [id]: value }, () => {
            this.setField({ target: { id, value: value.text } });
        });
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
        const listCommands = [
            { commands: [commands.headerCommand, commands.boldCommand, commands.italicCommand] },
            { commands: [commands.linkCommand, commands.quoteCommand] },
            { commands: [commands.orderedListCommand, commands.unorderedListCommand] },
        ];

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
                                <label className="control-label" htmlFor="why">
                                    Why Work With Us
                                </label>
                                <ReactMde
                                    textAreaProps={{ id: 'why_mde' }}
                                    value={this.state.why.text}
                                    onChange={(value) => this.onEditorChange(value, 'why')}
                                    commands={listCommands}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="acc_form_wrap">
                        <div className="acc_form_fields full">
                            <div className={this.getGroupClass('culture')}>
                                <label className="control-label" htmlFor="culture">
                                    Culture
                                </label>
                                <ReactMde
                                    textAreaProps={{ id: 'culture_mde' }}
                                    value={this.state.culture.text}
                                    onChange={(value) => this.onEditorChange(value, 'culture')}
                                    commands={listCommands}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="acc_form_wrap">
                        <div className="acc_form_fields full">
                            <div className={this.getGroupClass('benefits')}>
                                <label className="control-label" htmlFor="benefits">
                                    Perks &amp; Benefits
                                </label>
                                <ReactMde
                                    textAreaProps={{ id: 'benefits_mde' }}
                                    value={this.state.benefits.text}
                                    onChange={(value) => this.onEditorChange(value, 'benefits')}
                                    commands={listCommands}
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

export default connect(
    mapStateToProps,
    null
)(CompanyForm);
