import React from 'react';
import { connect } from 'react-redux';
import { CircularProgress, Button, Grid, MenuItem, TextField, Paper } from '@material-ui/core';
import MaterialTable from 'material-table';
import { Formik, Form, FormikActions } from 'formik';
import * as yup from 'yup';
import '../styles.css';

interface IProps {
    accounts: any;
    actions: any;
    companies: any;
}

interface IState {
    loaded: boolean;
}

class Accounts extends React.Component<IProps, IState> {
    private validationSchema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        role: yup.string().required(),
        companyId: yup.string().required(),
    });

    constructor(props: IProps) {
        super(props);

        this.state = {
            loaded: false,
        };
    }

    componentDidMount() {
        const { getAccounts } = this.props.actions.admin;

        getAccounts().then(() => {
            this.setState({ loaded: true });
        });
    }

    render() {
        const { accounts, companies } = this.props;
        const { loaded } = this.state;
        const data = Object.keys(accounts)
            .filter((accountId: any) => {
                const account = accounts[accountId];

                return !!companies[account.company];
            })
            .map((accountId: any) => {
                const account = accounts[accountId];

                return {
                    ...account,
                    companyName: companies[account.company].name,
                    companyId: account.company,
                    isApproved: companies[account.company].isApproved,
                    name: `${account.firstName} ${account.lastName}`,
                    status: account.diabled ? 'disabled' : 'enabled',
                };
            });

        return (
            <div className="section" style={{ height: '100%', width: '100%', position: 'relative' }}>
                {!loaded && (
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <CircularProgress />
                    </div>
                )}
                <div style={{ opacity: loaded ? 1 : 0.3, width: '100%' }}>
                    <MaterialTable
                        options={{
                            actionsColumnIndex: -1,
                            paging: false,
                            showTitle: false,
                        }}
                        components={{
                            Container: (props) => <Paper {...props} elevation={0} style={{ width: '100%' }} />,
                        }}
                        columns={[
                            { title: 'Email', field: 'email' },
                            { title: 'Name', field: 'name' },
                            { title: 'Company', field: 'companyName' },
                            { title: 'Role', field: 'role' },
                            { title: 'Status', field: 'status' },
                            { render: this.renderRowActions, cellStyle: { whiteSpace: 'nowrap' } },
                        ]}
                        data={data}
                        detailPanel={this.renderDetailPanel}
                    />
                </div>
            </div>
        );
    }

    renderRowActions = (rowData: any) => {
        const { disabled, isApproved, uid } = rowData;

        return (
            <React.Fragment>
                <Button
                    variant="outlined"
                    className={`btn ${disabled ? 'btn-default' : 'btn-danger'} btn-xs btn-spacer`}
                    onClick={() => this.handleUpdateStatus(uid)}
                    style={{ marginRight: 8 }}
                >
                    {disabled ? 'Enable' : 'Disable'}
                </Button>
                <Button
                    variant="outlined"
                    className={`btn ${isApproved ? 'btn-danger' : 'btn-default'} btn-xs btn-spacer`}
                    onClick={() => this.handleUpdateApproval(uid)}
                >
                    {isApproved ? 'Unapprove' : 'Approve'}
                </Button>
            </React.Fragment>
        );
    };

    renderDetailPanel = (rowData: any) => {
        const companies = Object.keys(this.props.companies)
            .map((id) => {
                const company = this.props.companies[id];

                return { companyId: id, name: company.name };
            })
            .sort((companyA: any, companyB: any) => (companyA.name > companyB.name ? 1 : -1));

        return (
            <Formik initialValues={rowData} onSubmit={this.handleSubmit} validationSchema={this.validationSchema}>
                {({ errors, handleBlur, handleChange, touched, values, isSubmitting }) => (
                    <Form noValidate={true} style={{ padding: 24 }}>
                        <TextField
                            margin="normal"
                            label="First Name"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required={true}
                            error={!!errors.firstName && !!touched.firstName}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ marginRight: 16 }}
                        />
                        <TextField
                            margin="normal"
                            label="Last Name"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required={true}
                            error={!!errors.lastName && !!touched.lastName}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ marginRight: 16 }}
                        />
                        <TextField
                            name="companyId"
                            select={true}
                            label="Company"
                            value={values.companyId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            margin="normal"
                            style={{ marginRight: 16 }}
                        >
                            {companies.map((company, index) => {
                                const { companyId, name } = company;
                                return (
                                    <MenuItem key={index} value={companyId}>
                                        {name}
                                    </MenuItem>
                                );
                            })}
                        </TextField>
                        <TextField name="role" select={true} label="Role" value={values.role} onChange={handleChange} margin="normal">
                            {['admin', 'edit'].map((role, index) => {
                                return (
                                    <MenuItem key={index} value={role}>
                                        {role}
                                    </MenuItem>
                                );
                            })}
                        </TextField>
                        <Grid container={true} item={true} xs={12} style={{ paddingTop: 24 }}>
                            <Button disabled={isSubmitting} type="submit" className="btn btn-default">
                                Save
                                {isSubmitting && <CircularProgress style={{ width: 20, height: 20, position: 'absolute' }} />}
                            </Button>
                        </Grid>
                    </Form>
                )}
            </Formik>
        );
    };

    handleUpdateApproval = (uid: string) => {
        const { updateCompanyApproval } = this.props.actions.admin;
        const { companies } = this.props;
        const account = this.props.accounts[uid];

        if (account.company) {
            const companyID = account.company;
            const company = companies[companyID];

            updateCompanyApproval(companyID, !company.isApproved);
        }
    };

    handleUpdateStatus = (uid: string) => {
        const { updateAccount } = this.props.actions.admin;

        updateAccount(uid, {
            user: {
                disabled: !this.props.accounts[uid].disabled,
            },
        });
    };

    handleSubmit = (values: any, { setSubmitting }: FormikActions<any>) => {
        const { updateAccount } = this.props.actions.admin;
        const { firstName, lastName, companyId, role, uid } = values;

        console.info(values);

        updateAccount(uid, {
            account: {
                firstName,
                lastName,
            },
            access: {
                company: companyId,
                role,
            },
        })
            .then(() => {
                setSubmitting(false);
            })
            .catch(() => {
                setSubmitting(false);
            });
    };
}

const mapStateToProps = (state: any) => {
    return {
        actions: {
            admin: state.admin.actions,
        },
        accounts: state.admin.accounts || {},
        companies: state.companies.data || {},
    };
};

export default connect(
    mapStateToProps,
    null
)(Accounts);
