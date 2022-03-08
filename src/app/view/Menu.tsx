import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faStop } from '@fortawesome/free-solid-svg-icons'

type Props = {
    showSettingsButton: boolean;
    showStopButton: boolean;
    text: string;
    subtext: string;
    onStopButtonClick: () => void;
    onSettingsButtonClick: () => void;
}
type State = {}

const menuStyle: React.CSSProperties = {
    fontSize: '1.5em', 
    color: 'white', 
    display: 'flex', 
    flexDirection: 'column', 
    paddingTop: '10px',
}

class Menu extends React.Component<Props, State> {
    render() {
        return (
            <div style={menuStyle}>
                <div style={{textAlign: 'right', paddingRight: '20px'}}>
                    {this.props.showStopButton && 
                        <FontAwesomeIcon 
                            className='icon-button' 
                            icon={faStop} 
                            onClick={() => this.props.onStopButtonClick()} 
                        />
                    }
                    {this.props.showSettingsButton && 
                        <FontAwesomeIcon 
                            className='icon-button' 
                            icon={faGear} 
                            onClick={() => this.props.onSettingsButtonClick()} 
                        />
                    }
                </div>
                <div style={{textAlign: 'center'}}>
                    {this.props.text}
                    <div style={{marginTop: '5px'}}><i>{this.props.subtext}</i></div>
                </div>
            </div>
        )
    }
}

export default Menu;
