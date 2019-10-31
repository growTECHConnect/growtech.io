import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Recaptcha from 'react-recaptcha';
import {
    Button,
    Grid,
    CircularProgress,
    TextField,
    Paper,
    Typography,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
} from '@material-ui/core';
import { Formik, Form, FormikActions } from 'formik';
import * as yup from 'yup';

interface IProps {
    actions: any;
    access: any;
    error: any;
    page: any;
}

export interface ISignUp {
    name: string;
    email: string;
    companyName: string;
    recaptcha: boolean;
}

class SignUp extends React.Component<IProps> {
    private validationSchema = yup.object().shape({
        name: yup.string().required(),
        email: yup
            .string()
            .email()
            .required(),
        companyName: yup.string().required(),
        recaptcha: yup.mixed().test({
            test: (value: boolean) => !!value,
        }),
    });
    private initialValues: ISignUp = {
        name: '',
        email: '',
        companyName: '',
        recaptcha: false,
    };

    render() {
        const { page } = this.props;

        return (
            <section className="full_page_wrap">
                <div className="full_page_left">
                    <div className="full_page_logo">
                        <Link to="/">
                            <img src="/images/logo.png" className="img-responsive" alt="" />
                        </Link>
                    </div>
                    <h1>{page.tagText}</h1>
                    <h2>{page.tagSubText}</h2>
                    <Link to="/" className="back_to_site">
                        <img src="/images/back_to_site.png" alt="" />
                        Back to main site
                    </Link>
                </div>
                <div className="full_page_right">
                    <div className="full_right_inner">
                        <h3>
                            Already have an account? <Link to="/sign-in">Sign In</Link>
                        </h3>
                        <Paper square={true}>
                            <Formik
                                initialValues={this.initialValues}
                                onSubmit={this.handleSubmit}
                                validationSchema={this.validationSchema}
                            >
                                {({
                                    errors,
                                    handleBlur,
                                    handleChange,
                                    touched,
                                    values,
                                    status,
                                    setFieldValue,
                                    isValid,
                                    isSubmitting,
                                    setStatus,
                                }) => (
                                    <Form noValidate={true} style={{ padding: 24 }}>
                                        <Typography variant="h6" color="primary">
                                            JOIN OUR NETWORK
                                        </Typography>
                                        <TextField
                                            fullWidth={true}
                                            variant="outlined"
                                            margin="normal"
                                            placeholder="Name *"
                                            id="name"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required={true}
                                            error={!!errors.name && touched.name}
                                        />
                                        <TextField
                                            fullWidth={true}
                                            variant="outlined"
                                            margin="normal"
                                            placeholder="Email *"
                                            id="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required={true}
                                            error={!!errors.email && touched.email}
                                        />
                                        <TextField
                                            fullWidth={true}
                                            variant="outlined"
                                            margin="normal"
                                            placeholder="Company Name *"
                                            id="companyName"
                                            value={values.companyName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required={true}
                                            error={!!errors.companyName && touched.companyName}
                                            style={{ marginBottom: 24 }}
                                        />
                                        <Recaptcha
                                            sitekey="6LeSlCYUAAAAAOvleAOIrHGXNDgcWsKezRIU-5vJ"
                                            verifyCallback={() => this.onRecaptchaVerify(setFieldValue)}
                                        />
                                        <Grid container={true} item={true} xs={12} justify="flex-end" style={{ paddingTop: 24 }}>
                                            <Button type="submit" disabled={!isValid} variant="outlined" size="large" color="secondary">
                                                SIGN UP
                                                {isSubmitting && (
                                                    <CircularProgress color="primary" style={{ position: 'absolute', padding: 4 }} />
                                                )}
                                            </Button>
                                        </Grid>
                                        <Dialog open={status}>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">{status}</DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={() => setStatus(undefined)} color="primary" autoFocus>
                                                    Ok
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </Form>
                                )}
                            </Formik>
                        </Paper>
                    </div>
                </div>
            </section>
        );
    }

    handleSubmit = (values: ISignUp, { setSubmitting, setStatus }: FormikActions<ISignUp>) => {
        const { user } = this.props.actions;

        user.signUp(values)
            .then(() => {
                setStatus(`Thank you for your interest, we'll be in contact within 3 business days.`);
                setSubmitting(false);
            })
            .catch((error: any) => {
                const status =
                    error && error.code === 'already-exists'
                        ? error.message
                        : 'Sorry, any unexpeced error occurred. Please try again later.';

                setStatus(status);
                setSubmitting(false);
            });
    };

    onRecaptchaVerify = (setFieldValue: any) => {
        setFieldValue('recaptcha', true);
    };
}

const mapStateToProps = (state: any) => {
    return {
        access: state.access.data,
        actions: {
            company: state.company.actions,
            user: state.user.actions,
        },
        error: {
            ...state.user.error,
        },
        page: state.pages.data.signup || {},
    };
};

export default connect(
    mapStateToProps,
    null
)(SignUp);


