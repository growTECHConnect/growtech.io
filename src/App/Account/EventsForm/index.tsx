import React from 'react';
import { connect } from 'react-redux';

interface IProps {
    actions: any;
    company: any;
}

interface IState {
    events: any;
    form: any;
    selected: any;
    errors: any;
    dropdown: any;
    showNew: any;
}

class EventsForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            events: [],
            form: {
                title: '',
                link: '',
                date: '',
            },
            selected: {
                title: '',
                body: '',
            },
            errors: false,
            dropdown: {
                events: null,
            },
            showNew: false,
        };
    }

    componentDidMount() {
        this.setData(this.props);
    }

    componentWillReceiveProps(nextProps: IProps) {
        if (nextProps.company) {
            this.setData(nextProps);
        }
    }

    setData = ({ company }: any) => {
        if (company && company.events) {
            this.setState({
                events: company.events.map((item: any) => {
                    item.hidden = true;
                    return item;
                }),
            });
        }
    };

    setField = (event: any) => {
        const { id, value } = event.target;
        this.setState({ form: { ...this.state.form, [id]: value }, errors: false });
    };

    setEvents = (event: any, index: number) => {
        const { id, value } = event.target;
        this.setState({
            events: this.state.events.map((item: any, itemIndex: number) => {
                if (itemIndex === index) {
                    item[id] = value;
                }
                return item;
            }),
        });
    };

    showEdit = (index: number) => {
        this.setState({
            events: this.state.events.map((item: any, itemIndex: number) => {
                item.hidden = itemIndex === index ? !item.hidden : true;
                return item;
            }),
            showNew: false,
        });
    };

    showNew = () => {
        this.setState({
            events: this.state.events.map((item: any) => {
                item.hidden = true;
                return item;
            }),
            showNew: true,
        });
    };

    hideNew = () => {
        this.setState({ showNew: false });
    };

    updateEvents = () => {
        const { actions } = this.props;
        const events = this.state.events.map((item: any) => {
            item.hidden = true;
            return item;
        });

        actions.company.update({ events });
    };

    addEvents = () => {
        const { form, events } = this.state;

        this.setState(
            {
                events: [
                    ...events,
                    {
                        ...form,
                        hidden: true,
                    },
                ],
                form: {
                    title: '',
                    link: '',
                    date: '',
                },
                showNew: false,
            },
            () => {
                this.updateEvents();
            }
        );
    };

    deleteEvents = (index: number) => {
        this.setState(
            {
                events: this.state.events.filter((item: any, itemIndex: number) => {
                    return index !== itemIndex;
                }),
            },
            () => {
                this.updateEvents();
            }
        );
    };

    renderEvents() {
        const { form, events } = this.state;

        return events.map((item: any, index: number) => {
            const editClass = item.hidden ? 'hidden' : '';
            const editText = item.hidden ? 'Edit' : 'Close';

            return (
                <div key={index} className="acc_form_wrap">
                    <div className="gt_edit_row">
                        <span>{item.title}</span>
                        <button className="gt_small_button" onClick={() => this.showEdit(index)}>
                            {editText}
                        </button>
                    </div>
                    <form className={`gt_edit_form ${editClass}`} noValidate onSubmit={(event) => event.preventDefault()}>
                        <div className="acc_form_wrap acc_form_bg">
                            <div className="acc_form_fields gt_news_edit">
                                <div className="network_fields">
                                    <label>Title</label>
                                    <input id="title" type="text" value={item.title} onChange={(event) => this.setEvents(event, index)} />
                                </div>
                            </div>
                            <div className="acc_form_fields gt_news_edit">
                                <div className="network_fields">
                                    <label>Link</label>
                                    <input id="link" type="text" value={item.link} onChange={(event) => this.setEvents(event, index)} />
                                </div>
                            </div>
                            <div className="acc_form_fields gt_news_edit">
                                <div className="network_fields">
                                    <label>Date</label>
                                    <input id="date" type="text" value={item.date} onChange={(event) => this.setEvents(event, index)} />
                                </div>
                            </div>
                            <div className="acc_form_btns">
                                <button onClick={() => this.deleteEvents(index)}>Delete</button>
                                <button onClick={this.updateEvents}>Update</button>
                            </div>
                        </div>
                    </form>
                    <div className="gt_edit_row_spacer" />
                </div>
            );
        });
    }

    render() {
        const { form } = this.state;
        const newClass = this.state.showNew ? '' : 'hidden';

        return (
            <div className="acc_form_section">
                <div className="gt_form_header">
                    <h2>Company Events</h2>
                    <button className="gt_small_button" onClick={this.showNew}>
                        Add
                    </button>
                </div>
                <form className={`gt_new_form ${newClass}`} noValidate onSubmit={(event) => event.preventDefault()}>
                    <div className="acc_form_wrap acc_form_bg">
                        <div className="acc_form_fields gt_news_edit">
                            <div className="network_fields">
                                <label>Title</label>
                                <input id="title" type="text" value={form.title} onChange={this.setField} />
                            </div>
                        </div>
                        <div className="acc_form_fields gt_news_edit">
                            <div className="network_fields">
                                <label>Link</label>
                                <input id="link" type="text" value={form.link} onChange={this.setField} />
                            </div>
                        </div>
                        <div className="acc_form_fields gt_news_edit">
                            <div className="network_fields">
                                <label>Date</label>
                                <input id="date" type="text" value={form.date} onChange={this.setField} />
                            </div>
                        </div>
                        <div className="acc_form_btns">
                            <button onClick={this.hideNew}>Cancel</button>
                            <button onClick={this.addEvents}>Save</button>
                        </div>
                    </div>
                </form>
                {this.renderEvents()}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        actions: {
            company: state.company.actions,
        },
        company: state.company.data,
    };
};

export default connect(
    mapStateToProps,
    null
)(EventsForm);
