import React from 'react';
import {connect} from 'react-redux'
import actions from '../../actions';

class ListingForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                hiring: false,
                jobsiteUrl: '',
                hours: 'full',
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

    setData = ({ company, initialized }) => {
        if (initialized.company && company) {
            this.setState({
                form: {
                    hiring: company.hiring || false,
                    jobsiteUrl: company.jobsiteUrl || '',
                    hours: company.hours || 'full',
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

    setChecked = (id, value) => {
        console.log(id, value);

        this.setField({ target: { id, value }});
    };

    updateCompany = (event) => {
        event.preventDefault();
        const { account: { group } } = this.props;
        actions.company.update(group, this.state.form);
    };

    cancel = () => {
        this.setData(this.props);
    };

    hasError = (field) => {
        const { errors } = this.state;
        return errors[field] ? 'has-error' : '';
    };

    render() {
        const { dropdown, errors, form } = this.state;

        return (
            <form noValidate onSubmit={(event) => event.preventDefault()}>
                <div className="cmp_job_wrap">
                    <div className="switch_wrap col-sm-3">
                        <span>Hiring</span>
                        <label className="switch">
                            <input id="hiring" type="checkbox" checked={form.hiring} value={form.hiring} onChange={() => this.setChecked('hiring', !form.hiring)}/>
                            <div className="slider round"></div>
                        </label>
                        <span>Not Hiring</span>
                    </div>
                    <div className="col-sm-5 cmp_field_wrap">
                        <div className="acc_form_wrap">
                            <div className="acc_form_fields">
                                <div className="network_fields">
                                    <label>Job Site URL</label>
                                    <input id="jobsiteUrl" type="text" value={form.jobsiteUrl} onChange={this.setField}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 cmp_btns_wrap">
                        <div className="acc_form_fields acc_form_btns">
                            <button onClick={this.cancel}>Cancel</button>
                            <button onClick={this.updateCompany}>Save</button>
                        </div>
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

export default connect(mapStateToProps, null)(ListingForm);
