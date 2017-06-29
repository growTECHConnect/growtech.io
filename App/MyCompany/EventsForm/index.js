import React from 'react';
import {connect} from 'react-redux'
import actions from '../../actions';

class EventsForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: {},
            form: {
                title: '',
                body: '',
                url: '',
                date: '',
                key: null,
            },
            selected: {
                title: '',
                body: '',
                url: '',
                date: '',
            },
            errors: false,
            dropdown: {
                events: null,
            }
        };
    }

    componentDidMount() {
        this.setData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.events && nextProps.events !== this.props.events) {
            this.setData(nextProps);
        }
    }

    setData = ({ events, initialized }) => {
        if (initialized.events && events) {
            this.setState({
                events: events || {},
            });
        }
    };

    setField = (event) => {
        const { id, value } = event.target;

        this.setState({
            form: {
                ...this.state.form,
                [id]: value,
            },
            errors: false,
        });
    };

    setSelected = (events) => {
        this.setState({
            form: events,
            selected: events,
            dropdown: {
                selected: null,
            }
        });
    };

    createEvents = (event) => {
        event.preventDefault();
        const { account: { group } } = this.props;
        const { form } = this.state;

        actions.events.create(group, form);
        this.cancel();
    };

    updateEvents = (event) => {
        event.preventDefault();
        const { account: { group } } = this.props;
        const { form } = this.state;

        actions.events.update(group, form);
        this.cancel();
    };

    cancel = () => {
        this.setState({
            form: {
                title: '',
                body: '',
                url: '',
                date: '',
                key: null,
            },
            selected: {
                title: '',
                body: '',
                url: '',
                date: '',
            },
        });
    };

    hasError = (field) => {
        const { errors } = this.state;
        return errors[field] ? 'has-error' : '';
    };

    toggleDropdown = (field) => {
        event.preventDefault();
        this.setState({
            dropdown: {
                ...this.state.dropdown,
                [field]: this.state.dropdown[field] ? null : {display: 'block'},
            }
        })
    };

    renderDropdownOptions(existingEvents, id) {
        return existingEvents.map((events, index) => {
            return (
                <li
                    key={index}
                    onClick={() => {
                        this.setSelected(events);
                    }}
                >
                    {events.title}
                </li>
            );
        });
    }

    renderActionButton() {
        const {form} = this.state;

        if (form.key) {
            return <button onClick={this.updateEvents}>Save Edit</button>;
        }

        return  <button onClick={this.createEvents}>Save New</button>;
    }

    render() {
        const { dropdown, errors, form, events, selected } = this.state;
        const existingEvents = Object.keys(events).map((key) => {
            return { ...events[key], key };
        });

        return (
            <form noValidate onSubmit={(event) => event.preventDefault()}>
                <div className="acc_form_wrap gt_news_dropdown">
                    <div className="acc_form_fields">
                        <div className="network_fields">
                            <label>Existing Events</label>
                            <div className="btn-group gt_select">
                                <button
                                    className="btn btn-default btn-lg dropdown-toggle"
                                    onClick={() => this.toggleDropdown('selected')}
                                >
                                    <span className="gt_selected">{selected.title || 'Select exiting post to edit'}</span>
                                    <span className="caret"></span>
                                </button>
                                <ul className="dropdown-menu" style={dropdown.selected}>
                                    {this.renderDropdownOptions(existingEvents, 'selected')}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="acc_form_wrap acc_form_bg">
                    <div className="acc_form_fields gt_news_edit">
                        <div className="network_fields">
                            <label>Title</label>
                            <input id="title" type="text" value={form.title} onChange={this.setField}/>
                        </div>
                    </div>
                    <div className="acc_form_fields gt_news_edit">
                        <div className="network_fields">
                            <label>Body</label>
                            <textarea id="body" value={form.body} onChange={this.setField}/>
                        </div>
                    </div>
                    <div className="acc_form_fields gt_news_edit">
                        <div className="network_fields">
                            <label>Event URL</label>
                            <input id="url" type="text" value={form.url} onChange={this.setField}/>
                        </div>
                    </div>
                    <div className="acc_form_fields gt_news_edit">
                        <div className="network_fields">
                            <label>Event Date</label>
                            <input id="date" type="text" value={form.date} onChange={this.setField}/>
                        </div>
                    </div>
                    <div className="acc_form_wrap">
                        <div className="acc_form_fields acc_form_btns">
                            <button onClick={this.cancel}>Cancel</button>
                            {this.renderActionButton()}
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account,
        company: state.company,
        error: state.error,
        initialized: state.initialized,
        events: state.events,
    }
};

export default connect(mapStateToProps, null)(EventsForm);
