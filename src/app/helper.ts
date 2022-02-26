interface Settings {
    rounds: number[];
    schemeLevel: 1;
}

const defaultSettings: Settings = {
    rounds: [30, 60, 90], schemeLevel: 1
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
    breatheInHoldDuration: 15,
}

const helper = {getSettings, setSettings, formatSeconds, constants}

export default helper;