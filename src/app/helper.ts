export interface Round {
    duration: number,
    breatheInHold: number
}

interface Settings {
    rounds: Round[];
    schemeLevel: 1;
}

const defaultSettings: Settings = {
    rounds: [
        {duration: 30, breatheInHold: 15},
        {duration: 60, breatheInHold: 15},
        {duration: 90, breatheInHold: 15}],
    schemeLevel: 1
}

function getSettings(): Settings {
    const settings = window.localStorage.getItem('settings');
    return settings ? JSON.parse(settings) : defaultSettings;
}

function setSettings(settings: Settings) {
    window.localStorage.setItem('settings', JSON.stringify(settings));
}

function formatSeconds(seconds: number) {
    const secondsStr = (seconds % 60).toString().padStart(2, '0');
    const minutesStr = Math.floor(seconds / 60).toString();
    return `${minutesStr}:${secondsStr}`;
}

const constants = {
    countdownSeconds: 3,
    breathsPerRound: 30,
    breatheInOutDuration: 3.1,
    breatheInHoldCooldown: 3,
}

const staticRoundDuration = 
    constants.countdownSeconds + // Step 1
    (constants.breathsPerRound * constants.breatheInOutDuration) + // Step2
    constants.breatheInHoldCooldown; // Step4

const helper = {getSettings, setSettings, formatSeconds, constants, staticRoundDuration}

export default helper;