import { IAudioManager } from './interfaces';

export default class AudioManager implements IAudioManager {
  private audio: HTMLAudioElement;

  constructor() {
    this.audio = new Audio();
    this.audio.src = './assets/music/music.mp3';
    this.audio.load();
  }

  public play(): void {
    if (this.audio.paused) {
      this.audio.play();
    }
  }

  public pause(): void {
    this.audio.pause();
  }

  set currentTime(time: number) {
    this.audio.currentTime = time;
  }
}
