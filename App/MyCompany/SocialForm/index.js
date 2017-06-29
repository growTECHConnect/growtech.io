import React from 'react';
import {connect} from 'react-redux'
import actions from '../../actions';

class SocialForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                facebookUrl: '',
                linkedinUrl: '',
                twitterUrl: '',
                instagramUrl: '',
                youtubeUrl: '',
            },
            errors: false,
            dropdown: {
                employees: null,
            }
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
                    facebookUrl: company.facebookUrl || '',
                    linkedinUrl: company.linkedinUrl || '',
                    twitterUrl: company.twitterUrl || '',
                    instagramUrl: company.instagramUrl || '',
                    youtubeUrl: company.youtubeUrl || '',
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

    updateCompany = (event) => {
        event.preventDefault();
        const { account: { group } } = this.props;
        actions.company.update(group, this.state.form);
    };

    cancel = (event) => {
        event.preventDefault();
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
                <div className="acc_form_wrap acc_form_two_col">
                    <div className="acc_form_fields">
                        <div className={`network_fields form-group ${this.hasError('facebookUrl')}`}>
                            <label className="control-label" htmlFor="facebookUrl">Facebook URL</label>
                            <input id="facebookUrl" className="form-control" type="text" value={form.facebookUrl} onChange={this.setField}/>
                            <span className="help-block">{errors.facebookUrl}</span>
                        </div>
                    </div>
                    <div className="acc_form_fields">
                        <div className={`network_fields form-group ${this.hasError('linkedinUrl')}`}>
                            <label className="control-label" htmlFor="linkedinUrl">Linkedin URL</label>
                            <input id="linkedinUrl" className="form-control" type="text" value={form.linkedinUrl} onChange={this.setField}/>
                            <span className="help-block">{errors.linkedinUrl}</span>
                        </div>
                    </div>
                </div>
                <div className="acc_form_wrap acc_form_two_col">
                    <div className="acc_form_fields">
                        <div className={`network_fields form-group ${this.hasError('twitterUrl')}`}>
                            <label className="control-label" htmlFor="twitterUrl">Twitter URL</label>
                            <input id="twitterUrl" className="form-control" type="text" value={form.twitterUrl} onChange={this.setField}/>
                            <span className="help-block">{errors.twitterUrl}</span>
                        </div>
                    </div>
                    <div className="acc_form_fields">
                        <div className={`network_fields form-group ${this.hasError('instagramUrl')}`}>
                            <label className="control-label" htmlFor="instagramUrl">Instagram URL</label>
                            <input id="instagramUrl" className="form-control" type="text" value={form.instagramUrl} onChange={this.setField}/>
                            <span className="help-block">{errors.instagramUrl}</span>
                        </div>
                    </div>
                </div>
                <div className="acc_form_wrap acc_form_two_col">
                    <div className="acc_form_fields">
                        <div className={`network_fields form-group ${this.hasError('youtubeUrl')}`}>
                            <label className="control-label" htmlFor="youtubeUrl">YouTube URL</label>
                            <input id="youtubeUrl" className="form-control" type="text" value={form.youtubeUrl} onChange={this.setField}/>
                            <span className="help-block">{errors.youtubeUrl}</span>
                        </div>
                    </div>
                </div>
                <div className="acc_form_wrap">
                    <div className="acc_form_fields acc_form_btns">
                        <button onClick={this.cancel}>Cancel</button>
                        <button onClick={this.updateCompany}>Save</button>
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

export default connect(mapStateToProps, null)(SocialForm);
