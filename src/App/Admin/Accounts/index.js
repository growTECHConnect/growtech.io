import React from 'react';
import { connect } from 'react-redux'
import '../styles.css';

class Accounts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            accounts: props.accounts,
            dropdowns: {},
            edit: {},
            form: {},
            errors: {},
        }
    }

    componentWillMount() {
        const {getAccounts} = this.props.actions.admin;

        getAccounts();
    }

    componentWillReceiveProps(nextProps) {
        const {accounts} = nextProps;
        this.setState({accounts});
    }

    toggleDropDown = (dropdown) => {
        this.setState({dropdowns: {[dropdown]: !this.state.dropdowns[dropdown]}});
    };

    onNew = () => {
        this.setState({
            form: {new: {}},
            new: !this.state.new,
        })
    };

    onEdit = (uid) => {
        const account = this.state.accounts[uid];
        const edit = !this.state.edit[uid];
        const form = {[uid]: {}};

        if (edit) {
            form[uid].firstName = account.firstName ? account.firstName : '';
            form[uid].lastName = account.lastName ? account.lastName : '';
        }

        this.setState({edit: {[uid]: edit}, form});
    };

    setCompany = (uid, company) => {
        this.setState({
            dropdowns: {[`company${uid}`]: false},
            errors: {
                ...this.state.errors,
                company: null,
            },
            form: {
                [uid]: {
                    ...this.state.form[uid],
                    company,
                }
            },
        });
    };

    setRole = (uid, role) => {
        this.setState({
            dropdowns: {[`role${uid}`]: false},
            errors: {
                ...this.state.errors,
                role: null,
            },
            form: {
                [uid]: {
                    ...this.state.form[uid],
                    role,
                }
            },
        });
    };

    setField = (uid, {target: {id, value}}) => {
        this.setState({
            errors: {
                ...this.state.errors,
                [id]: null,
            },
            form: {
                [uid]: {
                    ...this.state.form[uid],
                    [id]: value,
                },
            },
        });
    };

    updateStatus = (uid) => {
        const {updateAccount} = this.props.actions.admin;

        updateAccount(uid, {
            user: {
                disabled: !this.state.accounts[uid].disabled,
            },
        });
    };

    updateAccount = (uid) => {
        const {updateAccount} = this.props.actions.admin;
        const {form} = this.state;

        updateAccount(uid, {
            access: {
                company: form[uid].company,
                role: form[uid].role,
            },
            account: {
                firstName: form[uid].firstName,
                lastName: form[uid].lastName,
            },
        })
            .then(() => this.setState({edit: {}}));
    };

    addAccount = () => {
        const {addAccount} = this.props.actions.admin;
        const form = this.state.form.new;

        addAccount(form)
            .then(() => this.setState({
                form: {new: {}},
                new: false,
            }))
            .catch((errors) => this.setState({errors}));
    };

    renderCompanyDropdown = (uid) => {
        const {companies} = this.props;

        return Object.keys(companies).map((key, index) => {
            return (
               <li key={index} onClick={() => this.setCompany(uid, key)}><a>{companies[key].name}</a></li>
           );
        });
    };

    renderAccounts = () => {
        const {accounts} = this.state;
        const {companies} = this.props;

        return Object.keys(accounts).map((uid, index) => {
            const account = accounts[uid];
            const accountClass= this.state.edit[uid] ? 'account-row edit' : 'account-row';
            const editClass= this.state.edit[uid] ? 'edit-row edit' : 'edit-row';
            const name = `${account.firstName ? account.firstName : ''} ${account.lastName ? account.lastName : ''}`.trim();
            const status = `${account.disabled ? 'disabled' : 'enabled'}`;
            const roleState = this.state.dropdowns[`role${uid}`] ? 'clicked' : '';
            const companyState = this.state.dropdowns[`company${uid}`] ? 'clicked' : '';
            const companyName = account.company && companies[account.company] ? companies[account.company].name : '';
            const form = {
                firstName: this.state.form[uid] ? this.state.form[uid].firstName : account.firstName || '',
                lastName: this.state.form[uid] ? this.state.form[uid].lastName : account.lastName || '',
                role: this.state.form[uid] && this.state.form[uid].role ? this.state.form[uid].role : account.role || 'edit',
                company: this.state.form[uid] && this.state.form[uid].company ? this.state.form[uid].company : account.company || null,
            };

            return (
                <tbody key={index}>
                    <tr className={accountClass}>
                        <td>{companyName}</td>
                        <td>{account.email}</td>
                        <td>{name}</td>
                        <td>{account.role}</td>
                        <td>{status}</td>
                        <td>
                            <button
                                className="btn btn-default btn-xs btn-spacer"
                                onClick={() => this.onEdit(uid)}
                            >{this.state.edit[uid] ? 'Cancel' : 'Edit'}</button>
                            <button onClick={() => this.updateStatus(uid)} className={`btn ${account.disabled ? 'btn-default' : 'btn-danger'} btn-xs btn-spacer`}>{account.disabled ? 'enable' : 'disable'}</button>
                        </td>
                    </tr>
                    <tr className={editClass}>
                        <td colSpan="6">
                            <form noValidate onSubmit={(event) => event.preventDefault()} className="form-horizontal">
                                <div className="form-group">
                                    <label htmlFor="firstName" className="col-sm-1 control-label">Company</label>
                                    <div className="col-sm-5">
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-default">{form.company && companies[form.company] ? companies[form.company].name : '[not defined]'}</button>
                                            <button onClick={() => this.toggleDropDown(`company${uid}`)} type="button" className={`btn btn-default dropdown-toggle ${companyState}`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span className="caret"></span>
                                                <span className="sr-only">Toggle Dropdown</span>
                                            </button>
                                            <ul className={`dropdown-menu ${companyState}`}>
                                                {this.renderCompanyDropdown(uid)}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="firstName" className="col-sm-1 control-label">Role</label>
                                    <div className="col-sm-5">
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-default">{form.role}</button>
                                            <button onClick={() => this.toggleDropDown(`role${uid}`)} type="button" className={`btn btn-default dropdown-toggle ${roleState}`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span className="caret"></span>
                                                <span className="sr-only">Toggle Dropdown</span>
                                            </button>
                                            <ul className={`dropdown-menu ${roleState}`}>
                                                <li onClick={() => this.setRole(uid, 'admin')}><a>admin</a></li>
                                                <li onClick={() => this.setRole(uid, 'edit')}><a>edit</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="firstName" className="col-sm-1 control-label">First Name</label>
                                    <div className="col-sm-5">
                                        <input type="text" className="form-control" id="firstName" value={form.firstName} onChange={(event) => this.setField(uid, event)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName" className="col-sm-1 control-label">Last Name</label>
                                    <div className="col-sm-5">
                                        <input type="text" className="form-control" id="lastName" value={form.lastName} onChange={(event) => this.setField(uid, event)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-offset-1 col-sm-5">
                                        <button onClick={() => this.updateAccount(uid)} className="btn btn-default">Save</button>
                                    </div>
                                </div>
                            </form>
                        </td>
                    </tr>
                </tbody>
            );
        });
    };

    render() {
        const {companies} = this.props;
        const {errors} = this.state;
        const companyState = this.state.dropdowns['company-new'] ? 'clicked' : '';
        const roleState = this.state.dropdowns['role-new'] ? 'clicked' : '';
        const newClass= this.state.new ? 'form-horizontal show' : 'form-horizontal';
        const form = {
            email: this.state.form.new && this.state.form.new.email ? this.state.form.new.email.toLowerCase() : '',
            firstName: this.state.form.new && this.state.form.new.firstName ? this.state.form.new.firstName : '',
            lastName: this.state.form.new && this.state.form.new.lastName ? this.state.form.new.lastName : '',
            role: this.state.form.new && this.state.form.new.role ? this.state.form.new.role : 'edit',
            company: this.state.form.new && this.state.form.new.company ? this.state.form.new.company : null,
        };

        return (
            <div className="section">
                <h2>Accounts</h2>
                <button onClick={() => this.onNew()} className="btn btn-default">{this.state.new ? 'Cancel New' : 'Add New'}</button>

                <div className="new">
                    <form noValidate onSubmit={(event) => event.preventDefault()} className={newClass}>
                        <div className={`form-group ${errors.company ? 'has-error' : ''}`}>
                            <label htmlFor="company" className="col-sm-1 control-label">Company</label>
                            <div className="col-sm-5">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-default">{form.company ? companies[form.company].name : '[not defined]'}</button>
                                    <button onClick={() => this.toggleDropDown('company-new')} type="button" className={`btn btn-default dropdown-toggle ${companyState}`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="caret"></span>
                                        <span className="sr-only">Toggle Dropdown</span>
                                    </button>
                                    <ul className={`dropdown-menu ${companyState}`}>
                                        {this.renderCompanyDropdown('new')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={`form-group ${errors.role ? 'has-error' : ''}`}>
                            <label htmlFor="role" className="col-sm-1 control-label">Role</label>
                            <div className="col-sm-5">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-default">{form.role}</button>
                                    <button onClick={() => this.toggleDropDown('role-new')} type="button" className={`btn btn-default dropdown-toggle ${roleState}`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="caret"></span>
                                        <span className="sr-only">Toggle Dropdown</span>
                                    </button>
                                    <ul className={`dropdown-menu ${roleState}`}>
                                        <li onClick={() => this.setRole('new', 'admin')}><a>admin</a></li>
                                        <li onClick={() => this.setRole('new', 'edit')}><a>edit</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={`form-group ${errors.firstName ? 'has-error' : ''}`}>
                            <label htmlFor="firstName" className="col-sm-1 control-label">First Name</label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" id="firstName" value={form.firstName} onChange={(event) => this.setField('new', event)}/>
                                <span className="help-block">{errors.firstName}</span>
                            </div>
                        </div>
                        <div className={`form-group ${errors.lastName ? 'has-error' : ''}`}>
                            <label htmlFor="lastName" className="col-sm-1 control-label">Last Name</label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" id="lastName" value={form.lastName} onChange={(event) => this.setField('new', event)}/>
                                <span className="help-block">{errors.lastName}</span>
                            </div>
                        </div>
                        <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                            <label htmlFor="email" className="col-sm-1 control-label">Email</label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" id="email" value={form.email} onChange={(event) => this.setField('new', event)}/>
                                <span className="help-block">{errors.email}</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-1 col-sm-5">
                                <button onClick={() => this.addAccount()} className="btn btn-default">Save</button>
                            </div>
                        </div>
                    </form>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th>company</th>
                            <th>
                                <button className="btn btn-sort">email</button>
                            </th>
                            <th>name</th>
                            <th>role</th>
                            <th>status</th>
                            <th></th>
                        </tr>
                    </thead>
                    {this.renderAccounts()}
                </table>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        actions: {
            admin: state.admin.actions,
        },
        accounts: state.admin.accounts || {},
        companies: state.companies.data || {},
    }
};

export default connect(mapStateToProps, null)(Accounts);
