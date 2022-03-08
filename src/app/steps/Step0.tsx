import Circle from '../view/Circle';
import React from 'react';
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {onDone: () => void}
type State = {}

class Step0 extends React.Component<Props, State> {
    render() {
        return (
            <Circle>
                <FontAwesomeIcon 
                        className='icon-button' 
                        style={{position: 'fixed', fontSize: '5.0em', marginLeft: '0.1em'}} 
                        icon={faPlay} 
                        onClick={() => this.props.onDone()} 
                    />
            </Circle>
        );
    }
}

export default Step0;