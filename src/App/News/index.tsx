import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as showdown from 'showdown';
import striptags from 'striptags';
import moment from 'moment';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Network from '../Components/Network';

interface IProps {
    news: any;
    match: any;
}

const converter = new showdown.Converter();

class News extends React.Component<IProps> {
    renderMarkup = (markdown: any) => {
        markdown = striptags(markdown);
        return { __html: converter.makeHtml(markdown) };
    };

    renderNewsItem = (index: string) => {
        const item = this.props.news[index];
        const date = moment(item.date).format('ll');

        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="parent">
                        <h3>{item.title}</h3>
                        <p dangerouslySetInnerHTML={this.renderMarkup(item.body)} />
                        <span>{date}</span>
                    </div>
                </div>
            </div>
        );
    };

    renderNewsItems = () => {
        const { news } = this.props;

        return news.map((item: any, index: number) => {
            const body = `${item.body.substring(0, 200)}...`;
            const date = moment(item.date).format('ll');
            const style = {
                borderBottom: index + 1 === news.length ? '1px solid #6F6F6F' : undefined,
            };

            return (
                <div key={index} className="row">
                    <div className="col-sm-12 item" style={style}>
                        <Link to={`/news/${index}`}>
                            <div className="parent">
                                <h3>{item.title}</h3>
                                <p dangerouslySetInnerHTML={this.renderMarkup(body)} />
                                <span>{date}</span>
                                <div className="pull-right">
                                    <i className="glyphicon glyphicon-chevron-right child" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            );
        });
    };

    render() {
        const {
            match: { params },
        } = this.props;

        if (params.index) {
            return (
                <div>
                    <Header />
                    <section className="news_content">
                        <div className="container base_page">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="breadcrumb">
                                        <Link to="/news">
                                            <span className="back_arrow">
                                                <img src="/images/breadcrumb_arrow.png" alt="" />
                                            </span>
                                            Hello World Back to All News
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {this.renderNewsItem(params.index)}
                        </div>
                    </section>
                    <Network />
                    <Footer />
                </div>
            );
        }

        return (
            <div>
                <Header />
                <section className="news_content">
                    <div className="container base_page">
                        <div className="row">
                            <div className="col-sm-12">
                                <h2>NEWS</h2>
                            </div>
                        </div>
                        {this.renderNewsItems()}
                    </div>
                </section>
                <Network />
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        news: state.news.data || [],
    };
};

export default connect(
    mapStateToProps,
    null
)(News);
