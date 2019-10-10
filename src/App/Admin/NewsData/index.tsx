import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import '../styles.css';

interface IProps {
    actions: any;
    news: any;
    match: any;
}

interface IState {
    news: any;
    dropdowns: any;
    edit: any;
    form: {
        [index: number]: any;
        body?: string;
        title?: string;
        date?: Date;
    };
    errors: any;
    new: boolean;
}

class NewsData extends React.Component<IProps, IState> {
    // constructor(props: IProps) {
    //     super(props);

    //     this.state = {
    //         news: props.news,
    //         dropdowns: {},
    //         edit: {},
    //         form: {},
    //         errors: {},
    //         new: false,
    //     };
    // }

    // toggleDropDown = (dropdown: any) => {
    //     this.setState({ dropdowns: { [dropdown]: !this.state.dropdowns[dropdown] } });
    // };

    // onNew = () => {
    //     this.setState({
    //         form: { new: {} },
    //         new: !this.state.new,
    //     });
    // };

    render() {
        return (
            <div className="section">
                <h2>News Data</h2>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Body</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {this.renderNewsItems()}
                </table>
            </div>
        );
    }

    private renderNewsItems = () => {
        const { news } = this.props;
        console.log(news);

        return news.map((newsItem: any, index: number) => {
            return (
                <tbody key={index}>
                    <tr>
                        <td>{index}</td>
                        <td>{newsItem.date}</td>
                        <td>{newsItem.title}</td>
                        <td>{newsItem.body}</td>
                        <td>
                            <button type="button" className="btn btn-default" onClick={this.addNew}>
                                test
                            </button>
                        </td>
                    </tr>
                </tbody>
            );
        });
    };

    private addNew = () => {
        const { actions } = this.props;

        actions.news.create({
            title: 'TEST TITLE',
            body: 'TEST BODY',
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
