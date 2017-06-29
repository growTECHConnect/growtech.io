import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import actions from '../actions';
import Header from '../Header';
import Footer from '../Footer';
import Network from '../Network';

class MyAccount extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            old: '',
            password: '',
            confirm: '',
            errors: false,
        };
    }

    componentWillMount() {
       this.setData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.account && nextProps.account !== this.props.account) {
            this.setData(nextProps);
        }
    }

    setData = ({ account, initialized }) => {
        if (initialized.account && account) {
            this.setState({
                firstName: account.firstName || '',
                lastName: account.lastName || '',
                email: account.email || '',
                phone: account.phone || '',
            });
        }
    };

    setFirstName = (event) => {
        this.setState({ firstName: event.target.value, errors: false });
    };

    setLastName = (event) => {
        this.setState({ lastName: event.target.value, errors: false });
    };

    setEmail = (event) => {
        this.setState({ email: event.target.value, errors: false });
    };

    setPhone = (event) => {
        this.setState({ phone: event.target.value, errors: false });
    };

    updateAccount = (event) => {
        event.preventDefault();
        const { user: { uid } } = this.props;
        actions.account.update(uid, this.state);
    };

    cancel = (event) => {
        event.preventDefault();
        this.setData(this.props);
    };

    render() {
        const { company, initialized, user } = this.props;
        const { errors } = this.state;
        const firstNameGroupClass = `network_fields form-group ${errors.firstName ? 'has-error' : ''}`;
        const lastNameGroupClass = `network_fields form-group ${errors.lastName ? 'has-error' : ''}`;
        const emailGroupClass = `network_fields form-group ${errors.email ? 'has-error' : ''}`;
        const phoneGroupClass = `network_fields form-group ${errors.phone ? 'has-error' : ''}`;
        const featStyle = { backgroundImage: 'url("images/feat_img.jpg")' };

        if (!user) {
            return  <Redirect to="/"/>;
        }

        if (!initialized.account || !initialized.company || !initialized.user) {
            return <div></div>;
        }

        return (
            <div>
                <Header user={user}/>
                <section className="my_account">
                    <div className="container account_container">
                        <div className="account_left">
                            <h4>my company</h4>
                            <div className="featured_three">
                                <div className="feat_box">
                                    <div className="feat_wrap">
                                        <div className="feat_img" style={featStyle}></div>
                                        <Link to="/my-company" className="feat_info">
                                            <h2>{company.type}</h2>
                                            <h2 className="acc_edit">Edit</h2>
                                            <h3>{company.name}</h3>
                                            <p>Manage all aspects of your listing by clicking the link below!</p>
                                            <span>manage your listing<br/><i><img src="/images/learn_more.png"/></i></span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="account_right">
                            <div className="acc_form_section">
                                <h2>Contact Info</h2>
                                <form noValidate onSubmit={(event) => event.preventDefault()}>
                                    <div className="acc_form_wrap">
                                        <div className="acc_form_fields">
                                            <div className={firstNameGroupClass}>
                                                <label className="control-label" htmlFor="firstName">First Name</label>
                                                <input id="firstName" className="form-control" type="text" value={this.state.firstName} onChange={this.setFirstName}/>
                                                <span className="help-block">{errors.firstName}</span>
                                            </div>
                                        </div>
                                        <div className="acc_form_fields">
                                            <div className={lastNameGroupClass}>
                                                <label className="control-label" htmlFor="lastName">Last Name</label>
                                                <input id="lastName" className="form-control" type="text" value={this.state.lastName} onChange={this.setLastName}/>
                                                <span className="help-block">{errors.lastName}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="acc_form_wrap">
                                        <div className="acc_form_fields">
                                            <div className={emailGroupClass}>
                                                <label className="control-label" htmlFor="email">Email</label>
                                                <input id="email" className="form-control" type="text" value={this.state.email} onChange={this.setEmail}/>
                                                <span className="help-block">{errors.email}</span>
                                            </div>
                                        </div>
                                        <div className="acc_form_fields">
                                            <div className={phoneGroupClass}>
                                                <label className="control-label" htmlFor="phone">Phone</label>
                                                <input id="phone" className="form-control" type="text" value={this.state.phone} onChange={this.setPhone}/>
                                                <span className="help-block">{errors.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="acc_form_wrap">
                                        <div className="acc_form_fields acc_form_btns">
                                            <button onClick={this.cancel}>Cancel</button>
                                            <button onClick={this.updateAccount}>Save</button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/*<div className="acc_form_section">*/}
                                {/*<h2>password info</h2>*/}
                                {/*<form noValidate>*/}
                                    {/*<div className="acc_form_wrap">*/}
                                        {/*<div className="acc_form_fields">*/}
                                            {/*<div className={oldPasswordGroupClass}>*/}
                                                {/*<label className="control-label" htmlFor="old">Old Password</label>*/}
                                                {/*<input id="oldPassword" className="form-control" type="password" value={this.state.oldPassword} onChange={this.setOldPassword}/>*/}
                                                {/*<span className="help-block">{errors.oldPassword}</span>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="acc_form_wrap">*/}
                                        {/*<div className="acc_form_fields">*/}
                                            {/*<div className={newPasswordGroupClass}>*/}
                                                {/*<label className="control-label" htmlFor="old">New Password</label>*/}
                                                {/*<input id="newPassword" className="form-control" type="password" value={this.state.newPassword} onChange={this.setNewPassword}/>*/}
                                                {/*<span className="help-block">{errors.newPassword}</span>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="acc_form_wrap">*/}
                                        {/*<div className="acc_form_fields">*/}
                                            {/*<div className={confirmGroupClass}>*/}
                                                {/*<label className="control-label" htmlFor="old">New Password - Again</label>*/}
                                                {/*<input id="confirm" className="form-control" type="password" value={this.state.confirm} onChange={this.setConfirm}/>*/}
                                                {/*<span className="help-block">{errors.confirm}</span>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="acc_form_wrap">*/}
                                        {/*<div className="acc_form_fields acc_form_btns">*/}
                                            {/*<button onClick={this.cancel}>Cancel</button>*/}
                                            {/*<button onClick={this.updatePassword}>Save</button>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                {/*</form>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </section>
                <Network/>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account,
        company: state.company,
        error: state.error,
        initialized: state.initialized,
        user: state.user,
    }
};

export default connect(mapStateToProps, null)(MyAccount);