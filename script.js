const startButton = document.getElementById("startButton");
const pitchSlider = document.getElementById("pitchSlider");
const pitchText = document.getElementById("pitchText");

let audioContext;
let oscillator;
let gain;

startButton.onclick = function () {
  audioContext = new AudioContext();

  oscillator = audioContext.createOscillator();
  gain = audioContext.createGain();

  oscillator.frequency.value = pitchSlider.value;
  gain.gain.value = 0.2;

  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();

  startButton.disabled = true;
};

pitchSlider.oninput = function () {
  pitchText.textContent = pitchSlider.value;

  if (oscillator) {
    oscillator.frequency.value = pitchSlider.value;
  }
};
