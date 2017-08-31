import React from 'react';
import {connect} from 'react-redux'

class ListingForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                employmentType: '',
                hiring: false,
                jobsiteUrl: '',
            },
            dropdown: {
                employmentType: null,
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
                    employmentType: company.employmentType || '',
                    hiring: company.hiring || false,
                    jobsiteUrl: company.jobsiteUrl || '',
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

    setChecked = (id, value) => {
        this.setField({target: {id, value}});
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

    render() {
        const {dropdown, form} = this.state;
        const {employments} = this.props.config;
        const employmentTypeText = employments[form.employmentType] ? employments[form.employmentType].text : null;

        return (
            <div className="acc_form_section">
                <h2>Company Job Listings</h2>
                <form noValidate onSubmit={(event) => event.preventDefault()}>
                    <div className="acc_form_wrap">
                        <div className="acc_form_wrap acc_form_three_col">
                            <div className="acc_form_fields">
                                <div className={this.getGroupClass('jobsiteUrl')}>
                                    <label>Job Site URL</label>
                                    <input id="jobsiteUrl" type="text" value={form.jobsiteUrl}
                                           onChange={this.setField}/>
                                    <span className="help-block"></span>
                                </div>
                            </div>
                            <div className="acc_form_fields">
                                <div className={this.getGroupClass('employmentType')}>
                                    <label>Employment Type</label>
                                    <div className="btn-group gt_select">
                                        <button
                                            className="btn btn-default btn-lg dropdown-toggle"
                                            onClick={() => this.toggleDropdown('employmentType')}
                                        >
                                            <span className="gt_selected">{employmentTypeText}</span>
                                            <span className="caret"></span>
                                        </button>
                                        <ul className="dropdown-menu" style={dropdown.employmentType}>
                                            {this.renderDropdownOptions(employments, 'employmentType')}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cmp_job_wrap">
                        <div className="switch_wrap">
                            <span>Hiring</span>
                            <label className="switch">
                                <input id="hiring" type="checkbox" checked={form.hiring} value={form.hiring}
                                       onChange={() => this.setChecked('hiring', !form.hiring)}/>
                                <div className="slider round"></div>
                            </label>
                            <span>Not Hiring</span>
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

export default connect(mapStateToProps, null)(ListingForm);
