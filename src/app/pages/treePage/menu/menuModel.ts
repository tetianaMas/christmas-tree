import LocalStorageManager from '../../../utils/localStorageManager';
import Observer from '../../../utils/Observer';
import Card from '../../toysPage/cards/card/card';
import { ISettingsData } from '../interfaces';
import { TTree } from '../tree.model';
import { IMenuModel } from './interfaces';
import SETTINGS from './settingsDefault';

export default class MenuModel implements IMenuModel {
  private localStorage: LocalStorageManager;

  private menuData: ISettingsData;

  private favCards: Card[];

  private favCardsDefault: Card[];

  public cardsUpdate: Observer<Card[]>;

  public menuUpdate: Observer<ISettingsData>;

  constructor() {
    this.menuData = { ...SETTINGS };
    this.favCardsDefault = [];
    this.favCards = [];
    this.localStorage = new LocalStorageManager();
    this.cardsUpdate = new Observer();
    this.menuUpdate = new Observer();
  }

  public getMenuData(): void {
    const settings = <ISettingsData>this.localStorage.getValue('settings');
    if (settings) {
      this.menuData = settings;
    }

    this.menuUpdate.notify(this.menuData);
  }

  public setFavCards(cards: Card[]): void {
    this.favCards = JSON.parse(JSON.stringify(cards));

    const cardsOnTree = <TTree[]>this.localStorage.getValue('toys-tree');
    if (cardsOnTree) {
      cardsOnTree.forEach((toy: TTree) => {
        const currCard = this.favCards.find((favCard: Card) => favCard.data.num === toy.data.num);
        if (currCard) {
          currCard.data.count = String(toy.data.count);
        }
      });
    }
    this.cardsUpdate.notify(this.favCards);
  }

  public get settingsData(): ISettingsData {
    return this.menuData;
  }

  public get favoriteCards(): Card[] {
    return this.favCards;
  }

  public updateFavCards(): void {
    this.cardsUpdate.notify(this.favCards);
  }

  public setBg(value: string): void {
    this.menuData.bg = Number(value);
    this.saveToLs(this.menuData);
  }

  public setTree(value: string): void {
    this.menuData.tree = Number(value);
    this.saveToLs(this.menuData);
  }

  public setLights(value: string): void {
    this.menuData.lights = Number(value);
    this.saveToLs(this.menuData);
  }

  private saveToLs(settings: ISettingsData): void {
    this.localStorage.setValue('settings', settings);
  }

  public setSnow(val: boolean): void {
    this.menuData.snow = val;
    this.saveToLs(this.menuData);
  }

  public setVolume(val: boolean): void {
    this.menuData.volume = val;
    this.saveToLs(this.menuData);
  }

  public setDefSettings() {
    this.menuData = { ...SETTINGS };
    this.saveToLs(this.menuData);
    this.localStorage.removeData('settings');
  }
}
