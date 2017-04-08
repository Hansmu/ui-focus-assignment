import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Example extends Component {

    render () {
        return (
            <div>
                <p>Hello darkness my old fried</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, dispatch => ({dispatch}))(Example);
