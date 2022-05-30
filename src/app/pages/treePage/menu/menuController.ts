import Card from '../../toysPage/cards/card/card';
import { IToys } from '../../toysPage/interfaces';
import { ISettingsData } from '../interfaces';
import { IMenuController } from './interfaces';
import MenuModel from './menuModel';
import MenuView from './menuView';

export default class MenuController implements IMenuController {
  private model: MenuModel;

  private view: MenuView;

  constructor() {
    this.model = new MenuModel();
    this.view = new MenuView(this.model);
  }

  public createPage(favCards: Card[], node: HTMLElement, callback: (e: Event) => void): void {
    node.onclick = (e: Event): void => callback(e);
    this.view.root = node;
    this.model.getMenuData();
    this.model.setFavCards(favCards);
  }

  public get settings(): ISettingsData {
    return this.model.settingsData;
  }

  public getCardById(id: string): IToys | void {
    const cardId = id.split('-')[0];
    const cards = this.model.favoriteCards;
    const card = cards.find((cardElem: Card) => String(cardElem.data.num) === cardId);
    if (card) {
      return card.data;
    }
  }

  public decreaseCardAmount(cardId: string): void {
    const id = cardId.split('-')[0];
    const cards = this.model.favoriteCards;
    const card = cards.find((cardElem: Card) => cardElem.data.num === id);
    if (card) {
      card.data.count = `${Number(card.data.count) - 1}`;
      this.model.updateFavCards();
    }
  }

  public increaseCardAmount(cardId: string): void {
    const id = cardId.split('-')[0];
    const cards = this.model.favoriteCards;
    const card = cards.find((cardElem) => cardElem.data.num === id);
    if (card) {
      card.data.count = `${Number(card.data.count) + 1}`;
      this.model.updateFavCards();
    }
  }

  public setBg(bgData: string): void {
    this.model.setBg(bgData);
  }

  public setTree(data: string): void {
    this.model.setTree(data);
  }

  public setLights(data: string): void {
    this.model.setLights(data);
  }

  public setSnowValue(value: boolean): void {
    this.model.setSnow(value);
  }

  public setVolumeValue(value: boolean): void {
    this.model.setVolume(value);
  }

  public setDefaultSettings(): void {
    this.model.setDefSettings();
  }
}
