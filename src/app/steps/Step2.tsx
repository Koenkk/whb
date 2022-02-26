import React from 'react';
import Circle from '../view/Circle';
import helper from '../helper';
import sounds from '../sounds';

type Props = {onDone: () => void}
type State = {breatheCount: number, direction: 'in' | 'out' | null}

class Step2 extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {breatheCount: 0, direction: null}
    }

    componentDidMount() { 
        this.breathe('in');
    }

    handleAnimationEnd() {
        if (helper.constants.breathsPerRound === this.state.breatheCount && this.state.direction === 'out') {
            this.props.onDone();
        } else {
            if (helper.constants.breathsPerRound - 6 === this.state.breatheCount && this.state.direction === 'out') {
                sounds.play('_5More');
            }
            if (helper.constants.breathsPerRound - 1 === this.state.breatheCount && this.state.direction === 'out') {
                sounds.play('lastBreath');
            }
            this.breathe(this.state.direction === 'in' ? 'out' : 'in')
        }
    }

    breathe(direction: 'in' | 'out') {
        if (direction === 'in') {
            this.setState({direction, breatheCount: this.state.breatheCount + 1});
            sounds.play('breatheIn');
        } else {
            this.setState({direction});
            sounds.play('breatheOut');
        }
    }

    componentWillUnmount() {
        sounds.pauseAll();
    }

    render() {
        return (
            <Circle 
                text={this.state.breatheCount.toString()} 
                animation={this.state.direction}
                onAnimationEnd={() => this.handleAnimationEnd()}
            />
        );
    }
}

export default Step2;
