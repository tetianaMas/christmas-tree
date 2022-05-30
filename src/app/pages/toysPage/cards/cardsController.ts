import { ActiveFilters } from '../types';
import Card from './card/card';
import CardsModel from './cardsModel';
import CardsView from './cardsView';
import { ICardsController } from './interfaces';

export default class CardsController implements ICardsController {
  private model: CardsModel;

  private view: CardsView;

  constructor() {
    this.model = new CardsModel();
    this.view = new CardsView(this.model);
    window.addEventListener('beforeunload', () => this.saveData());
  }

  public async createCards(parent: HTMLElement, callback: (e: Event) => void): Promise<void> {
    parent.append(this.view.rootElement);
    this.view.setEvent(callback);
    await this.model.createCards();
  }

  public filterCards(fieldToFilter: Array<ActiveFilters>): void {
    this.model.filterData(fieldToFilter);
  }

  public sortCards(value: string): void {
    this.model.sort(value);
  }

  public addToFav(card: HTMLElement): void {
    this.model.addToFav(card);
  }

  public resetSettings(): void {
    this.model.removeDataFromLs();
  }

  public async getFavData(): Promise<Card[]> {
    const cards: Card[] = await this.model.getfavData();
    return cards;
  }

  private saveData() {
    this.model.saveCardsFavData();
  }
}
