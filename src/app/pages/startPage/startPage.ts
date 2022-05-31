import NodeFactory from '../../utils/NodeFactory';
import { IStartPage } from './interfaces';

const START_BTN_TEXT = 'start';
const TITLE = 'Christmas tree';
const SUBTITLE = 'Choose decorations and bring to live your idea of the perfect christmas tree!';

export default class StartPage implements IStartPage {
  private rootElem: HTMLElement;

  constructor() {
    this.rootElem = document.createElement('div');
    this.rootElem.className = 'start-page';
  }

  public createPage(parentElem: HTMLElement, callback: () => void): void {
    parentElem.innerHTML = '';
    this.rootElem.innerHTML = '';
    parentElem.className = 'main';
    const btn = this.getStartBtn();
    btn.onclick = () => callback();
    const title = this.getTitle();
    const subtitle = this.getSubtitle();
    const wrapper = this.getWrapper();
    title.append(subtitle);
    wrapper.append(title, btn);
    this.rootElem.append(wrapper);
    parentElem.innerHTML = '';
    parentElem.append(this.rootElem);
  }

  private getWrapper(): HTMLElement {
    return NodeFactory.getNode('div', 'start-page__wrapper', '');
  }

  private getTitle(): HTMLElement {
    return NodeFactory.getNode('h1', 'start-page__title', TITLE);
  }

  private getSubtitle(): HTMLElement {
    return NodeFactory.getNode('span', 'start-page__subtitle', SUBTITLE);
  }

  private getStartBtn(): HTMLElement {
    return NodeFactory.getNode('button', 'btn start-page__btn', START_BTN_TEXT);
  }
}
