import Observer from '../../../utils/Observer';
import Card from '../../toysPage/cards/card/card';
import { IToys } from '../../toysPage/interfaces';
import { ISettingsData } from '../interfaces';

export interface IMenuController {
  settings: ISettingsData;
  createPage: (favCards: Card[], node: HTMLElement, callback: (e: Event) => void) => void;
  getCardById: (id: string) => IToys | void;
  decreaseCardAmount: (cardId: string) => void;
  increaseCardAmount: (cardId: string) => void;
  setBg: (bgData: string) => void;
  setTree: (data: string) => void;
  setLights: (data: string) => void;
  setSnowValue: (value: boolean) => void;
  setVolumeValue: (value: boolean) => void;
  setDefaultSettings: () => void;
}

export interface IMenuModel {
  cardsUpdate: Observer<Card[]>;
  menuUpdate: Observer<ISettingsData>;
  favoriteCards: Card[];
  settingsData: ISettingsData;
  getMenuData: () => void;
  setFavCards: (cards: Card[]) => void;
  updateFavCards: () => void;
  setBg: (value: string) => void;
  setTree: (data: string) => void;
  setLights: (data: string) => void;
  setSnow: (value: boolean) => void;
  setVolume: (value: boolean) => void;
  setDefSettings: () => void;
}

export interface IMenuView {
  root: HTMLElement;
}
