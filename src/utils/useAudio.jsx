export function playAudio(audio, volume, startTime = 0) {
  audio.volume = volume;
  audio.currentTime = startTime;
  audio.play();
}
