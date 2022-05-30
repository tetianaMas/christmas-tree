import FilterController from './filter/filterController';
import CardsController from './cards/cardsController';
import NodeFactory from '../../utils/NodeFactory';
import { IToysPage } from './interfaces';
import Card from './cards/card/card';

export default class ToysPage implements IToysPage {
  private cardsController: CardsController;

  private filterController: FilterController;

  private rootElem: HTMLElement;

  constructor() {
    this.rootElem = document.createElement('div');
    this.rootElem.className = 'toys-page';
    this.cardsController = new CardsController();
    this.filterController = new FilterController();
  }

  async createPage(node: HTMLElement): Promise<void> {
    node.className = 'main main--toys';
    node.textContent = '';
    this.rootElem.textContent = '';

    const container = NodeFactory.getNode('div', 'container', '');
    this.rootElem.append(container);
    node.append(this.rootElem);

    this.filterController.createFilters(container, this.handleFilterClick.bind(this));
    await this.cardsController.createCards(container, this.addToFav.bind(this));

    this.applyFilters();
    this.filterController.initRangeSlider(this.handleRangeClick.bind(this));
    this.focusInput();
  }

  public getFavCards(): Promise<Card[]> {
    return this.cardsController.getFavData();
  }

  private applyFilters(): void {
    this.filter();
    this.sort();
  }

  private focusInput() {
    const input = document.querySelector('.search__input') as HTMLElement;
    input.focus();
  }

  private handleFilterClick(e: Event): void {
    const currElem = e.target as HTMLElement;
    if (currElem.dataset.filter) {
      this.filterController.toggleActiveClass(currElem);
      this.filterController.setActiveFilterData(currElem.dataset.filter);
      this.applyFilters();
    }
    if (currElem.dataset.sort) {
      const elem = currElem as HTMLSelectElement;
      const activeSortType = this.filterController.getSortData();
      if (elem.value === activeSortType) {
        return;
      }
      this.filterController.setSortData(elem.value);
      this.sort();
    }
    if (currElem.dataset.reset) {
      const value = currElem.dataset.reset;
      if (value === 'filters') {
        this.resetFilters();
      } else if (value === 'settings') {
        this.resetSettings();
      }
    }
  }

  private filter(): void {
    const activeFilterData = this.filterController.getActiveFilterData();
    this.cardsController.filterCards(activeFilterData);
  }

  private sort(): void {
    const sortValue = this.filterController.getSortData();
    this.filterController.setSortData(sortValue);
    this.cardsController.sortCards(sortValue);
  }

  private addToFav(e: Event): void {
    const currElem = e.target as HTMLElement;
    let card;
    if (currElem.dataset.card) {
      card = currElem;
    } else if (currElem.closest('[data-card="fav"]')) {
      card = currElem.closest('[data-card="fav"]') as HTMLElement;
    }
    if (card) {
      this.cardsController.addToFav(card);
    }
  }

  private resetFilters() {
    this.filterController.setDefaultFilters();
    this.applyFilters();
    this.filterController.initRangeSlider(this.handleRangeClick.bind(this));
  }

  private resetSettings() {
    this.filterController.resetSettings();
    this.cardsController.resetSettings();

    this.applyFilters();
    this.filterController.initRangeSlider(this.handleRangeClick.bind(this));
  }

  private handleRangeClick(str: string, val: (string | number)[]): void {
    this.filterController.setRangeData(str, val);
    this.applyFilters();
  }
}
