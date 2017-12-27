import React from 'react';
import {connect} from 'react-redux'

class ListingForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                fulltime: true,
                parttime: false,
                internship: false,
                jobsiteUrl: '',
            },
            saveMsg: null,
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
                    fulltime: company.fulltime || false,
                    parttime: company.parttime || false,
                    internship: company.internship || false,
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

    setChecked = ({target: {id, value}}) => {
        this.setField({target: {id, value: !this.state.form[id]}});
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

    render() {
        const {form, saveMsg} = this.state;

        return (
            <div className="acc_form_section">
                <h2>Company Job Listings <span className="gt_save_msg">{saveMsg}</span></h2>
                <form noValidate onSubmit={(event) => event.preventDefault()}>
                    <div className="acc_form_wrap">
                        <div className="acc_form_fields">
                            <div className="type_wrap">
                                <h3 className="form_subtitle">Hiring For</h3>
                                <div className="gt_checkbox">
                                    <input id="fulltime"
                                           type="checkbox"
                                           checked={form.fulltime}
                                           onChange={this.setChecked}
                                    />
                                    <label htmlFor="fulltime">Full Time</label>
                                </div>
                                <div className="gt_checkbox">
                                    <input id="parttime"
                                           type="checkbox"
                                           checked={form.parttime}
                                           onChange={this.setChecked}
                                    />
                                    <label htmlFor="parttime">Part Time</label>
                                </div>
                                <div className="gt_checkbox">
                                    <input id="internship"
                                           type="checkbox"
                                           checked={form.internship}
                                           onChange={this.setChecked}
                                    />
                                    <label htmlFor="internship">Internships</label>
                                </div>
                            </div>
                        </div>
                        <div className="acc_form_fields">
                            <div className={this.getGroupClass('jobsiteUrl')}>
                                <label>Job Site URL</label>
                                <input id="jobsiteUrl" type="text" value={form.jobsiteUrl}
                                       onChange={this.setField}/>
                                <span className="help-block"></span>
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

export default connect(mapStateToProps, null)(ListingForm);
