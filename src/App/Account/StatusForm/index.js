import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class StatusForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                active: false,
            },
            status: {}
        };
    }

    componentDidMount() {
        const {form, status} = this.state;
        const {actions, company, onRef} = this.props;

        onRef(this);

        if (company && company.active && Object.keys(company.mediaFiles).length !== 4) {
            actions.company.update({active: false});
        } else {
            this.setData(this.props);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.company !== null) {
            if (nextProps.company && nextProps.company !== this.props.company) {
                this.setData(nextProps);
            }
        }
    }

    setData = ({company}) => {
        const {mediaFiles = {}} = company;
        const status = {};

        if (company) {
            if (mediaFiles.heroImg &&
                mediaFiles.listingsImg &&
                mediaFiles.featuredImg &&
                mediaFiles.companyImg) {

                status['success'] = company.active ? null : true;
            } else {
                status['warning'] = true;
            }

            this.setState({
                form: {
                    active: company.active || false,
                },
                status,
            });
        }
    };

    setField = ({target}) => {
        const {id, value} = target;

        this.setState({form: {...this.state.form, [id]: value}, errors: false}, () => {
            if (this.updateTimeout) {
                clearTimeout(this.updateTimeout);
            }
            this.updateTimeout = setTimeout(() => this.update({id, value}), 2000);
        });
    };

    setChecked = (id, value) => {
        const {company: {mediaFiles = {}}} = this.props;

        if (mediaFiles.heroImg &&
            mediaFiles.listingsImg &&
            mediaFiles.featuredImg &&
            mediaFiles.companyImg) {

            this.setField({target: {id, value}});
        }
    };

    update = (field) => {
        const {actions, company} = this.props;
        const {id, value} = field;

        if (value !== company[id]) {
            actions.company.update(this.state.form);
        }
    };

    renderMessage = () => {
        const {company, company: {mediaFiles = {}}} = this.props;
        const {status} = this.state;
        const heroLink = mediaFiles.heroImg ? '' : <a href="/account#media" className="alert-link"><p>Hero Graphic</p></a>;
        const listingsLink = mediaFiles.listingsImg ? '' : <a href="/account#media" className="alert-link"><p>Listings Graphic</p></a>;
        const featuredLink = mediaFiles.featuredImg ? '' : <a href="/account#media" className="alert-link"><p>Featured Graphic</p></a>;
        const companyLink = mediaFiles.companyImg ? '' : <a href="/account#media" className="alert-link"><p>Company Graphic</p></a>;

        if (status.warning) {
            return (
                <div className="acc_form_fields">
                    <div className="alert alert-warning" role="alert">
                        <strong>The company profile can not be set to active until the following fields are updated:</strong>
                        <p>&nbsp;</p>
                        {heroLink}
                        {listingsLink}
                        {featuredLink}
                        {companyLink}
                    </div>
                </div>
            );
        }

        if (status.success) {
            return (
                <div className="acc_form_fields">
                    <div className="alert alert-success" role="alert">
                        <strong>All required fields are updated, you can now activate your account.</strong>
                    </div>
                </div>
            );
        }
    };

    render() {
        const {form, status} = this.state;

        return (
            <div className="acc_form_section">
                <h2>Company Status</h2>
                <form noValidate onSubmit={(event) => event.preventDefault()}>
                    <div className="cmp_job_wrap">
                        {this.renderMessage()}
                        <div className="switch_wrap">
                            <span>Active</span>
                            <label className="switch">
                                <input id="active" type="checkbox" checked={form.active} value={form.active}
                                       onChange={() => this.setChecked('active', !form.active)}/>
                                <div className="slider round"></div>
                            </label>
                            <span>Inactive</span>
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
    }
};

export default connect(mapStateToProps, null)(StatusForm);
