import NodeFactory from '../../../utils/NodeFactory';
import ISearch from './ISearch';

const SEARCH_DELAY = 500;

export default class Search implements ISearch {
  private sources: NodeListOf<Element> | null;

  constructor() {
    this.sources = null;
  }

  public getSearchNode(): HTMLElement | null {
    const inputElem = this.createInputElem();
    const rootElem = this.createRootElem();

    if (!inputElem || !rootElem) {
      return null;
    }

    const formNode = this.createSearchForm(inputElem);
    rootElem.append(formNode);
    this.initSearchEvent(inputElem);

    return rootElem;
  }

  private createSearchForm(inputElem: HTMLInputElement): HTMLElement {
    const formNode = NodeFactory.getNode('form', 'search', '');
    const btnNode = NodeFactory.getNode('button', 'search__close-btn', '');
    btnNode.onclick = (e: Event) => this.clearInput(inputElem, e);
    formNode.append(inputElem, btnNode);

    return formNode;
  }

  private createRootElem(): HTMLElement {
    const rootElem = document.createElement('div');
    rootElem.className = 'filter-panel__item';

    return rootElem;
  }

  private createInputElem(): HTMLInputElement {
    const inputElem = NodeFactory.getNode('input', 'search__input', '') as HTMLInputElement;
    inputElem.setAttribute('type', 'search');
    inputElem.setAttribute('autofocus', '');
    inputElem.setAttribute('autocomplete', 'off');
    inputElem.setAttribute('placeholder', 'Search...');

    return inputElem;
  }

  public initSearchEvent(inputNode: HTMLInputElement | null): void {
    if (!inputNode) {
      return;
    }
    let typingTimer: ReturnType<typeof setTimeout>;
    const typeInterval = SEARCH_DELAY;

    inputNode.onkeyup = (): void => {
      clearTimeout(typingTimer);
      typingTimer = setTimeout((): void => this.search(inputNode), typeInterval);
    };
  }

  private search(inputNode: HTMLInputElement): void {
    if (!inputNode) {
      return;
    }
    const searchRegexp = this.getSearchRegexp(inputNode.value);
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

  private clearInput(inputNode: HTMLInputElement | null, e?: Event): void {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    this.showSources();
    if (inputNode) {
      inputNode.value = '';
      inputNode.focus();
    }

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

  public clearValue(parent: HTMLElement | null): void {
    if (!parent) {
      return;
    }
    const inputs = parent.querySelectorAll('.search__input') as NodeListOf<HTMLInputElement>;
    [...inputs].forEach((input) => this.clearInput(input));
  }
}
