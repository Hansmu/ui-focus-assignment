import React, { Component, PropTypes } from 'react';

import { Button } from 'react-bootstrap';

const CLICKS_BEFORE_ANIMATION = 5;

class Example extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isButtonDisabled: false,
            currentClicks: 0
        };

        this.setButtonEnabled = this.setButtonEnabled.bind(this);
        this.increaseClicksMade = this.increaseClicksMade.bind(this);
        this.setDisabledIfClicksFinished = this.setDisabledIfClicksFinished.bind(this);
    }

    increaseClicksMade() {
        this.setState({currentClicks: this.state.currentClicks + 1}, this.setDisabledIfClicksFinished);
    }

    setDisabledIfClicksFinished() {
        if (this.state.currentClicks === CLICKS_BEFORE_ANIMATION) {
            this.setState({isButtonDisabled: true});
        }
    }

    setButtonEnabled() {
        this.setState({currentClicks: 0, isButtonDisabled: false});
    }

    getAnimationClassName(animationClass) {
        return this.state.isButtonDisabled ? animationClass : '';
    }

    render () {
        return (
            <div>
                <Button onClick={this.increaseClicksMade}
                        disabled={this.state.isButtonDisabled}>
                    Hello Click Me
                </Button>

                <center>
                    <img id="animate"
                         className={this.getAnimationClassName('animationChest')}
                         src="../../static/dinosaur.png"/>
                </center>

                <img id="chest"
                     className={this.getAnimationClassName('animationChest')}
                     src="../../static/Chest.png"
                     onClick={this.setButtonEnabled}/>
            </div>
        );
    }
}

export default Example;
