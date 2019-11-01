import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Button, Grid, TextField, Paper } from '@material-ui/core';
import MaterialTable from 'material-table';
import { Formik, Form, FormikActions } from 'formik';
import * as yup from 'yup';
import '../styles.css';

interface IProps {
    actions: any;
    news: any;
}

class NewsData extends React.Component<IProps> {
    private validationSchema = yup.object().shape({
        index: yup.number().required(),
        date: yup.string().required(),
        title: yup.string().required(),
        body: yup.string().required(),
    });

    render() {
        const { news } = this.props;
        const data = Object.keys(news).map((newsKey: any) => {
            const newsData = news[newsKey];

            return {
                ...newsData,
                index: newsKey,
                date: newsData.date,
                title: newsData.title,
                body: newsData.body,
            };
        });

        return (
            <div className="section">
                <h2>News Data</h2>
                <MaterialTable
                    title={
                        <button type="button" className="btn btn-default" onClick={this.addNew}>
                            Add New
                        </button>
                    }
                    options={{
                        actionsColumnIndex: -1,
                        paging: false,
                        showTitle: true,
                    }}
                    components={{
                        Container: (props) => <Paper {...props} elevation={0} style={{ width: '100%' }} />,
                    }}
                    columns={[
                        { title: 'Date', field: 'date', defaultSort: 'desc' },
                        { title: 'Title', field: 'title' },
                        { title: 'Body', field: 'body' },
                        { render: this.renderRowActions, cellStyle: { width: 35 } },
                    ]}
                    data={data}
                    detailPanel={this.renderDetailPanel}
                />
            </div>
        );
    }

    renderRowActions = (rowData: any) => {
        return (
            <React.Fragment>
                <Button variant="outlined" className={'btn btn-danger'} onClick={() => this.handleDelete(rowData.index)}>
                    Delete
                </Button>
            </React.Fragment>
        );
    };

    renderDetailPanel = (rowData: any) => {
        const news = Object.keys(this.props.news)
            .map((newsItem: any, index: number) => {
                return {
                    date: newsItem.date,
                    title: newsItem.title,
                    body: newsItem.body,
                };
            })
            .sort((newsA: any, newsB: any) => (newsA.date > newsB.date ? 1 : -1));

        return (
            <Formik initialValues={rowData} onSubmit={this.handleSubmit} validationSchema={this.validationSchema}>
                {({ errors, handleChange, touched, values }) => (
                    <Form noValidate={true} style={{ padding: 24 }}>
                        <TextField
                            margin="normal"
                            label="Date"
                            name="date"
                            value={values.date}
                            onChange={handleChange}
                            required={true}
                            error={!!errors.date && !!touched.date}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ marginRight: 16 }}
                        />
                        <TextField
                            margin="normal"
                            fullWidth={true}
                            label="Title"
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            required={true}
                            error={!!errors.title && !!touched.title}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ marginRight: 16 }}
                        />
                        <TextField
                            margin="normal"
                            fullWidth={true}
                            multiline={true}
                            label="Body"
                            name="body"
                            value={values.body}
                            onChange={handleChange}
                            required={true}
                            error={!!errors.body && !!touched.body}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{ marginRight: 16 }}
                        />
                        <Grid container={true} item={true} xs={12} style={{ paddingTop: 24 }}>
                            <Button type="submit" className="btn btn-default">
                                Save
                            </Button>
                        </Grid>
                    </Form>
                )}
            </Formik>
        );
    };

    handleDelete = (index: number) => {
        this.props.actions.news.delete(index);
    };

    handleSubmit = (values: any, { setSubmitting }: FormikActions<any>) => {
        const { actions } = this.props;
        const { index, date, title, body } = values;

        console.info(values);

        actions.news
            .update(index, {
                date: date,
                title: title,
                body: body,
            })
            .then(() => {
                setSubmitting(false);
            })
            .catch(() => {
                setSubmitting(false);
            });
    };

    private addNew = () => {
        const { actions } = this.props;

        actions.news.create({
            title: 'NEW_TITLE',
            body: 'NEW_BODY',
            date: moment().format('YYYY-MM-DD'),
        });
    };
}

const mapStateToProps = (state: any) => {
    return {
        actions: {
            news: state.news.actions,
        },
        news: state.news.data,
    };
};

export default connect(
    mapStateToProps,
    null
)(NewsData);
