import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Button } from 'react-bootstrap';

class Example extends Component {

    render () {
        return (
            <div>
                <p>Hello darkness my old fried</p>
                <div id="animate"/>
                <Button>Hello Click Me</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, dispatch => ({dispatch}))(Example);
