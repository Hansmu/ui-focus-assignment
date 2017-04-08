import React, { Component, PropTypes } from 'react';

import { Button, Row, Navbar, Nav, NavItem } from 'react-bootstrap';

const CLICKS_BEFORE_ANIMATION = 5;
let vibrateTimeout;
let audio = new Audio('../../static/Melody.mp3');

class Example extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isButtonDisabled: false,
            isVibrating: false,
            isCoinDisplayed: false,
            isFading: false,
            isBurstingCoin: false,
            currentClicks: 0
        };

        this.setVibration = this.setVibration.bind(this);
        this.setButtonEnabled = this.setButtonEnabled.bind(this);
        this.increaseClicksMade = this.increaseClicksMade.bind(this);
        this.setCoinBurstTimeout = this.setCoinBurstTimeout.bind(this);
        this.setDisabledIfClicksFinished = this.setDisabledIfClicksFinished.bind(this);
    }

    increaseClicksMade() {
        this.setState({isCoinDisplayed: false}, () => {
            this.addCoinsToTotalScore(1);
            this.setState({currentClicks: this.state.currentClicks + 1, isCoinDisplayed: true}, this.setDisabledIfClicksFinished);
        });
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
        if (this.state.isVibrating) {
            this.addCoinsToTotalScore(6);
            audio.pause();
            window.clearTimeout(vibrateTimeout);

            this.setState({isFading: true}, () => {
                window.setTimeout(() =>
                        this.setState({
                            currentClicks: 0,
                            isButtonDisabled: false,
                            isVibrating: false,
                            isBurstingCoin: true,
                            isFading: false
                        }, this.setCoinBurstTimeout)
                    , 1500);
            });
        }
    }

    setCoinBurstTimeout() {
        window.setTimeout(() => {
            this.setState({isBurstingCoin: false});
        }, 2000);
    }

    addCoinsToTotalScore(coinsToAdd) {
        let score = localStorage.getItem("score") ? localStorage.getItem("score") : 0;
        localStorage.setItem("score", Number(score) + coinsToAdd);
    }

    getAnimationClassName(animationClass) {
        return this.state.isButtonDisabled ? animationClass : '';
    }

    renderCoinsHeader() {
        return (
            <Navbar inverse>
                <Nav pullRight style={{marginRight: '20px'}}>
                    <Navbar.Text>
                        <h3>
                            <img src="../../static/coin.png"/>
                            { localStorage.getItem("score") ? localStorage.getItem("score") : 0 }
                        </h3>
                    </Navbar.Text>
                </Nav>
            </Navbar>
        );
    }

    renderCoinBundle() {
        return (
            <div style={{textAlign: 'center', marginTop: '100px', marginRight: '-400px'}}>
                <img className="coin-bounce-right" src="../../static/coin.png"/>
                <img className="coin-bounce-right"
                     style={{marginTop: '3px', marginLeft: '2px'}}
                     src="../../static/coin.png"/>
                <img className="coin-bounce-right"
                     style={{marginTop: '7px', marginLeft: '-1px'}}
                     src="../../static/coin.png"/>

                <img className="coin-bounce-left" src="../../static/coin.png"/>
                <img className="coin-bounce-left"
                     style={{marginTop: '5px', marginRight: '-5px'}}
                     src="../../static/coin.png"/>
                <img className="coin-bounce-left"
                     style={{marginTop: '5px', marginRight: '-2px'}}
                     src="../../static/coin.png"/>
            </div>
        );
    }

    render () {
        const chestClass = this.state.isVibrating ? 'chest-vibrate' : this.getAnimationClassName('chest');

        return (
            <div>
                { this.renderCoinsHeader() }
                <Row style={{textAlign: 'center', marginTop: '150px'}}>
                    <Button onClick={this.increaseClicksMade}
                            bsStyle="success"
                            disabled={this.state.isButtonDisabled}>
                        Acquire Coin
                    </Button>
                </Row>
                {
                    this.state.isCoinDisplayed &&
                    <div style={{textAlign: 'center', marginTop: '-180px'}}>
                        <img className="coin-single"
                             src="../../static/coin.png"/>
                    </div>
                }
                { this.state.isButtonDisabled &&
                <Row style={{textAlign: 'center', marginLeft: '-130px', marginTop: '200px'}}>
                    <img id="animate"
                         className={this.getAnimationClassName('dinosaur')}
                         src="../../static/dinosaur.png"/>

                    <img id="chest"
                         className={this.state.isFading ? `bombRightOut ${chestClass}` : chestClass }
                         src="../../static/Chest.png"
                         onClick={this.setButtonEnabled}/>
                </Row> }
                { this.state.isBurstingCoin && this.renderCoinBundle() }
            </div>

        );
    }
}

export default Example;
