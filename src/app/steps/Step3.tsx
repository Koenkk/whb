import React from 'react';
import Circle from '../view/Circle';
import helper from '../helper';
import sounds from '../sounds';

type Props = {onDone: () => void; duration: number}
type State = {secondsLeft: number}

class Hello extends React.Component<Props, State> {
    timer: NodeJS.Timer | null = null;

    constructor(props: Props) {
        super(props);
        this.state = {secondsLeft: props.duration};
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            if (this.state.secondsLeft === 0) {
                this.timer && clearInterval(this.timer);
                this.props.onDone();
            } else {
                if (this.state.secondsLeft === 16) {
                    sounds.play('_15SecondsMore');
                }
                this.setState({secondsLeft: this.state.secondsLeft - 1});
            }
        }, 1000);

        sounds.play('triangle');
        sounds.play('retentionBackground');
        sounds.play('holdYourBreath');
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
