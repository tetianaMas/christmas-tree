import NodeFactory from '../../../utils/NodeFactory';
import ISearch from './ISearch';

const SEARCH_DELAY = 500;

export default class Search implements ISearch {
  private rootElem: HTMLElement;

  private inputNode: HTMLInputElement;

  private sources: NodeListOf<Element> | null;

  constructor() {
    this.rootElem = document.createElement('div');
    this.rootElem.className = 'filter-panel__item';
    this.inputNode = NodeFactory.getNode('input', 'search__input', '') as HTMLInputElement;
    this.sources = null;
  }

  get root(): HTMLElement {
    return this.rootElem;
  }

  public draw(): void {
    this.inputNode.setAttribute('type', 'search');
    this.inputNode.setAttribute('autofocus', '');
    this.inputNode.setAttribute('autocomplete', 'off');
    this.inputNode.setAttribute('placeholder', 'Поиск...');

    const formNode = NodeFactory.getNode('form', 'search', '');
    const btnNode = NodeFactory.getNode('button', 'search__close-btn', '');
    btnNode.onclick = (e: Event) => this.clearInput(e);

    this.rootElem.textContent = '';
    formNode.textContent = '';
    formNode.append(this.inputNode);
    formNode.append(btnNode);
    this.rootElem.append(formNode);

    this.initSearchEvent();
  }

  private initSearchEvent(): void {
    let typingTimer: ReturnType<typeof setTimeout>;
    const typeInterval = SEARCH_DELAY;

    this.inputNode.onkeyup = (): void => {
      clearTimeout(typingTimer);
      typingTimer = setTimeout((): void => this.search(), typeInterval);
    };
  }

  private search(): void {
    const searchRegexp = this.getSearchRegexp(this.inputNode.value);
    this.sources = document.querySelectorAll('.card') as NodeListOf<Element>;

    this.sources.forEach((src: Element): void => {
      const sourceValue = src.firstElementChild?.textContent?.toLowerCase();
      if (sourceValue) {
        if (sourceValue.match(searchRegexp)) {
          src.classList.remove('hidden');
        } else {
          src.classList.add('hidden');
        }
      }
    });
    this.checkLeftElems();
  }

  private getSearchRegexp(inputValue: string) {
    const valuesTemp = inputValue.trim().toLowerCase().split(' ');
    valuesTemp.forEach((value: string) => value.trim());
    const searchValue = `.*${valuesTemp.join('.*')}.*`;

    return new RegExp(searchValue, 'gm');
  }

  private clearInput(e: Event): void {
    e.preventDefault();
    this.showSources();
    this.inputNode.value = '';
    this.inputNode.focus();
    this.checkLeftElems();
  }

  private showSources(): void {
    this.sources?.forEach((source: Element) => source.classList.remove('hidden'));
  }

  private checkLeftElems(): void {
    const noSearchDataElem = document.querySelector('.no-search-data');
    if (this.sources?.length) {
      const activeElems = [...this.sources].filter((source: Element): boolean => !source.classList.contains('hidden'));
      if (activeElems.length) {
        noSearchDataElem?.classList.add('hidden');
      } else {
        noSearchDataElem?.classList.remove('hidden');
      }
    }
  }

  public clearValue(): void {
    this.inputNode.value = '';
  }
}
