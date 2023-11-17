export interface Round {
    duration: number,
    breatheInHold: number
}

interface Settings_v1 {
    rounds: number[];
    schemeLevel: 1;
}

interface Settings {
    rounds: Round[];
    schemeLevel: 2;
}

const defaultSettings: Settings = {
    rounds: [
        {duration: 30, breatheInHold: 15},
        {duration: 60, breatheInHold: 15},
        {duration: 90, breatheInHold: 15}],
    schemeLevel: 2
}

function getSettings(): Settings {
    const settings = window.localStorage.getItem('settings');
    if (settings) {
        let parsedSettings = JSON.parse(settings);
        if (parsedSettings.schemeLevel == 1) {
            parsedSettings = migrateSettings_v1(parsedSettings);
            setSettings(parsedSettings);
        }
        return parsedSettings;
    } else {
        return defaultSettings;
    }

}

function migrateSettings_v1(old: Settings_v1): Settings {
    let newSettings: Settings = {
        rounds: [],
        schemeLevel: 2,
    };
    old.rounds.forEach(round => {newSettings.rounds.push({duration: round, breatheInHold: 15})})
    return newSettings;
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