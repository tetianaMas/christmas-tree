import NodeFactory from '../../utils/NodeFactory';
import { IStartPage } from './interfaces';

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
    const wrapper = this.getWrapper();
    wrapper.append(title, btn);
    this.rootElem.append(wrapper);
    parentElem.innerHTML = '';
    parentElem.append(this.rootElem);
  }

  private getWrapper(): HTMLElement {
    return NodeFactory.getNode('div', 'start-page__wrapper', '');
  }

  private getTitle(): HTMLElement {
    return NodeFactory.getNode('h1', 'start-page__title', 'помогите бабушке нарядить ёлку');
  }

  private getStartBtn(): HTMLElement {
    return NodeFactory.getNode('button', 'btn start-page__btn', 'начать');
  }
}
