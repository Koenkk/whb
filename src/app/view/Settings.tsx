import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import helper from '../helper';
import {Round} from '../helper';
import version from '../version';
import { CardActions } from '@mui/material';

type Props = {
    onCloseClick: () => void;
}

type State = {
    rounds: Round[];
}

const settingsStyle: React.CSSProperties = {
    fontSize: '1.5em', 
    color: 'white', 
    display: 'flex', 
    flexDirection: 'column', 
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
                <div style={{textAlign: 'right', paddingRight: '20px', paddingTop: '10px'}}>
                    <FontAwesomeIcon 
                        className='icon-button' 
                        icon={faXmark} 
                        onClick={() => this.props.onCloseClick()} 
                    />
                </div>
                <div style={{textAlign: 'center'}}>
                    Rounds
                    <div style={{paddingTop: '20px', paddingBottom: '20px'}}>
                        {this.state.rounds.map((r, i) => this.renderRound(i))}
                    </div>
                    <FontAwesomeIcon 
                        className='icon-button' 
                        style={{paddingTop: '10px'}}
                        icon={faPlus} 
                        onClick={() => this.addRound()} 
                    />
                </div>
                <div style={{flex: 1}}/>
                <div style={{textAlign: 'center', fontSize: '0.5em', paddingBottom: '20px'}}>Version: {version}</div>
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
        helper.setSettings({...helper.getSettings(), rounds: [...this.state.rounds, {duration: 60, breatheInHold: 15}]})
        this.updateRounds();
    }

    updateRound(round: number, field: string, value: string) {
        const rounds = [...this.state.rounds];
        switch(field) {
            case "duration": {
                rounds[round].duration = Math.max(0, Number(value));
                break;
            }
            case "breatheInHold": {
                rounds[round].breatheInHold = Math.max(0, Number(value));
                break;
            }
        }
        helper.setSettings({...helper.getSettings(), rounds: rounds});
        this.updateRounds();
    }

    renderRound(roundNumber: number): React.ReactElement {
        return (
            <Card variant="outlined" style={{
                display: 'block', 
                justifyContent: 'center', 
                alignItems: 'center'}}>
                <Typography variant="h4">
                    Round {roundNumber + 1}
                </Typography>
                <CardContent>
                    <TextField
                        style={{backgroundColor: 'white', display: 'flex'}}
                        id='outlined-number'
                        variant='filled'
                        label={`Retention time (${helper.formatSeconds(this.state.rounds[roundNumber].duration)} min)`}
                        type='number'
                        value={this.state.rounds[roundNumber].duration.toString()}
                        onChange={(event) => this.updateRound(roundNumber, "duration", event.target.value)}
                        InputProps={{
                            endAdornment: <InputAdornment position="start">seconds</InputAdornment>,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        size='small'
                    />
                    <TextField
                        style={{backgroundColor: 'white', display: 'flex'}}
                        id='outlined-number'
                        variant='filled'
                        label={`Breathe in hold (${helper.formatSeconds(this.state.rounds[roundNumber].duration)} min)`}
                        type='number'
                        value={this.state.rounds[roundNumber].breatheInHold.toString()}
                        onChange={(event) => this.updateRound(roundNumber, "breatheInHold", event.target.value)}
                        InputProps={{
                            endAdornment: <InputAdornment position="start">seconds</InputAdornment>,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        size='small'
                    />
                </CardContent>
                <CardActions style={{justifyContent: 'center'}}>
                    <FontAwesomeIcon 
                        style={{
                            visibility: roundNumber === 0 ? 'hidden' : 'visible',
                        }}
                        className='icon-button' 
                        icon={faXmark}
                        onClick={() => this.removeRound(roundNumber)}
                        
                    />
                </CardActions>
            </Card>
            // </div>
        );
    }
}

export default Settings;
