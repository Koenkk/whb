type Sound = 'startingRoundBreathe30Times' | '_5More' | 'lastBreath' | 'holdYourBreath' | '_15SecondsMore' |
    'breathFullyInAndHold' | 'breatheOutRoundCompleted' | 'breatheIn' | 'breatheOut' | 'retentionBackground' | 
    'finishedWellDone' | 'triangle';

const sounds: {[s: string]: {url: string, buffer: AudioBuffer | null, source: AudioBufferSourceNode | null}} = {
    startingRoundBreathe30Times: {url: '/whb/sounds/starting_round_breathe_30_times.mp3', buffer: null, source: null},
    _5More: {url: '/whb/sounds/5_more.mp3', buffer: null, source: null},
    lastBreath: {url: '/whb/sounds/last_breath.mp3', buffer: null, source: null},
    holdYourBreath: {url: '/whb/sounds/hold_your_breath.mp3', buffer: null, source: null},
    _15SecondsMore: {url: '/whb/sounds/15_seconds_more.mp3', buffer: null, source: null},
    breathFullyInAndHold: {url: '/whb/sounds/breath_fully_in_and_hold.mp3', buffer: null, source: null},
    breatheOutRoundCompleted: {url: '/whb/sounds/breathe_out_round_completed.mp3', buffer: null, source: null},
    breatheIn: {url: '/whb/sounds/breathe_in.mp3', buffer: null, source: null},
    breatheOut: {url: '/whb/sounds/breathe_out.mp3', buffer: null, source: null},
    retentionBackground: {url: '/whb/sounds/retention_background.mp3', buffer: null, source: null},
    finishedWellDone: {url: '/whb/sounds/finished_well_done.mp3', buffer: null, source: null},
    triangle: {url: '/whb/sounds/triangle.mp3', buffer: null, source: null},
}

// @ts-ignore
const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
const gainNode = context.createGain();
gainNode.gain.value = 1;
let initialised = false;

for (const value of Object.values(sounds)) {
    window.fetch(value.url)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => context.decodeAudioData(arrayBuffer, audioBuffer => value.buffer = audioBuffer))
}

// Required for iOS: https://codepen.io/kslstn/pen/pagLqL
async function unlockAudioContext(): Promise<void> {
    if (!initialised) {
        return new Promise((r) => {
            var buffer = context.createBuffer(1, 1, 22050);
            var source = context.createBufferSource();
            source.buffer = buffer;
            source.connect(context.destination);
            source.start(0);
            initialised = true;
            setTimeout(() => r(), 1);
        })
    }
}

function play(sound: Sound): void {
    sounds[sound].source?.stop();
    const buffer = sounds[sound].buffer;
    if (buffer) {
        const source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        source.start();
        sounds[sound].source = source;
    }
}

function pauseAll() {
    for (const s of Object.values(sounds)) {
        s.source?.stop();
    }
}

const exp = {unlockAudioContext, play, pauseAll}
export default exp;