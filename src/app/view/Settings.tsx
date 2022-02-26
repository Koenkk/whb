import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import helper from '../helper';

type Props = {
    onCloseClick: () => void;
}

type State = {
    rounds: number[];
}

const settingsStyle: React.CSSProperties = {
    fontSize: '1.5em', 
    color: 'white', 
    display: 'flex', 
    flexDirection: 'column', 
    paddingTop: '10px',
    position: 'fixed',
    width: '100%',
    height: '100%',
    backgroundColor: '#282c34',
    zIndex: 99,
}

class Settings extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {rounds: []};
    }

    componentDidMount() {
        this.updateRounds();
    }

    render() {
        return (
            <div style={settingsStyle}>
                <div style={{textAlign: 'right', paddingRight: '20px'}}>
                    <FontAwesomeIcon 
                        className='icon-button' 
                        icon={faXmark} 
                        onClick={() => this.props.onCloseClick()} 
                    />
                </div>
                <div style={{textAlign: 'center'}}>
                    Rounds
                    <div style={{paddingTop: '20px'}}>
                        {this.state.rounds.map((r, i) => this.renderRound(i))}
                    </div>
                    <FontAwesomeIcon 
                        className='icon-button' 
                        style={{paddingTop: '10px'}}
                        icon={faPlus} 
                        onClick={() => this.addRound()} 
                    />
                </div>
            </div>
        );
    }

    updateRounds() {
        this.setState({rounds: helper.getSettings().rounds})
    }

    removeRound(round: number) {
        helper.setSettings({...helper.getSettings(), rounds: this.state.rounds.filter((v, i) => i !== round)})
        this.updateRounds();
    }

    addRound() {
        helper.setSettings({...helper.getSettings(), rounds: [...this.state.rounds, 60]})
        this.updateRounds();
    }

    setRound(round: number, value: string) {
        const rounds = [...this.state.rounds];
        rounds[round] = Math.max(10, Number(value));
        helper.setSettings({...helper.getSettings(), rounds: rounds});
        this.updateRounds();
    }

    renderRound(round: number): React.ReactElement {
        return (
            <div key={round} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <TextField
                    style={{backgroundColor: 'white'}}
                    id='outlined-number'
                    variant='filled'
                    label={`Round ${round + 1} retention time`}
                    type='number'
                    value={this.state.rounds[round]}
                    onChange={(event) => this.setRound(round, event.target.value)}
                    InputProps={{
                        endAdornment: <InputAdornment position="start">seconds</InputAdornment>,
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <FontAwesomeIcon 
                    style={{visibility: round === 0 ? 'hidden' : 'visible', marginLeft: '15px'}}
                    className='icon-button' 
                    icon={faXmark}
                    onClick={() => this.removeRound(round)} 
                />
            </div>
        );
    }
}

export default Settings;
