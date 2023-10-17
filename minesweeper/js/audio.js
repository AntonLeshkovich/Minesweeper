// export { audio, playAudio, playWinAudio, playLoseAudio, playSetFlagAudio }

// const audio = new Audio();

// const playAudio = (target) => {
//     if (!target.classList.contains('unlock')) {
//         if (target.classList.contains('flag-cell')) {
//             audio.src = './assets/audio/negative-tone.wav';
//         } else if (target.hasAttribute("data-mine")) {
//             audio.src = './assets/audio/bomb-tone.wav';
//         } else {
//             audio.src = './assets/audio/click-cell.wav';
//         }

//         audio.play();
//     }

// }

// const playWinAudio = () => {
//     audio.src = './assets/audio/win-sound.wav';
//     audio.play();
// }

// const playLoseAudio = () => {
//     audio.src = './assets/audio/lose-sound.wav';
//     audio.play();
// }

// const playSetFlagAudio = () => {
//     audio.src = './assets/audio/flag-tone.wav';
//     audio.play();
// }