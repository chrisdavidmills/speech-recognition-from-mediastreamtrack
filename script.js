const recognition = new SpeechRecognition();
recognition.lang = "en-US";
// recognition.maxAlternatives = 1;

const startBtn = document.querySelector("button");
const diagnostic = document.querySelector(".output");

let audioElement;
let audioTrack;

startBtn.addEventListener("click", () => {
  console.log("Loading audio track");
  audioElement = new Audio("cheese-on-toast.mp3");
  audioElement.addEventListener("canplay", () => {
    const stream = audioElement.captureStream();
    audioTrack = stream.getAudioTracks()[0];
    audioElement.play();
    recognition.start(audioTrack);
    console.log("Recognition started");
    audioElement.addEventListener("ended", () => {
      recognition.stop();
    });
  });
});

recognition.addEventListener("result", (event) => {
  const speech = event.results[0][0].transcript;
  diagnostic.textContent = "Result received: " + speech + ".";
  console.log("Confidence: " + event.results[0][0].confidence);
});

recognition.addEventListener("speechend", () => {
  console.log("Speech ended");
  recognition.stop();
});

recognition.addEventListener("soundend", () => {
  console.log("Sound ended");
  recognition.stop();
});

recognition.addEventListener("audioend", () => {
  console.log("Audio capture ended");
  recognition.stop();
});

recognition.addEventListener("end", () => {
  console.log("Speech recognition ended");
  recognition.stop();
});

recognition.addEventListener("nomatch", (event) => {
  diagnostic.textContent = "I didn't recognise that speech.";
});

recognition.addEventListener("error", (event) => {
  diagnostic.textContent = "Error occurred in recognition: " + event.error;
});
