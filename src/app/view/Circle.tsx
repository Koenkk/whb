import React from 'react';

type Props = {text: string, onAnimationEnd?: () => void, animation?: 'in' | 'out' | null}
type State = {}

const wrapperStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const circleStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const textStyle: React.CSSProperties = {
    position: 'fixed',
    fontWeight: 'bold',
    fontSize: '2.0em',
}

class Circle extends React.Component<Props, State> {
    circle: React.RefObject<HTMLDivElement>;

    constructor(props: Props) {
        super(props);
        this.circle = React.createRef();
    }

    componentDidMount() {
        this.circle.current?.addEventListener('animationend', () => this.props.onAnimationEnd?.());
    }

    render() {
        const className = this.props.animation ? `circle-${this.props.animation}-animation` : 'circle-no-animation';
        return (
            <div style={wrapperStyle}>
                <div ref={this.circle} style={circleStyle} className={className}/>
                <div style={textStyle}>{this.props.text}</div>
            </div>
        )
    }
}

export default Circle;
