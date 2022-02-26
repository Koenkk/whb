import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faGear, faStop } from '@fortawesome/free-solid-svg-icons'

type Props = {
    showSettingsButton: boolean;
    text: string;
    subtext: string;
    playing: boolean;
    onPlayStopButtonClick: () => void;
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
                    <FontAwesomeIcon 
                        className='icon-button' 
                        style={{marginRight: '30px'}} 
                        icon={this.props.playing ? faStop : faPlay} 
                        onClick={() => this.props.onPlayStopButtonClick()} 
                    />
                    <FontAwesomeIcon 
                        className='icon-button' 
                        icon={faGear} 
                        style={{visibility: this.props.showSettingsButton ? 'visible' : 'hidden'}}
                        onClick={() => this.props.onSettingsButtonClick()} 
                    />
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
