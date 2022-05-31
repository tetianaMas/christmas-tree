import NodeFactory from '../../../utils/NodeFactory';
import Card from '../../toysPage/cards/card/card';
import { ISettingsData } from '../interfaces';
import { IMenuView } from './interfaces';
import MenuModel from './menuModel';
import leftPanel from './templates/leftPanel';
import rightPanel from './templates/rightPanel';

export enum ButtonAmount {
  treeBtns = 6,
  bgBtns = 4,
  lightsBtns = 5,
}

export default class MenuView implements IMenuView {
  private model: MenuModel;

  private rootNode: HTMLElement | null;

  constructor(model: MenuModel) {
    this.rootNode = null;
    this.model = model;
    this.model.cardsUpdate.subscribe(this.drawCards.bind(this));
    this.model.menuUpdate.subscribe(this.drawLeftPanel.bind(this));
  }

  private drawCards(cards: Card[]): void {
    const cardsTemplate = this.getCardsTemplate(cards);
    if (this.rootNode) {
      const rightPanelElem = this.rootNode.querySelector('.menu--right');
      if (!rightPanelElem) {
        this.rootNode.insertAdjacentHTML('beforeend', rightPanel());
      }
      const wrapper = this.rootNode.querySelector('.menu--right .menu__item__wrapper');
      if (wrapper) {
        wrapper.textContent = '';
        wrapper.append(cardsTemplate);
      }
      const btnLights = <HTMLElement>this.rootNode.querySelector('.btn--toggler');

      if (btnLights) {
        btnLights.onclick = () => {
          btnLights.classList.toggle('active');
        };
      }
    }
  }

  public set root(rootElement: HTMLElement) {
    this.rootNode = rootElement;
  }

  private getCardsTemplate(cards: Card[]): DocumentFragment {
    const fragment = document.createDocumentFragment();

    cards.forEach((card: Card): void => {
      const cardSrc = `./assets/toys/${card.data.num}.png`;
      const imagesTemplate = this.getImages(Number(card.data.count), cardSrc, card.data.num);
      const wrapper = NodeFactory.getNode('div', 'menu__item__btn btn--toy', '');
      const counter = NodeFactory.getNode('span', 'toy-amount', `${card.data.count}`);
      wrapper.append(counter, imagesTemplate);
      fragment.append(wrapper);
    });

    return fragment;
  }

  private getImages(num: number, src: string, rowIndex: string): DocumentFragment {
    const fragment = document.createDocumentFragment();

    while (num > 0) {
      const cardImg = NodeFactory.getNode('img', 'card-fav', '');
      cardImg.setAttribute('src', `${src}`);
      cardImg.setAttribute('alt', 'toy image');
      cardImg.setAttribute('draggable', 'true');
      cardImg.id = `${rowIndex}-${Math.floor(Math.random() * 1000)}`;
      cardImg.ondragstart = function (e: DragEvent): void {
        e.dataTransfer?.setData('cardImage', cardImg.id);
        e.dataTransfer?.setData('parent', 'menu');
      };
      fragment.append(cardImg);

      num -= 1;
    }

    return fragment;
  }

  private drawLeftPanel(settings: ISettingsData): void {
    const template = this.getLeftMenuTemplate(settings);
    const panelWrapper = NodeFactory.getNode('div', 'menu--left', '');
    panelWrapper.innerHTML = template;

    if (this.rootNode) {
      this.rootNode.textContent = '';
      this.rootNode.insertAdjacentElement('beforeend', panelWrapper);
      const btnHide = <HTMLElement>this.rootNode?.querySelector('.btn-hide');
      const btnShow = <HTMLElement>document.querySelector('.btn-show');

      if (btnHide) {
        btnHide.onclick = () => {
          panelWrapper.classList.add('hide');
        };
      }

      if (btnShow) {
        btnShow.onclick = () => {
          panelWrapper.classList.remove('hide');
        };
      }
    }
  }

  private getLeftMenuTemplate(settings: ISettingsData) {
    const treeBtns = this.getBtns('btn--tree', 'data-tree', ButtonAmount.treeBtns, settings.tree);
    const bgBtns = this.getBtns('btn--bg', 'data-bg', ButtonAmount.bgBtns, settings.bg);
    const lightsBtns = this.getBtns('btn--lights', 'data-lights', ButtonAmount.lightsBtns, settings.lights);

    return leftPanel(settings, treeBtns, bgBtns, lightsBtns);
  }

  private getBtns(className: string, dataAttr: string, amount: number, activeBtn: number): string {
    let template = '';
    let index = amount;
    let counter = 1;

    while (index > 0) {
      const isActiveBtn = counter === activeBtn ? true : false;
      template += `<button class="menu__item__btn ${className} ${
        isActiveBtn ? 'active-elem' : ''
      }" ${dataAttr}="${counter}"></button>`;
      index -= 1;
      counter += 1;
    }

    return template;
  }
}
