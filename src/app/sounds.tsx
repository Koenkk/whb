const sounds = {
    startingRoundBreathe30Times: new Audio('/whb/sounds/starting_round_breathe_30_times.mp3'),
    _5More: new Audio('/whb/sounds/5_more.mp3'),
    lastBreath: new Audio('/whb/sounds/last_breath.mp3'),
    holdYourBreath: new Audio('/whb/sounds/hold_your_breath.mp3'),
    _15SecondsMore: new Audio('/whb/sounds/15_seconds_more.mp3'),
    breathFullyInAndHold: new Audio('/whb/sounds/breath_fully_in_and_hold.mp3'),
    breatheOutRoundCompleted: new Audio('/whb/sounds/breathe_out_round_completed.mp3'),
    breatheIn: new Audio('/whb/sounds/breathe_in.mp3'),
    breatheOut: new Audio('/whb/sounds/breathe_out.mp3'),
    retentionBackground: new Audio('/whb/sounds/retention_background.mp3'),
    finishedWellDone: new Audio('/whb/sounds/finished_well_done.mp3'),
    triangle: new Audio('/whb/sounds/triangle.mp3'),
}

type Sound = 'startingRoundBreathe30Times' | '_5More' | 'lastBreath' | 'holdYourBreath' | '_15SecondsMore' |
    'breathFullyInAndHold' | 'breatheOutRoundCompleted' | 'breatheIn' | 'breatheOut' | 'retentionBackground' | 
    'finishedWellDone' | 'triangle';

let initialised = false;

async function init(): Promise<void> {
    // Required for iOS
    // https://stackoverflow.com/questions/31776548/why-cant-javascript-play-audio-files-on-iphone-safari
    if (!initialised) {
        return new Promise((resolve) => {
            Object.values(sounds).forEach((a) => a.play());
            setTimeout(() => {
                for (const s of Object.values(sounds)) {
                    s.pause();
                }
                initialised = true;
                resolve();
            }, 1);
        })
    }
}

function play(sound: Sound): void {
    const s = sounds[sound];
    s.currentTime = 0;
    s.play();
}

function pauseAll() {
    for (const s of Object.values(sounds)) s.pause();
}

const exp = {init, play, pauseAll}
export default exp;