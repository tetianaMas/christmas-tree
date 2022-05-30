import button from '../../../components/button';
import FilterFactory from './filterFactory';
import FilterModel from './filterModel';
import { IFilter, IFilterData, IFilterView } from './interfaces';
import './filter.scss';

export default class FilterView implements IFilterView {
  private model: FilterModel;

  private rootElem: HTMLElement;

  private filterFactory: FilterFactory;

  private filters: Array<IFilter>;

  constructor(model: FilterModel) {
    this.model = model;
    this.filterFactory = new FilterFactory();
    this.rootElem = document.createElement('div');
    this.rootElem.className = 'filter-panel';
    this.model.cardDataChanged.subscribe(this.render.bind(this));
    this.filters = [];
  }

  get rootElement(): HTMLElement {
    return this.rootElem;
  }

  private render(filterData: Array<IFilterData>): void {
    this.filters = this.filterFactory.getFilterElems(filterData);
    this.rootElem.textContent = '';

    this.rootElem.insertAdjacentHTML('afterbegin', this.getFiltersTemplate() + this.getButtonsTemplate());
  }

  private getButtonsTemplate(): string {
    const btnFilters = button('btn btn--reset', 'data-reset="filters"', 'Сбросить фильтры');
    const btnSettings = button('btn btn--reset', 'data-reset="settings"', 'Сбросить настройки');

    return btnFilters + btnSettings;
  }

  private getFiltersTemplate(): string {
    let template = '';

    this.filters.forEach((filter) => {
      template += filter.getTemplate();
    });

    return template;
  }

  public setEvent(callback: (e: Event) => void): void {
    this.rootElem.onclick = (e: Event) => callback(e);
  }

  public toogleActiveClass(elem: HTMLElement, className: string): void {
    elem.classList.toggle(className);
  }

  public renderSearchElement(elemSearch: HTMLElement): void {
    this.rootElem.insertAdjacentElement('afterbegin', elemSearch);
  }
}
