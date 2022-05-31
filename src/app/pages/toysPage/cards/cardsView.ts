import popup from '../../../components/popup/popup';
import NodeFactory from '../../../utils/NodeFactory';
import Card from './card/card';
import CardsModel from './cardsModel';
import infoCardsTemplate from './infoCardsTemplate';
import { ICardsView } from './interfaces';
import './cards.scss';

export default class CardsView implements ICardsView {
  private model: CardsModel;

  private rootElem: HTMLElement;

  private wrapperElem: HTMLElement;

  private infoElem: HTMLElement;

  private noDataElem: HTMLElement;

  constructor(model: CardsModel) {
    this.rootElem = document.createElement('div');
    this.rootElem.className = 'cards';
    this.wrapperElem = document.createElement('div');
    this.wrapperElem.className = 'cards__wrapper';
    this.infoElem = document.createElement('div');
    this.infoElem.className = 'cards__info';
    this.noDataElem = NodeFactory.getNode('div', 'no-search-data hidden', 'No data to show.');
    this.model = model;
    this.model.cardDataChanged.subscribe(this.render.bind(this));
    this.model.favDataChanged.subscribe(this.renderCardsInfo.bind(this));
    this.model.toggleActiveClass.subscribe(this.toggleClass.bind(this));
    this.model.noDataToShow.subscribe(this.showNoDataMessage.bind(this));
    this.model.favDataFull.subscribe(this.showPopUp.bind(this));
  }

  public render(data: Card[]): void {
    this.rootElem.textContent = '';
    this.rootElem.scrollTop = 0;
    this.wrapperElem.textContent = '';
    this.rootElem.append(this.infoElem);
    this.renderCardsInfo();
    this.renderNoSearchInfo();
    this.hideNoDataMessage();

    data.forEach((elem: Card): void => {
      this.wrapperElem.insertAdjacentElement('beforeend', elem.getTemplate());
    });
    this.rootElem.append(this.wrapperElem);
  }

  get rootElement(): HTMLElement {
    return this.rootElem;
  }

  public setEvent(callback: (e: Event) => void): void {
    this.wrapperElem.onclick = (e: Event): void => callback(e);
  }

  public toggleClass(cards: Set<Card>): void {
    const cardsArr = [...cards];
    cardsArr.forEach((card: Card) => {
      if (card.isFav) {
        card.root.classList.add('active');
      } else {
        card.root.classList.remove('active');
      }
    });
  }

  public renderCardsInfo(num = 0): void {
    this.infoElem.textContent = '';
    this.infoElem.insertAdjacentHTML('afterbegin', infoCardsTemplate('decorations', num));
  }

  private renderNoSearchInfo(): void {
    this.wrapperElem.insertAdjacentElement('afterbegin', this.noDataElem);
  }

  private showNoDataMessage(): void {
    this.noDataElem?.classList.remove('hidden');
  }

  private hideNoDataMessage(): void {
    this.noDataElem?.classList.add('hidden');
  }

  private showPopUp(): void {
    document.body.insertAdjacentHTML('beforeend', popup());
    const overflowElem = document.getElementById('overflow');
    const popupElem = document.getElementById('popup');
    if (overflowElem && popupElem) {
      overflowElem.onclick = () => {
        this.hidePopUp(overflowElem, popupElem);
      };
      popupElem.onclick = () => {
        this.hidePopUp(overflowElem, popupElem);
      };
    }
  }

  private hidePopUp(overflowElem: HTMLElement, popupElem: HTMLElement): void {
    overflowElem.remove();
    popupElem.remove();
  }
}
