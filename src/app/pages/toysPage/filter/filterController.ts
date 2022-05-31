import * as noUiSlider from 'nouislider';
import { target } from 'nouislider';
import 'nouislider/dist/nouislider.css';
import Constants from '../../../utils/constants';
import Search from '../search/search';
import FilterModel from './filterModel';
import FilterView from './filterView';
import { ActiveFilters } from '../types';
import { IFilterController, IFilterRange } from './interfaces';

export default class FilterController implements IFilterController {
  private model: FilterModel;

  private view: FilterView;

  private search: Search;

  private root: HTMLElement | null = null;

  constructor() {
    this.model = new FilterModel();
    this.view = new FilterView(this.model);
    this.search = new Search();
    window.addEventListener('beforeunload', () => this.saveData());
  }

  public createFilters(parent: HTMLElement, callback: (e: Event) => void): void {
    if (this.root) {
      this.root.textContent = '';
    }
    this.root = parent;
    this.model.getFiltersDataFromLs();
    this.view.setEvent(callback);

    this.view.renderSearchElement(this.search.getSearchNode());
    parent.append(this.view.rootElement);

    const searchNode = this.search.getSearchNode();
    if (searchNode) {
      parent.append(searchNode);
    }
  }

  public getActiveFilterData(): Array<ActiveFilters> {
    return this.model.getAllActiveFilters();
  }

  public setActiveFilterData(dataFilter: string): void {
    this.model.setFilterData(dataFilter);
  }

  public getSortData(): string {
    return this.model.getSortData();
  }

  public toggleActiveClass(elem: HTMLElement): void {
    this.view.toogleActiveClass(elem, 'active');
  }

  public setSortData(value: string): void {
    this.model.setSortData(value);
  }

  public setRangeData(str: string, val: (string | number)[]): void {
    this.model.setRangeData(str, val);
  }

  public setDefaultFilters(): void {
    const currSortData = this.getSortData();
    this.model.setDefaultFilters();
    this.setSortData(currSortData);
    this.saveData();
    this.model.createFilters();
    this.view.renderSearchElement(this.search.getSearchNode());
    this.search.clearValue(this.root);
  }

  public resetSettings(): void {
    this.model.removeDataFromLs();
    this.model.setDefaultFilters();
    this.model.createFilters();
    this.view.renderSearchElement(this.search.getSearchNode());
    this.search.clearValue(this.root);
  }

  public saveData(): void {
    this.model.saveFiltersData();
  }

  public initRangeSlider(handleClickCallback: (str: string, val: (string | number)[]) => void): void {
    const rangeCount = document.getElementById('range-count') as target;
    const rangeYear = document.getElementById('range-year') as target;
    const countMin = document.getElementById('range-count-min') as HTMLElement;
    const countMax = document.getElementById('range-count-max') as HTMLElement;
    const yearMin = document.getElementById('range-year-min') as HTMLElement;
    const yearMax = document.getElementById('range-year-max') as HTMLElement;
    const dataRange = this.model.getFilterDataByType<IFilterRange>('range');
    const rangeCountData = dataRange?.find((filter: IFilterRange) => filter.type === 'count');
    const rangeYearData = dataRange?.find((filter: IFilterRange) => filter.type === 'year');

    noUiSlider.create(rangeCount, <noUiSlider.Options>Constants.rangeCountOpts(rangeCountData?.data));
    noUiSlider.create(rangeYear, <noUiSlider.Options>Constants.rangeYearOpts(rangeYearData?.data));

    this.hangleRangeValue(rangeCount, countMin, countMax, 'count', handleClickCallback);
    this.hangleRangeValue(rangeYear, yearMin, yearMax, 'year', handleClickCallback);
  }

  private hangleRangeValue(
    rangeEl: target,
    min: HTMLElement,
    max: HTMLElement,
    type: string,
    callback: (str: string, val: (string | number)[]) => void
  ): void {
    rangeEl.noUiSlider?.on('change', (values) => {
      callback(type, values);
    });
    rangeEl.noUiSlider?.on('update', (values, handle) => {
      if (handle) {
        max.innerHTML = String(values[handle]);
      } else {
        min.innerHTML = String(values[handle]);
      }
    });
  }
}
