import Observer from '../../../utils/Observer';
import { ActiveFilters } from '../types';
import { IToys } from '../interfaces';
import Card from './card/card';
import LocalStorageManager from '../../../utils/localStorageManager';
import { ICardsModel } from './interfaces';
import { SortType } from './types';

const MAX_FAV_CARDS = 20;

export default class CardsModel implements ICardsModel {
  public cardDataChanged: Observer<Array<Card>>;

  public favDataChanged: Observer<number>;

  public favDataFull: Observer<void>;

  public toggleActiveClass: Observer<Set<Card>>;

  public noDataToShow: Observer<void>;

  private dataCards: Array<IToys>;

  private cards: Array<Card>;

  private filteredCards: Array<Card>;

  private favCards: Set<Card>;

  private MAX_FAV_CARDS: number;

  private localStorage: LocalStorageManager;

  constructor() {
    this.dataCards = [];
    this.cards = [];
    this.filteredCards = [];
    this.favCards = new Set();
    this.MAX_FAV_CARDS = MAX_FAV_CARDS;
    this.localStorage = new LocalStorageManager();
    this.cardDataChanged = new Observer();
    this.favDataChanged = new Observer();
    this.favDataFull = new Observer();
    this.toggleActiveClass = new Observer();
    this.noDataToShow = new Observer();
  }

  public async createCards(): Promise<void> {
    await this.getCardsData();
    this.cards = [];

    this.dataCards.forEach((elem: IToys) => {
      const card = new Card(elem);
      this.cards.push(card);
    });
    this.getCardsFavData();
  }

  public updateView(data: Card[]): void {
    this.cardDataChanged.notify(data);
    this.favDataChanged.notify(this.favCards.size);
    this.toggleActiveClass.notify(this.favCards);
    if (!data.length) {
      this.noDataToShow.notify();
    }
  }

  private async getCardsData(): Promise<void> {
    try {
      const obj = await fetch('./assets/json/data.json');
      this.dataCards = (await obj.json()) as Array<IToys>;
    } catch (err) {
      console.log(err);
    }
  }

  private getCardsFavData(): void {
    const favCardsIds = this.localStorage.getValue<Array<string>>('cards-fav');
    this.favCards = new Set();

    if (favCardsIds && favCardsIds.length) {
      const favCards = favCardsIds.map((id: string) =>
        this.cards.find((card: Card) => Number(card.cardData.num) === Number(id))
      );
      if (favCards.length) {
        this.favCards = new Set();
        favCards.forEach((card?: Card) => {
          if (card) {
            card.setFav = true;
            this.favCards.add(card);
          }
        });
      }
    }
  }

  public saveCardsFavData(): void {
    if (this.favCards.size) {
      const cardsFavIds = [...this.favCards].map((card: Card) => card.cardData.num);
      this.localStorage.setValue<Array<string>>('cards-fav', cardsFavIds);
    }
  }

  get cardsElems(): Array<Card> {
    return this.cards;
  }

  public filterData(filterData: Array<ActiveFilters>): void {
    if (!filterData.length) {
      this.filteredCards = [];
      return;
    }
    this.filteredCards = this.cards;

    filterData.forEach((filter: ActiveFilters) => {
      if (filter.type !== 'year' && filter.type !== 'count') {
        this.filteredCards = this.filter(filter, this.filteredCards);
      }
    });

    filterData.forEach((filter: ActiveFilters) => {
      if (filter.type === 'year' || filter.type === 'count') {
        this.filteredCards = this.filterRange(filter, this.filteredCards, filter.type);
      }
    });
  }

  private filter(filter: ActiveFilters, cards: Card[]): Card[] {
    const arr: Card[] = [];
    const type = filter.type as keyof IToys;
    const values = filter.name as Array<keyof IToys>;

    const filtered = cards.filter((card: Card) => {
      const elemFiltered = values.find((value: keyof IToys) => value === card.cardData[type]);

      if (elemFiltered) {
        return elemFiltered;
      }
    });
    arr.push(...filtered);
    return arr;
  }

