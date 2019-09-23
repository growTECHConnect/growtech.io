import React from 'react';
import '../styles.css';

interface IProps {
    news: any;
    match: any;
}

interface IState {
    news: any;
    form: {
        [index: number]: any;
        body?: string;
        title?: string;
        date?: Date;
    };
}

class NewsData extends React.Component<IProps, IState> {
    render() {
        return (
            <div className="section">
                <h2>News Data</h2>
            </div>
        );
    }
}

export default NewsData;
