import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, MenuItem, TextField } from '@material-ui/core';
import { Formik, Form,  } from 'formik';
import * as yup from 'yup';
import '../styles.css';

interface IProps {
    config: any;
    companies: any;
}

class Configuration extends React.Component<IProps> {
    private validationSchema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        role: yup.string().required(),
        companyId: yup.string().required(),
    });

    componentWillMount() {}

    render() {
        const { config } = this.props;
        const companies = Object.keys(this.props.companies)
            .map((id) => {
                const company = this.props.companies[id];

                return { companyId: id, name: company.name };
            })
            .sort((companyA: any, companyB: any) => (companyA.name > companyB.name ? 1 : -1));
        const initialValues = {
            ...config,
            companyId: companies[0].companyId,
        };

        return (
            <div className="section">
                <h2>Configuration</h2>
                <Formik initialValues={initialValues} onSubmit={() => null} validationSchema={this.validationSchema}>
                    {({ errors, handleChange, touched, values }) => (
                        <Form noValidate={true} style={{ padding: 24 }}>
                            <Grid container={true} item={true} xs={12}>
                                <TextField
                                    margin="normal"
                                    label="Admin Email"
                                    name="adminEmail"
                                    value={values.adminEmail}
                                    onChange={handleChange}
                                    required={true}
                                    error={!!errors.adminEmail && !!touched.adminEmail}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    style={{ marginRight: 16, width: 300 }}
                                />
                            </Grid>
                            <Grid container={true} item={true} xs={12}>
                                <TextField
                                    name="companyId"
                                    select={true}
                                    label="Add Featured Company"
                                    value={values.companyId}
                                    onChange={handleChange}
                                    margin="normal"
                                    style={{ marginRight: 16, width: 300 }}
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
                                <Button type="submit" className="btn btn-default">
                                    Save
                                </Button>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        actions: {
            admin: state.admin.actions,
        },
        config: state.config.data.site || {},
        companies: state.companies.data || {},
    };
};

export default connect(
    mapStateToProps,
    null
)(Configuration);
