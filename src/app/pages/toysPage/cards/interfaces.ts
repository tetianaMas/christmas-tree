import Observer from '../../../utils/Observer';
import { ActiveFilters } from '../types';
import Card from './card/card';

export interface ICard {
  getTemplate: () => HTMLElement;
}

export interface ICardsController {
  createCards: (parent: HTMLElement, callback: (e: Event) => void) => Promise<void>;
  filterCards: (fieldToFilter: Array<ActiveFilters>) => void;
  sortCards: (value: string) => void;
  addToFav: (card: HTMLElement) => void;
  resetSettings: () => void;
}

export interface ICardsModel {
  cardDataChanged: Observer<Array<Card>>;
  favDataChanged: Observer<number>;
  favDataFull: Observer<void>;
  toggleActiveClass: Observer<Set<Card>>;
  cardsElems: Array<Card>;
  createCards: () => Promise<void>;
  saveCardsFavData: () => void;
  filterData: (filterData: Array<ActiveFilters>) => void;
  sort: (value: string) => void;
  addToFav: (cardElem: HTMLElement) => void;
  removeDataFromLs: () => void;
}

export interface ICardsView {
  rootElement: HTMLElement;
  render: (data: Card[]) => void;
  setEvent: (callback: (e: Event) => void) => void;
  toggleClass: (cards: Set<Card>) => void;
  renderCardsInfo: (num?: number) => void;
}
