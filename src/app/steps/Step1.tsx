import Circle from '../view/Circle';
import React from 'react';
import helper from '../helper';
import sounds from '../sounds';

type Props = {onDone: () => void}
type State = {secondsLeft: number}

class Step1 extends React.Component<Props, State> {
    timer: NodeJS.Timer | null = null;

    constructor(props: Props) {
        super(props);
        this.state = {secondsLeft: helper.constants.countdownSeconds};
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            if (this.state.secondsLeft === 0) {
                this.timer && clearInterval(this.timer);
                this.props.onDone();
            } else {
                this.setState({secondsLeft: this.state.secondsLeft - 1});
            }
        }, 1000);

        sounds.play('startingRoundBreathe30Times');
    }

    componentWillUnmount() {
        sounds.pauseAll();
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return <Circle text={helper.formatSeconds(this.state.secondsLeft)}/>;
    }
}

export default Step1;