import React from 'react';
import { connect } from 'react-redux';

interface IProps {
    actions: any;
    company: any;
    onRef: any;
}

interface IState {
    form: any;
    status: any;
    errors: boolean;
}

class StatusForm extends React.Component<IProps, IState> {
    updateTimeout: any;

    constructor(props: IProps) {
        super(props);

        this.state = {
            form: {
                active: false,
            },
            status: {},
            errors: false,
        };
    }

    componentDidMount() {
        const { actions, company, onRef } = this.props;

        onRef(this);

        if (company && company.active && Object.keys(company.mediaFiles).length !== 4) {
            actions.company.update({ active: false });
        } else {
            this.setData(this.props);
        }
    }

    componentWillReceiveProps(nextProps: IProps) {
        if (nextProps.company !== null) {
            if (nextProps.company && nextProps.company !== this.props.company) {
                this.setData(nextProps);
            }
        }
    }

    setData = ({ company }: any) => {
        const status = {
            success: false,
            warning: false,
        };

        if (company && company.mediaFiles) {
            if (
                company.mediaFiles.heroImg &&
                company.mediaFiles.listingsImg &&
                company.mediaFiles.featuredImg &&
                company.mediaFiles.companyImg
            ) {
                status.success = company.active ? false : true;
            } else {
                status.warning = true;
            }

            this.setState({
                form: {
                    active: company.active || false,
                },
                status,
            });
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

    setChecked = (id: string, value: boolean) => {
        const {
            company: { mediaFiles = {} },
        } = this.props;

        if (mediaFiles.heroImg && mediaFiles.listingsImg && mediaFiles.featuredImg && mediaFiles.companyImg) {
            this.setField({ target: { id, value } });
        }
    };

    update = (field: any) => {
        const { actions, company } = this.props;
        const { id, value } = field;

        if (value !== company[id]) {
            actions.company.update(this.state.form);
        }
    };

    renderMessage = () => {
        const { company } = this.props;
        const { status } = this.state;
        const heroLink =
            company && company.mediaFiles && company.mediaFiles.heroImg ? (
                ''
            ) : (
                <a href="/account#media" className="alert-link">
                    <p>Hero Graphic</p>
                </a>
            );
        const listingsLink =
            company && company.mediaFiles && company.mediaFiles.listingsImg ? (
                ''
            ) : (
                <a href="/account#media" className="alert-link">
                    <p>Listings Graphic</p>
                </a>
            );
        const featuredLink =
            company && company.mediaFiles && company.mediaFiles.featuredImg ? (
                ''
            ) : (
                <a href="/account#media" className="alert-link">
                    <p>Featured Graphic</p>
                </a>
            );
        const companyLink =
            company && company.mediaFiles && company.mediaFiles.companyImg ? (
                ''
            ) : (
                <a href="/account#media" className="alert-link">
                    <p>Company Graphic</p>
                </a>
            );
        const finalApprovalMessage = () => {
            if (company && company.isApproved) {
                return <strong>All required fields are updated, you can now activate your account.</strong>;
            } else {
                return <strong>All required fields are updated, please wait for your account to be approved.</strong>;
            }
        };

        const isApproved = () => {
            if (company && company.isApproved) {
                return (
                    <div className="alert alert-success" role="alert">
                        <strong>Your company has been approved.</strong>
                    </div>
                );
            } else {
                return (
                    <div className="alert alert-info" role="alert">
                        <strong>Your company has been submitted for approval.</strong>
                        <p>
                            A growTECH administrator will contact you within 2 days to confirm your approval. <br /> If you have questions
                            please contact{' '}
                            <a href="mailto:wendy@chicostart.com" target="_blank" rel="noopener noreferrer">
                                wendy@chicostart.com
                            </a>
                            .
                        </p>
                    </div>
                );
            }
        };

        if (status.warning) {
            return (
                <div className="acc_form_fields">
                    {isApproved()}
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
                        {finalApprovalMessage()}
                    </div>
                    {isApproved()}
                </div>
            );
        }
    };

    render() {
        const { form } = this.state;

        return (
            <div className="acc_form_section">
                <h2>Company Status</h2>
                <form noValidate onSubmit={(event) => event.preventDefault()}>
                    <div className="cmp_job_wrap">
                        {this.renderMessage()}
                        <div className="switch_wrap">
                            <span>Active</span>
                            <label className="switch">
                                <input
                                    id="active"
                                    type="checkbox"
                                    checked={form.active}
                                    value={form.active}
                                    onChange={() => this.setChecked('active', !form.active)}
                                />
                                <div className="slider round" />
                            </label>
                            <span>Inactive</span>
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
    };
};

export default connect(
    mapStateToProps,
    null
)(StatusForm);
