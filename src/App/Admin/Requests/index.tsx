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
        firstName: yup.string().required(),
        lastName: yup.string().required(),
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
        const data = Object.keys(requests).map((requestId: any) => {
            return { ...requests[requestId], requestId };
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
                            { title: 'First', field: 'firstName' },
                            { title: 'Last', field: 'lastName' },
                            { title: 'Email', field: 'email' },
                            { title: 'Company', field: 'companyName' },
                        ]}
                        data={data}
                        detailPanel={this.renderDetailPanel}
                    />
                </div>
            </div>
        );
    }

    renderDetailPanel = (rowData: any) => {
        const companies = [
            { companyId: '-1', name: rowData.companyName },
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
                            label="First"
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
                            fullWidth={true}
                        />
                        <TextField
                            margin="normal"
                            label="Last"
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
                            fullWidth={true}
                        />
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
                        <Grid container={true} xs={12} item={true} wrap="nowrap">
                            <TextField
                                name="companyId"
                                select={true}
                                label="Company"
                                value={values.companyId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                margin="normal"
                                required={true}
                                helperText={
                                    values.companyId === '-1' ? `Add company "${values.companyName}", or select an existing company.` : ''
                                }
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
                            <Button variant="outlined" disabled={isSubmitting} type="submit" className="btn btn-default">
                                Add Account
                                {isSubmitting && <CircularProgress style={{ width: 20, height: 20, position: 'absolute' }} />}
                            </Button>
                            <Button
                                variant="outlined"
                                className="btn btn-danger btn-spacer"
                                disabled={isSubmitting}
                                onClick={() => this.handleDeleteRequest(values.requestId)}
                            >
                                Delete Request
                            </Button>
                        </Grid>
                    </Form>
                )}
            </Formik>
        );
    };

    handleDeleteRequest = (requestId: string) => {
        const { deleteRequests } = this.props.actions.admin;

        deleteRequests({ requestId });
    };

    handleSubmit = (values: any, { setSubmitting }: FormikActions<any>) => {
        const { createAccount } = this.props.actions.admin;

        createAccount(values)
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

export default connect(mapStateToProps, null)(Requests);
