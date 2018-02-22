import React from 'react';
import { connect } from 'react-redux'
import '../styles.css';

class Configuration extends React.Component {

    componentWillMount() {
    }

    render() {
        return (
            <div className="section">
                <h2>Configuration</h2>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        actions: {
            admin: state.admin.actions,
        },
    }
};

export default connect(mapStateToProps, null)(Configuration);
