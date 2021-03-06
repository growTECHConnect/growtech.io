import React from 'react';
import { connect } from 'react-redux';

interface IProps {
    account: any;
    actions: any;
    onRef: any;
}

interface IState {
    form: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    };
    errors: boolean | any;
}

class AccountForm extends React.Component<IProps, IState> {
    updateTimeout!: NodeJS.Timeout;

    constructor(props: IProps) {
        super(props);

        this.state = {
            form: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
            },
            errors: false,
        };
    }

    componentDidMount() {
        this.props.onRef(this);
        this.setData(this.props);
    }

    componentWillReceiveProps(nextProps: IProps) {
        if (nextProps.account && nextProps.account !== this.props.account) {
            this.setData(nextProps);
        }
    }

    getFormData = () => {
        return this.state.form;
    };

    setData = ({ account }: any) => {
        if (account) {
            this.setState({
                form: {
                    firstName: account.firstName || '',
                    lastName: account.lastName || '',
                    email: account.email || '',
                    phone: account.phone || '',
                },
            });
        }
    };

    update = (field: any) => {
        const { actions, account } = this.props;
        const { id, value } = field;

        if (value !== account[id]) {
            actions.account.update(this.state.form);
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
        const { errors } = this.state;

        return (
            <div className="acc_form_section">
                <h2>Account Info</h2>
                <form noValidate onSubmit={(event) => event.preventDefault()}>
                    <div className="acc_form_wrap">
                        <div className="acc_form_fields">
                            <div className={this.getGroupClass('firstName')}>
                                <label className="control-label" htmlFor="firstName">
                                    First Name
                                </label>
                                <input
                                    id="firstName"
                                    className="form-control"
                                    type="text"
                                    value={this.state.form.firstName}
                                    onChange={this.setField}
                                />
                                <span className="help-block">{errors.firstName}</span>
                            </div>
                        </div>
                        <div className="acc_form_fields">
                            <div className={this.getGroupClass('lastName')}>
                                <label className="control-label" htmlFor="lastName">
                                    Last Name
                                </label>
                                <input
                                    id="lastName"
                                    className="form-control"
                                    type="text"
                                    value={this.state.form.lastName}
                                    onChange={this.setField}
                                />
                                <span className="help-block">{errors.lastName}</span>
                            </div>
                        </div>
                    </div>
                    <div className="acc_form_wrap">
                        <div className="acc_form_fields">
                            <div className={this.getGroupClass('email')}>
                                <label className="control-label" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    className="form-control"
                                    type="text"
                                    value={this.state.form.email}
                                    onChange={this.setField}
                                />
                                <span className="help-block">{errors.email}</span>
                            </div>
                        </div>
                        <div className="acc_form_fields">
                            <div className={this.getGroupClass('phone')}>
                                <label className="control-label" htmlFor="phone">
                                    Phone
                                </label>
                                <input
                                    id="phone"
                                    className="form-control"
                                    type="text"
                                    value={this.state.form.phone}
                                    onChange={this.setField}
                                />
                                <span className="help-block">{errors.phone}</span>
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
            account: state.account.actions,
        },
        account: state.account.data,
    };
};

export default connect(
    mapStateToProps,
    null
)(AccountForm);