  private filterRange(filter: ActiveFilters, cards: Card[], type: string): Card[] {
    const arr: Card[] = [];
    const values = filter.name;

    cards.forEach((card: Card) => {
      const cardVal = Number(card.cardData[type as keyof IToys]);
      const min = Number(values[0]);
      const max = Number(values[1]);

      if (cardVal >= min && cardVal <= max) {
        arr.push(card);
      }
    });

    return arr;
  }

  public sort(value: string): void {
    const currCards = this.filteredCards;

    const sortTypes: SortType = {
      'name-to-max': (cards: Card[]) => this.sortByNameMax(cards),
      'name-to-min': (cards: Card[]) => this.sortByNameMin(cards),
      'count-max': (cards: Card[]) => this.sortByCountMax(cards),
      'count-min': (cards: Card[]) => this.sortByCountMin(cards),
      '': (cards: Card[]) => this.sortByNameMax(cards),
    };

    sortTypes[value](currCards);
    this.updateView(currCards);
  }

  private sortByNameMax(currCards: Card[]): void {
    currCards.sort((a: Card, b: Card) => {
      const firstName = a.cardData.name.toLowerCase();
      const secondName = b.cardData.name.toLowerCase();
      if (firstName < secondName) {
        return -1;
      }
      if (firstName > secondName) {
        return 1;
      }
      return 0;
    });
  }

  private sortByNameMin(currCards: Card[]): void {
    currCards.sort((a: Card, b: Card) => {
      const firstName = a.cardData.name.toLowerCase();
      const secondName = b.cardData.name.toLowerCase();
      if (firstName < secondName) {
        return 1;
      }
      if (firstName > secondName) {
        return -1;
      }
      return 0;
    });
  }

  private sortByCountMax(currCards: Card[]): void {
    currCards.sort((a: Card, b: Card) => {
      const firstYear = Number(a.cardData.year);
      const secondYear = Number(b.cardData.year);
      if (firstYear < secondYear) {
        return -1;
      }
      if (firstYear > secondYear) {
        return 1;
      }
      return 0;
    });
  }

  private sortByCountMin(currCards: Card[]): void {
    currCards.sort((a: Card, b: Card) => {
      const firstYear = Number(a.cardData.year);
      const secondYear = Number(b.cardData.year);
      if (firstYear < secondYear) {
        return 1;
      }
      if (firstYear > secondYear) {
        return -1;
      }
      return 0;
    });
  }

  public addToFav(cardElem: HTMLElement): void {
    const card = this.cards.find((currCard: Card) => currCard.cardData.num === cardElem.id);
    if (card) {
      if (this.favCards.has(card)) {
        this.favCards.delete(card);
        card.setFav = false;
      } else if (this.favCards.size < this.MAX_FAV_CARDS) {
        this.favCards.add(card);
        card.setFav = true;
      } else {
        this.favDataFull.notify();
        return;
      }
      this.favDataChanged.notify(this.favCards.size);
      this.saveCardsFavData();
    }
  }

  private clearFavCards() {
    const favCards = [...this.favCards];
    favCards.forEach((favCard: Card) => {
      const currCard = this.cards.find((card: Card) => favCard.cardData.num === card.cardData.num);
      if (currCard) {
        currCard.setFav = false;
      }
    });

    this.favCards = new Set();
  }

  public removeDataFromLs(): void {
    this.clearFavCards();
    this.localStorage.removeData('cards-fav');
    this.favDataChanged.notify(this.favCards.size);
    this.cardDataChanged.notify(this.cards);
  }

  async getfavData(): Promise<Card[]> {
    await this.createCards();

    if (this.favCards.size) {
      return [...this.favCards];
    } else {
      return this.cards.slice(0, 20);
    }
  }
}
