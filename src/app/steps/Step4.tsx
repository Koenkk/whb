import React from 'react';
import Circle from '../view/Circle';
import helper from '../helper';
import sounds from '../sounds';

type Props = {onDone: () => void,  duration: number}
type State = {secondsLeft: number}

class Hello extends React.Component<Props, State> {
    timer: NodeJS.Timer | null = null;

    constructor(props: Props) {
        super(props);
        this.state = {secondsLeft: props.duration};
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            if (this.state.secondsLeft === 1) {
                this.timer && clearInterval(this.timer);
                sounds.play('breatheOutRoundCompleted');
                setTimeout(() => this.props.onDone(), helper.constants.breatheInHoldCooldown * 1000);                
            }
            this.setState({secondsLeft: this.state.secondsLeft - 1});
        }, 1000);

        sounds.play('triangle');
        sounds.play('breathFullyInAndHold');
    }

    componentWillUnmount() {
        sounds.pauseAll();
        this.timer && clearInterval(this.timer);
    }

    render() {
        return <Circle text={helper.formatSeconds(this.state.secondsLeft)}/>
    }
}

export default Hello;
