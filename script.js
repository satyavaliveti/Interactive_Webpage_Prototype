<<<<<<< HEAD
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
=======
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const waveSelect = document.getElementById("waveSelect");
const pitchSlider = document.getElementById("pitchSlider");
const pitchText = document.getElementById("pitchText");
const volumeSlider = document.getElementById("volumeSlider");
const volumeText = document.getElementById("volumeText");
const waveCanvas = document.getElementById("waveCanvas");
const canvasContext = waveCanvas.getContext("2d");

let audioContext;
let oscillator;
let gain;
let analyser;
let waveData;
let animationId;

startButton.onclick = function () {
  if (!audioContext) {
    audioContext = new AudioContext();
  }

  oscillator = audioContext.createOscillator();
  gain = audioContext.createGain();
  analyser = audioContext.createAnalyser();

  oscillator.type = waveSelect.value;
  oscillator.frequency.value = pitchSlider.value;
  gain.gain.value = volumeSlider.value / 100;
  analyser.fftSize = 2048;
  waveData = new Uint8Array(analyser.frequencyBinCount);

  oscillator.connect(gain);
  gain.connect(analyser);
  analyser.connect(audioContext.destination);
  oscillator.start();
  drawLiveWave();

  startButton.disabled = true;
  stopButton.disabled = false;
};

stopButton.onclick = function () {
  if (oscillator) {
    oscillator.stop();
    oscillator.disconnect();
    oscillator = null;
  }

  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }

  clearWaveCanvas();
  startButton.disabled = false;
  stopButton.disabled = true;
};

waveSelect.onchange = function () {
  if (oscillator) {
    oscillator.type = waveSelect.value;
  }
};

pitchSlider.oninput = function () {
  pitchText.textContent = pitchSlider.value;

  if (oscillator) {
    oscillator.frequency.value = pitchSlider.value;
  }
};

volumeSlider.oninput = function () {
  volumeText.textContent = volumeSlider.value;

  if (gain) {
    gain.gain.value = volumeSlider.value / 100;
  }
};

function drawLiveWave() {
  if (!analyser || !waveData) {
    return;
  }

  animationId = requestAnimationFrame(drawLiveWave);
  analyser.getByteTimeDomainData(waveData);

  canvasContext.fillStyle = "#15192b";
  canvasContext.fillRect(0, 0, waveCanvas.width, waveCanvas.height);

  canvasContext.lineWidth = 2;
  canvasContext.strokeStyle = "#66e3ff";
  canvasContext.beginPath();

  const sliceWidth = waveCanvas.width / waveData.length;
  let x = 0;

  for (let i = 0; i < waveData.length; i++) {
    const y = (waveData[i] / 255) * waveCanvas.height;

    if (i === 0) {
      canvasContext.moveTo(x, y);
    } else {
      canvasContext.lineTo(x, y);
    }

    x += sliceWidth;
  }

  canvasContext.stroke();
}

function clearWaveCanvas() {
  canvasContext.fillStyle = "#15192b";
  canvasContext.fillRect(0, 0, waveCanvas.width, waveCanvas.height);

  canvasContext.strokeStyle = "#66e3ff";
  canvasContext.beginPath();
  canvasContext.moveTo(0, waveCanvas.height / 2);
  canvasContext.lineTo(waveCanvas.width, waveCanvas.height / 2);
  canvasContext.stroke();
}

clearWaveCanvas();
>>>>>>> 74e59d6 (Add live audio waveform visualizer)
