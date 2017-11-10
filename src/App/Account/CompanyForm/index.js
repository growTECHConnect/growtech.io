import React from 'react';
import {connect} from 'react-redux';
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class CompanyForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            benefitsEditorState: EditorState.createEmpty(),
            cultureEditorState: EditorState.createEmpty(),
            whyEditorState: EditorState.createEmpty(),
            form: {
                name: '',
                url: '',
                founded: '',
                email: '',
                employeeSize: 0,
                active: false,
                city: '',
                state: '',
                description: '',
                why: '',
                culture: '',
                benefits: '',
            },
            errors: false,
            dropdown: {
                employees: null,
            },
            saveMsg: null,
        };
    }

    componentDidMount() {
        this.setData(this.props);

        if (this.props.company && this.props.company.benefits) {
            this.setEditorContent('benefits', this.props.company.benefits);
        }

        if (this.props.company && this.props.company.culture) {
            this.setEditorContent('culture', this.props.company.culture);
        }

        if (this.props.company && this.props.company.why) {
            this.setEditorContent('why', this.props.company.why);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.company && nextProps.company !== this.props.company) {
            this.setData(nextProps);
        }

        if (nextProps.company && nextProps.company.benefits != this.props.company.benefits) {
            this.setEditorContent('benefits', nextProps.company.benefits);
        }

        if (nextProps.company && nextProps.company.culture != this.props.company.culture) {
            this.setEditorContent('culture', nextProps.company.culture);
        }

        if (nextProps.company && nextProps.company.why !== this.props.company.why) {
            this.setEditorContent('why', nextProps.company.why);
        }
    }

    setEditorContent = (id, content) => {
        const { contentBlocks, entityMap } = htmlToDraft(content);
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const editorState = EditorState.createWithContent(contentState);

        id = `${id}EditorState`;

        this.setState({[id]: editorState});
    };

    setData = ({company}) => {
        if (company) {
            this.setState({
                form: {
                    name: company.name || '',
                    url: company.url || '',
                    founded: company.founded || '',
                    email: company.email || '',
                    employeeSize: company.employeeSize || 0,
                    active: company.active || false,
                    city: company.city || '',
                    state: company.state || '',
                    description: company.description || '',
                },
            });
        }
    };

    update = (field) => {
        const {actions, company} = this.props;
        const {id, value} = field;

        if (value !== company[id]) {
            this.setState({saveMsg: 'saving...'}, () => {
                actions.company.update(this.state.form).then(() => {
                    this.setState({saveMsg: 'saved'}, () => {
                        setTimeout(() => this.setState({saveMsg: null}), 1000);
                    })
                });
            });
        }
    };

    setField = (event) => {
        const {id, value} = event.target;
        this.setState({form: {...this.state.form, [id]: value}, errors: false}, () => {
            if (this.updateTimeout) {
                clearTimeout(this.updateTimeout);
            }
            this.updateTimeout = setTimeout(() => this.update({id, value}), 2000);
        });
    };

    setChecked = (id, value) => {
        this.setField({target: {id, value}});
    };

    getGroupClass = (field) => {
        const {errors} = this.state;

        return errors[field] ? 'network_fields form-group has-error' : 'network_fields form-group';
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

    onEditorChange = (id, editorState) => {
        const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        this.setField({target: {id, value: html}});

        id = `${id}EditorState`;

        this.setState({[id]: editorState}, () => {
            const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
            this.setField({target: {id, value: html}});
        });
    };

    renderDropdownOptions(options, id) {
        return Object.keys(options).map((value, index) => {
            return (
                <li
                    key={index}
                    onClick={() => {
                        this.setField({target: {id, value}});
                        this.toggleDropdown(id);
                    }}
                >
                    {options[value].text}
                </li>
            );
        });
    }

    render() {
        const {config: {sizes, states}} = this.props;
        const {dropdown, errors, form, saveMsg} = this.state;

        return (
            <div className="acc_form_section">
                <h2>Company Info <span className="gt_save_msg">{saveMsg}</span></h2>
                <form noValidate onSubmit={(event) => event.preventDefault()}>
                    <div className="cmp_job_wrap">
                        <div className="switch_wrap">
                            <span>Active</span>
                            <label className="switch">
                                <input id="active" type="checkbox" checked={form.active} value={form.active}
                                       onChange={() => this.setChecked('active', !form.active)}/>
                                <div className="slider round"></div>
                            </label>
                            <span>Inactive</span>
                        </div>
                    </div>
                    <div className="acc_form_wrap acc_form_three_col">
                        <div className="acc_form_fields">
                            <div className={this.getGroupClass('name')}>
                                <label className="control-label" htmlFor="name">Company Name</label>
                                <input id="name" className="form-control" type="text" value={form.name}
                                       onChange={this.setField}/>
                                <span className="help-block">{errors.name}</span>
                            </div>
                        </div>
                        <div className="acc_form_fields">
                            <div className={this.getGroupClass('url')}>
                                <label className="control-label" htmlFor="url">Company URL</label>
                                <input id="url" className="form-control" type="text" value={form.url}
                                       onChange={this.setField}/>
                                <span className="help-block">{errors.url}</span>
                            </div>
                        </div>
                        <div className="acc_form_fields">
                            <div className={this.getGroupClass('founded')}>
                                <label className="control-label" htmlFor="founded">Year Founded</label>
                                <input id="founded" className="form-control" type="text" value={form.founded}
                                       onChange={this.setField}/>
                                <span className="help-block">{errors.founded}</span>
                            </div>
                        </div>
                    </div>
                    <div className="acc_form_wrap acc_form_three_col">
                        <div className="acc_form_fields">
                            <div className={this.getGroupClass('email')}>
                                <label className="control-label" htmlFor="email">Company Email</label>
                                <input id="email" className="form-control" type="text" value={form.email}
                                       onChange={this.setField}/>
                                <span className="help-block">{errors.email}</span>
                            </div>
                        </div>
                        <div className="acc_form_fields">
                            <div className="network_fields">
                                <label>Number of Employees</label>
                                <div className="btn-group gt_select">
                                    <button
                                        className="btn btn-default btn-lg dropdown-toggle"
                                        onClick={() => this.toggleDropdown('employeeSize')}
                                    >
                                        <span className="gt_selected">{sizes[form.employeeSize].text}</span>
                                        <span className="caret"></span>
                                    </button>
                                    <ul className="dropdown-menu" style={dropdown.employeeSize}>
                                        {this.renderDropdownOptions(sizes, 'employeeSize')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="acc_form_wrap acc_form_three_col">
                        <div className="acc_form_fields">
                            <div className={this.getGroupClass('city')}>
                                <label className="control-label" htmlFor="city">City</label>
                                <input id="city" className="form-control" type="text" value={form.city}
                                       onChange={this.setField}/>
                                <span className="help-block">{errors.city}</span>
                            </div>
                        </div>
                        <div className="acc_form_fields">
                            <div className="network_fields">
                                <label>State</label>
                                <div className="btn-group gt_select">
                                    <button
                                        className="btn btn-default btn-lg dropdown-toggle"
                                        onClick={() => this.toggleDropdown('state')}
                                    >
                                        <span className="gt_selected">{form.state}</span>
                                        <span className="caret"></span>
                                    </button>
                                    <ul className="dropdown-menu" style={dropdown.state}>
                                        {this.renderDropdownOptions(states, 'state')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="acc_form_fields"></div>
                    </div>
                    <div className="acc_form_wrap">
                        <div className="acc_form_fields full">
                            <div className={this.getGroupClass('description')}>
                                <label className="control-label" htmlFor="description">Company Description</label>
                                <textarea id="description" className="form-control" value={form.description}
                                          onChange={this.setField}/>
                                <span className="help-block">{errors.description}</span>
                            </div>
                        </div>
                    </div>
                    <div className="acc_form_wrap">
                        <div className="acc_form_fields full">
                            <div className={this.getGroupClass('why')}>
                                <label className="control-label" htmlFor="why">Why Work With Us</label>
                                <Editor
                                    wrapperClassName="wrapper-control"
                                    editorClassName="editor-control"
                                    editorState={this.state.whyEditorState}
                                    onEditorStateChange={(editorState) => this.onEditorChange('why', editorState)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="acc_form_wrap">
                        <div className="acc_form_fields full">
                            <div className={this.getGroupClass('culture')}>
                                <label className="control-label" htmlFor="culture">Culture</label>
                                <Editor
                                    wrapperClassName="wrapper-control"
                                    editorClassName="editor-control"
                                    editorState={this.state.cultureEditorState}
                                    onEditorStateChange={(editorState) => this.onEditorChange('culture', editorState)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="acc_form_wrap">
                        <div className="acc_form_fields full">
                            <div className={this.getGroupClass('benefits')}>
                                <label className="control-label" htmlFor="benefits">Perks &amp; Benefits</label>
                                <Editor
                                    wrapperClassName="wrapper-control"
                                    editorClassName="editor-control"
                                    editorState={this.state.benefitsEditorState}
                                    onEditorStateChange={(editorState) => this.onEditorChange('benefits', editorState)}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        actions: {
            company: state.company.actions,
        },
        company: state.company.data,
        config: state.config.data,
    }
};

export default connect(mapStateToProps, null)(CompanyForm);
