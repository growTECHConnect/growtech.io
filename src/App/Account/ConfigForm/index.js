import React from 'react';
import {connect} from 'react-redux'

class ConfigForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                companyType: '',
                industryType: '',
            },
            dropdown: {
                companyType: null,
                industryType: null
            },
            errors: false,
        };
    }

    componentDidMount() {
        this.props.onRef(this);
        this.setData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.company && nextProps.company !== this.props.company) {
            this.setData(nextProps);
        }
    }

    getFormData = () => {
        return this.state.form;
    };

    setData = ({company}) => {
        if (company) {
            this.setState({
                form: {
                    companyType: company.companyType || '',
                    industryType: company.industryType || '',
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

    update = (field) => {
        const {actions, company} = this.props;
        const {id, value} = field;

        if (value !== company[id]) {
            actions.company.update(this.state.form);
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

    render() {
        const {dropdown, form} = this.state;
        const {types, industries} = this.props.config;
        const typeText = types[form.companyType] ? types[form.companyType].text : null;
        const industryText = industries[form.industryType] ? industries[form.industryType].text : null;
        //const remaining = 2 - form.industryType.length;

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
                                    <span className="gt_selected">{typeText}</span>
                                    <span className="caret"></span>
                                </button>
                                <ul className="dropdown-menu" style={dropdown.companyType}>
                                    {this.renderDropdownOptions(types, 'companyType')}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="acc_form_fields">
                        <div className="type_wrap">
                            <h3 className="form_subtitle">Industry</h3>
                            <div className="btn-group gt_select">
                                <button
                                    className="btn btn-default btn-lg dropdown-toggle"
                                    onClick={() => this.toggleDropdown('industryType')}
                                >
                                    <span className="gt_selected">{industryText}</span>
                                    <span className="caret"></span>
                                </button>
                                <ul className="dropdown-menu" style={dropdown.industryType}>
                                    {this.renderDropdownOptions(industries, 'industryType')}
                                </ul>
                            </div>
                        </div>
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
