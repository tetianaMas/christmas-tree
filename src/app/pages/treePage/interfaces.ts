import Card from '../toysPage/cards/card/card';

export interface ISettingsData {
  volume: boolean;
  snow: boolean;
  tree: number;
  bg: number;
  lights: number;
}

export interface ISnowFlake {
  x: number;
  y: number;
  opacity: number;
  speedX: number;
  speedY: number;
  radius: number;
}

export interface IAudioManager {
  currentTime: number;
  play: () => void;
  pause: () => void;
}

export interface ISnowManager {
  init: (elem: Element) => void;
  showSnow: () => void;
  hideSnow: () => void;
}

export interface ITreePage {
  createPage: (node: HTMLElement, favData: Array<Card>) => void;
}
