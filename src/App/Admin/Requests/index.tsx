import React from 'react';
import { connect } from 'react-redux';
import { CircularProgress, Button, Grid, MenuItem, TextField, Paper, Typography } from '@material-ui/core';
import MaterialTable from 'material-table';
import { Formik, Form, FormikActions } from 'formik';
import * as yup from 'yup';
import '../styles.css';

interface IProps {
    requests: any;
    actions: any;
    companies: any;
}

interface IState {
    loaded: boolean;
}

class Requests extends React.Component<IProps, IState> {
    private validationSchema = yup.object().shape({
        name: yup.string().required(),
        email: yup
            .string()
            .email()
            .required(),
        companyName: yup.string().required(),
    });

    constructor(props: IProps) {
        super(props);

        this.state = {
            loaded: false,
        };
    }

    componentDidMount() {
        const { readRequests } = this.props.actions.admin;

        readRequests().then(() => {
            this.setState({ loaded: true });
        });
    }

    render() {
        const { requests } = this.props;
        const { loaded } = this.state;
        const data = Object.keys(requests).map((requestId: any) => requests[requestId]);

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
                    <Typography variant="h6" color="primary">
                        REQUESTS
                    </Typography>
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
                        ]}
                        data={data}
                        detailPanel={this.renderDetailPanel}
                    />
                </div>
            </div>
        );
    }

    // renderRowActions = (rowData: any) => {
    //     const { disabled, isApproved } = rowData;

    //     return (
    //         <React.Fragment>
    //             <Button
    //                 variant="outlined"
    //                 className={`btn ${disabled ? 'btn-default' : 'btn-danger'} btn-xs btn-spacer`}
    //                 onClick={() => null}
    //                 style={{ marginRight: 8 }}
    //             >
    //                 {disabled ? 'Enable' : 'Disable'}
    //             </Button>
    //             <Button
    //                 variant="outlined"
    //                 className={`btn ${isApproved ? 'btn-danger' : 'btn-default'} btn-xs btn-spacer`}
    //                 onClick={() => null}
    //             >
    //                 {isApproved ? 'Unapprove' : 'Approve'}
    //             </Button>
    //         </React.Fragment>
    //     );
    // };

    renderDetailPanel = (rowData: any) => {
        const companies = [
            { companyId: '-1', name: `${rowData.companyName} (add as new)` },
            ...Object.keys(this.props.companies)
                .map((id) => {
                    const company = this.props.companies[id];

                    return { companyId: id, name: company.name };
                })
                .sort((companyA: any, companyB: any) => (companyA.name > companyB.name ? 1 : -1)),
        ];
        const initialValues = { ...rowData, companyId: '-1' };

        return (
            <Formik initialValues={initialValues} onSubmit={this.handleSubmit} validationSchema={this.validationSchema}>
                {({ errors, handleBlur, handleChange, touched, values, isSubmitting }) => (
                    <Form noValidate={true} style={{ padding: 24, backgroundColor: '#f9f9f9' }}>
                        <TextField
                            margin="normal"
                            label="Email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required={true}
                            error={!!errors.email && !!touched.email}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ marginRight: 16 }}
                            fullWidth={true}
                        />
                        <TextField
                            margin="normal"
                            label="Name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required={true}
                            error={!!errors.name && !!touched.name}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ marginRight: 16 }}
                            fullWidth={true}
                        />
                        <Grid container={true} xs={12} sm={6} item={true} wrap="nowrap">
                            <TextField
                                name="companyId"
                                select={true}
                                label="Company"
                                value={values.companyId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                margin="normal"
                                fullWidth={true}
                                required={true}
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
                        </Grid>
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

    //        <Grid container={true} item={true} style={{ width: 200 }} justify="center" alignContent="center">
    //     <Typography component="span" align="center">
    //         - or -
    //                                 </Typography>
    // </Grid>

    //     <TextField
    //         margin="normal"
    //         label="Name"
    //         name="name"
    //         value={values.companyName}
    //         onChange={handleChange}
    //         onBlur={handleBlur}
    //         required={true}
    //         error={!!errors.name && !!touched.name}
    //         InputLabelProps={{
    //             shrink: true,
    //         }}
    //         fullWidth={true}
    //     />

    // handleUpdateApproval = (uid: string) => {
    //     const { updateCompanyApproval } = this.props.actions.admin;
    //     const { companies } = this.props;
    //     const account = this.props.requests[uid];

    //     if (account.company) {
    //         const companyID = account.company;
    //         const company = companies[companyID];

    //         updateCompanyApproval(companyID, !company.isApproved);
    //     }
    // };

    // handleUpdateStatus = (uid: string) => {
    //     const { updateAccount } = this.props.actions.admin;

    //     updateAccount(uid, {
    //         user: {
    //             disabled: !this.props.requests[uid].disabled,
    //         },
    //     });
    // };

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
        requests: state.admin.requests || {},
        companies: state.companies.data || {},
    };
};

export default connect(
    mapStateToProps,
    null
)(Requests);
