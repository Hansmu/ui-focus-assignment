import React, { Component, PropTypes } from 'react';

import { Button } from 'react-bootstrap';

const CLICKS_BEFORE_ANIMATION = 5;
let vibrateTimeout;
let audio = new Audio('../../static/Melody.mp3');

class Example extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isButtonDisabled: false,
            isVibrating: false,
            currentClicks: 0
        };

        this.setVibration = this.setVibration.bind(this);
        this.setButtonEnabled = this.setButtonEnabled.bind(this);
        this.increaseClicksMade = this.increaseClicksMade.bind(this);
        this.setDisabledIfClicksFinished = this.setDisabledIfClicksFinished.bind(this);
    }

    increaseClicksMade() {
        this.setState({currentClicks: this.state.currentClicks + 1}, this.setDisabledIfClicksFinished);
    }

    setDisabledIfClicksFinished() {
        if (this.state.currentClicks === CLICKS_BEFORE_ANIMATION) {
            this.setState({isButtonDisabled: true},
                () => {
                    vibrateTimeout = window.setTimeout(this.setVibration, 5000);
                    audio = new Audio('../../static/Melody.mp3');
                    audio.play();
            });
        }
    }

    setVibration() {
        if (this.state.isButtonDisabled) {
            this.setState({isVibrating: true});
        }
    }

    setButtonEnabled() {
        audio.pause();
        window.clearTimeout(vibrateTimeout);

        this.setState({
            currentClicks: 0,
            isButtonDisabled: false,
            isVibrating: false
        });
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

                { this.state.isButtonDisabled &&
                <center>
                    <img id="animate"
                         className={this.getAnimationClassName('dinosaur')}
                         src="../../static/dinosaur.png"/>


                <img id="chest"
                     className={this.state.isVibrating ? 'chest-vibrate' : this.getAnimationClassName('chest')}
                     src="../../static/Chest.png"
                     onClick={this.setButtonEnabled}/>
                </center> }
            </div>

        );
    }
}

export default Example;
