import React from 'react';
import Menu from './view/Menu';
import Settings from './view/Settings';
import helper from './helper';
import Step0 from './steps/Step0';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import sounds from './sounds';
import ServiceWorkerWrapper from './ServiceWorkerWrapper';
// @ts-ignore
import PWAPrompt from 'react-ios-pwa-prompt';
import NoSleep from 'nosleep.js';

type Props = {}
type State = {
    step: number, 
    title: string,
    showSettings: boolean, 
    rounds: number[], 
    round: number, 
    contentSize: {height: number, width: number}
};

const stepTitle = [
    'Press play to start',
    'Get ready',
    `Breathe ${helper.constants.breathsPerRound} times`,
    'Hold your breath',
    'Breath in and hold',
]

const contentWrapperStyle = {flex: 1, margin: '5%', display: 'flex', justifyContent: 'center', alignItems: 'center'}

class App extends React.Component<Props, State> {
    contentWrapper: React.RefObject<HTMLDivElement>;
    noSleep: NoSleep;

    constructor(props: Props) {
        super(props);
        this.noSleep = new NoSleep();
        this.contentWrapper = React.createRef();
        this.state = {
            step: 0, showSettings: false, rounds: helper.getSettings().rounds, round: 0, 
            contentSize: {height: 0, width: 0}, title: '',
        };
    }

    componentDidMount() {
        this.updateContentSize();
        window.addEventListener('resize', () => this.updateContentSize());
    }

    updateContentSize() {
        if (this.contentWrapper.current) {
            this.setState({contentSize: {
                height: this.contentWrapper.current.clientHeight, 
                width: this.contentWrapper.current.clientWidth,
            }});
        }
    }

    renderStep() {
        if (this.state.step === 0) {
            return <Step0 onDone={async () => {
                await sounds.unlockAudioContext();
                this.noSleep.enable();
                this.setState({step: 1});
            }}/>
        } else if (this.state.step === 1) {
            return <Step1 onDone={() => this.setState({step: 2})}/>
        } else if (this.state.step === 2) {
            return <Step2 onDone={() => this.setState({step: 3})}/>
        } else if (this.state.step === 3) {
            return <Step3 
                onDone={() => this.setState({step: 4})} 
                duration={this.state.rounds[this.state.round]}/>
        } else if (this.state.step === 4) {
            return <Step4 onDone={() => {
                if (this.state.round + 1 === this.state.rounds.length) {
                    this.setState({step: 0, round: 0});
                    this.noSleep.disable();
                    sounds.play('finishedWellDone');
                } else {
                    this.setState({step: 1, round: this.state.round + 1})
                }
            }}/>
        } 
        return <div/>;
    }

    render() {
        const contentSize = Math.min(this.state.contentSize.height, this.state.contentSize.width);
        const totalTime = this.state.rounds.reduce((a, b) => a + b, 0) + (helper.staticRoundDuration * this.state.rounds.length);
        const subtext = this.state.step === 0 ?
            `${this.state.rounds.length} round(s), ${helper.formatSeconds(totalTime)} min. total` :
            `Round ${this.state.round + 1}/${this.state.rounds.length}`;
        
        return (
            <div style={{height: '100vh', width: '100vw', overflow: 'none', backgroundColor: '#282c34', position: 'fixed'}}>
                <ServiceWorkerWrapper/>
                <PWAPrompt />
                {this.state.showSettings && 
                    <Settings onCloseClick={() => this.setState({showSettings: false, rounds: helper.getSettings().rounds})}/>
                }
                <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                    <Menu
                        text={stepTitle[this.state.step]}
                        subtext={subtext}
                        showStopButton={this.state.step !== 0}
                        showSettingsButton={this.state.step === 0}
                        onStopButtonClick={() => this.setState({step: 0, round: 0})}
                        onSettingsButtonClick={() => this.setState({showSettings: true})}
                    />
                    <div ref={this.contentWrapper} style={contentWrapperStyle}>
                        <div style={{width: contentSize, height: contentSize, position: 'fixed'}}>
                            {this.renderStep()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
