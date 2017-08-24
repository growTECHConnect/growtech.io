import React from 'react';
import {connect} from 'react-redux'

class ConfigForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                type: '',
                industry: [],
            },
            errors: false,
        };
    }

    componentDidMount() {
        this.setData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.company && nextProps.company !== this.props.company) {
            this.setData(nextProps);
        }
    }

    setData = ({company}) => {
        if (company) {
            this.setState({
                form: {
                    type: company.type || '',
                    industry: company.industry || [],
                },
            });
        }
    };

    setField = (event) => {
        const {id, value} = event.target;

        this.setState({
            form: {
                ...this.state.form,
                [id]: value,
            },
            errors: false,
        });
    };

    setChecked = (value) => {
        const { form: { industry }} = this.state;
        const newIndustry = [value, ...industry.slice(0, 1)];
        this.setField({target: { id: 'industry', value: newIndustry}});
    };

    setType = (value) => {
        this.setField({target: { id: 'type', value }});
    };

    updateCompany = (event) => {
        event.preventDefault();
        const {account: {group}} = this.props;
       // actions.company.update(group, this.state.form);
    };

    cancel = () => {
        this.setData(this.props);
    };

    hasError = (field) => {
        const {errors} = this.state;
        return errors[field] ? 'has-error' : '';
    };

    renderType() {
        const { type } = this.props.config;
        const { form } = this.state;

        return type.map((type, index) => {
            const selected = form.type === type;

            return (
                <span key={index} className="gt_radio">
                    <input type="radio" id={`radio${index}`} name="type" checked={selected} onChange={() => this.setType(type)}/>
                    <label htmlFor={`radio${index}`}>{type}</label>
                </span>
            );
        })

    }

    renderIndustry() {
        const { industry } = this.props.config;
        const { form } = this.state;

        return industry.map((industry, index) => {
            const checked = form.industry.indexOf(industry) > -1;

            return (
                <div key={index} className="col-md-4 col-sm-6">
                    <div className="gt_checkbox">
                        <input id={`industry${index}`} name="checkbox" type="checkbox" checked={checked} onChange={() => this.setChecked(industry)}/>
                        <label htmlFor={`industry${index}`}>{industry}</label>
                    </div>
                </div>
            );
        });
    }

    render() {
        const {errors, form} = this.state;

        return (
            <form noValidate onSubmit={(event) => event.preventDefault()}>
               <div className="type_wrap">
                    <h3>Type</h3>
                    <div className="clearfix"></div>
                    {this.renderType()}
                </div>
                <div className="type_wrap inds_wrap">
                    <h3>Industry <span>Select up to 2 industries (0 remain)</span></h3>
                    <div className="clearfix"></div>
                    {this.renderIndustry()}
                </div>
                <div className="col-sm-4 cmp_btns_wrap">
                    <div className="acc_form_fields acc_form_btns">
                        <button onClick={this.cancel}>Cancel</button>
                        <button onClick={this.updateCompany}>Save</button>
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
        config: state.config.data,
    }
};

export default connect(mapStateToProps, null)(ConfigForm);
