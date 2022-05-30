import { IToys } from '../../interfaces';
import cardTemplate from './cardTemplate';
import { ICard } from '../interfaces';
import './card.scss';

export default class Card implements ICard {
  private rootElem: HTMLElement;

  public data: IToys;

  private isFavorite: boolean;

  constructor(data: IToys) {
    this.rootElem = document.createElement('div');
    this.rootElem.className = 'card';
    this.rootElem.id = data.num;
    this.rootElem.setAttribute('data-card', 'fav');
    this.data = data;
    this.isFavorite = false;
  }

  public getTemplate(): HTMLElement {
    this.rootElem.textContent = '';
    this.rootElem.insertAdjacentHTML('afterbegin', cardTemplate(this.data));
    return this.rootElem;
  }

  get root(): HTMLElement {
    return this.rootElem;
  }

  get cardData(): IToys {
    return this.data;
  }

  get isFav(): boolean {
    return this.isFavorite;
  }

  set setFav(value: boolean) {
    if (typeof value === 'boolean') {
      if (value) {
        this.rootElem.classList.add('active');
      } else {
        this.rootElem.classList.remove('active');
      }
      this.isFavorite = value;
    }
  }
}
