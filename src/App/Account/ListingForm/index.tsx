import React from 'react';
import { connect } from 'react-redux';

interface IProps {
    actions: any;
    onRef: any;
    company: any;
}

interface IState {
    form: any;
    errors: any;
}

class ListingForm extends React.Component<IProps, IState> {
    updateTimeout: any;

    constructor(props: IProps) {
        super(props);

        this.state = {
            form: {
                fulltime: true,
                parttime: false,
                internship: false,
                jobsiteUrl: '',
            },
            errors: {},
        };
    }

    componentDidMount() {
        this.props.onRef(this);
        this.setData(this.props);
    }

    componentWillReceiveProps(nextProps: IProps) {
        if (nextProps.company && nextProps.company !== this.props.company) {
            this.setData(nextProps);
        }
    }

    getFormData = () => {
        return this.state.form;
    };

    setData = ({ company }: any) => {
        if (company) {
            this.setState({
                form: {
                    hiring: company.hiring || false,
                    fulltime: company.fulltime || false,
                    parttime: company.parttime || false,
                    internship: company.internship || false,
                    jobsiteUrl: company.jobsiteUrl || '',
                },
            });
        }
    };

    setField = (event: any) => {
        const { id, value } = event.target;
        const form = {
            ...this.state.form,
            [id]: value,
        };

        if (id === 'hiring' && !value) {
            form['fulltime'] = false;
            form['parttime'] = false;
            form['internship'] = false;
        } else if ((id === 'fulltime' || id === 'parttime' || id === 'internship') && value) {
            form['hiring'] = true;
        }

        this.setState({ form, errors: false }, () => {
            if (this.updateTimeout) {
                clearTimeout(this.updateTimeout);
            }
            this.updateTimeout = setTimeout(() => this.update({ id, value }), 2000);
        });
    };

    setChecked = ({ target: { id, value } }: any) => {
        this.setField({ target: { id, value: !this.state.form[id] } });
    };

    update = (field: any) => {
        const { actions, company } = this.props;
        const { id, value } = field;

        if (value !== company[id]) {
            actions.company.update(this.state.form);
        }
    };

    getGroupClass = (field: string) => {
        const { errors } = this.state;

        return errors[field] ? 'network_fields form-group has-error' : 'network_fields form-group';
    };

    render() {
        const { form } = this.state;

        return (
            <div className="acc_form_section">
                <h2>Company Job Listings</h2>
                <form noValidate onSubmit={(event) => event.preventDefault()}>
                    <div className="acc_form_wrap">
                        <div className="acc_form_fields">
                            <div className="type_wrap">
                                <h3 className="form_subtitle">Hiring Status</h3>
                                <div className="gt_checkbox">
                                    <input id="fulltime" type="checkbox" checked={form.fulltime} onChange={this.setChecked} />
                                    <label htmlFor="fulltime">Full Time</label>
                                </div>
                                <div className="gt_checkbox">
                                    <input id="parttime" type="checkbox" checked={form.parttime} onChange={this.setChecked} />
                                    <label htmlFor="parttime">Part Time</label>
                                </div>
                                <div className="gt_checkbox">
                                    <input id="internship" type="checkbox" checked={form.internship} onChange={this.setChecked} />
                                    <label htmlFor="internship">Internships</label>
                                </div>
                                <div className="gt_checkbox">
                                    <input id="hiring" type="checkbox" checked={!form.hiring} onChange={this.setChecked} />
                                    <label htmlFor="hiring">Not Hiring</label>
                                </div>
                            </div>
                        </div>
                        <div className="acc_form_fields">
                            <div className={this.getGroupClass('jobsiteUrl')}>
                                <label>Job Site URL</label>
                                <input id="jobsiteUrl" type="text" value={form.jobsiteUrl} onChange={this.setField} />
                                <span className="help-block" />
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
)(ListingForm);
