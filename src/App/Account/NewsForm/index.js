import React from 'react';
import {connect} from 'react-redux'

class NewsForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            news: {},
            form: {
                title: '',
                body: '',
                key: null,
            },
            selected: {
                title: '',
                body: '',
            },
            errors: false,
            dropdown: {
                news: null,
            }
        };
    }

    componentDidMount() {
        this.setData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.news && nextProps.news !== this.props.news) {
            this.setData(nextProps);
        }
    }

    setData = ({ news }) => {
        if (news) {
            this.setState({
                news: news || {},
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

    setSelected = (news) => {
        this.setState({
            form: news,
            selected: news,
            dropdown: {
                selected: null,
            }
        });
    };

    createNews = (event) => {
        event.preventDefault();
        const { account: { group } } = this.props;
        const { form } = this.state;

        //actions.news.create(group, form);
        this.cancel();
    };

    updateNews = (event) => {
        event.preventDefault();
        const { account: { group } } = this.props;
        const { form } = this.state;

        //actions.news.update(group, form);
        this.cancel();
    };

    cancel = () => {
        this.setState({
            form: {
                title: '',
                body: '',
                key: null,
            },
            selected: {
                title: '',
                body: '',
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

    renderDropdownOptions(existingNews, id) {
        return existingNews.map((news, index) => {
            return (
                <li
                    key={index}
                    onClick={() => {
                        this.setSelected(news);
                    }}
                >
                    {news.title}
                </li>
            );
        });
    }

    renderActionButton() {
        const {form} = this.state;

        if (form.key) {
            return <button onClick={this.updateNews}>Save Edit</button>;
        }

        return  <button onClick={this.createNews}>Save New</button>;
    }

    render() {
        const { dropdown, errors, form, news, selected } = this.state;
        const existingNews = Object.keys(news).map((key) => {
            return { ...news[key], key };
        });

        return (
            <form noValidate onSubmit={(event) => event.preventDefault()}>
                <div className="acc_form_wrap gt_news_dropdown">
                    <div className="acc_form_fields">
                        <div className="network_fields">
                            <label>Existing News</label>
                            <div className="btn-group gt_select">
                                <button
                                    className="btn btn-default btn-lg dropdown-toggle"
                                    onClick={() => this.toggleDropdown('selected')}
                                >
                                    <span className="gt_selected">{selected.title || 'Select exiting post to edit'}</span>
                                    <span className="caret"></span>
                                </button>
                                <ul className="dropdown-menu" style={dropdown.selected}>
                                    {this.renderDropdownOptions(existingNews, 'selected')}
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
        account: state.account.data,
        company: state.company.data,
        news: state.news.data,
    }
};

export default connect(mapStateToProps, null)(NewsForm);
