import React from 'react';
import { connect } from 'react-redux';

interface IProps {
    actions: any;
    company: any;
    onRef: any;
}

interface IState {
    form: any;
    errors: any;
}

class SocialForm extends React.Component<IProps, IState> {
    updateTimeout: any;

    constructor(props: IProps) {
        super(props);

        this.state = {
            form: {
                facebookUrl: '',
                linkedinUrl: '',
                twitterUrl: '',
                instagramUrl: '',
                youtubeUrl: '',
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
                    facebookUrl: company.facebookUrl || '',
                    linkedinUrl: company.linkedinUrl || '',
                    twitterUrl: company.twitterUrl || '',
                    instagramUrl: company.instagramUrl || '',
                    youtubeUrl: company.youtubeUrl || '',
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

    setField = (event: any) => {
        const { id, value } = event.target;
        this.setState({ form: { ...this.state.form, [id]: value }, errors: false }, () => {
            if (this.updateTimeout) {
                clearTimeout(this.updateTimeout);
            }
            this.updateTimeout = setTimeout(() => this.update({ id, value }), 2000);
        });
    };

    getGroupClass = (field: string) => {
        const { errors } = this.state;

        return errors[field] ? 'network_fields form-group has-error' : 'network_fields form-group';
    };

    render() {
        const { errors, form } = this.state;

        return (
            <div className="acc_form_section">
                <h2>Company Social</h2>
                <form noValidate onSubmit={(event) => event.preventDefault()}>
                    <div className="acc_form_wrap acc_form_two_col">
                        <div className="acc_form_fields">
                            <div className={this.getGroupClass('facebookUrl')}>
                                <label className="control-label" htmlFor="facebookUrl">
                                    Facebook URL
                                </label>
                                <input
                                    id="facebookUrl"
                                    className="form-control"
                                    type="text"
                                    value={form.facebookUrl}
                                    onChange={this.setField}
                                />
                                <span className="help-block">{errors.facebookUrl}</span>
                            </div>
                        </div>
                        <div className="acc_form_fields">
                            <div className={this.getGroupClass('linkedinUrl')}>
                                <label className="control-label" htmlFor="linkedinUrl">
                                    Linkedin URL
                                </label>
                                <input
                                    id="linkedinUrl"
                                    className="form-control"
                                    type="text"
                                    value={form.linkedinUrl}
                                    onChange={this.setField}
                                />
                                <span className="help-block">{errors.linkedinUrl}</span>
                            </div>
                        </div>
                    </div>
                    <div className="acc_form_wrap acc_form_two_col">
                        <div className="acc_form_fields">
                            <div className={this.getGroupClass('twitterUrl')}>
                                <label className="control-label" htmlFor="twitterUrl">
                                    Twitter URL
                                </label>
                                <input
                                    id="twitterUrl"
                                    className="form-control"
                                    type="text"
                                    value={form.twitterUrl}
                                    onChange={this.setField}
                                />
                                <span className="help-block">{errors.twitterUrl}</span>
                            </div>
                        </div>
                        <div className="acc_form_fields">
                            <div className={this.getGroupClass('instagramUrl')}>
                                <label className="control-label" htmlFor="instagramUrl">
                                    Instagram URL
                                </label>
                                <input
                                    id="instagramUrl"
                                    className="form-control"
                                    type="text"
                                    value={form.instagramUrl}
                                    onChange={this.setField}
                                />
                                <span className="help-block">{errors.instagramUrl}</span>
                            </div>
                        </div>
                    </div>
                    <div className="acc_form_wrap acc_form_two_col">
                        <div className="acc_form_fields">
                            <div className={this.getGroupClass('youtubeUrl')}>
                                <label className="control-label" htmlFor="youtubeUrl">
                                    YouTube URL
                                </label>
                                <input
                                    id="youtubeUrl"
                                    className="form-control"
                                    type="text"
                                    value={form.youtubeUrl}
                                    onChange={this.setField}
                                />
                                <span className="help-block">{errors.youtubeUrl}</span>
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
    };
};

export default connect(
    mapStateToProps,
    null
)(SocialForm);
