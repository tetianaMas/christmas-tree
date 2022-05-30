import Observer from '../../../utils/Observer';
import { ActiveFilters } from '../types';

export interface IFilter {
  getTemplate: (children?: string) => string;
}

interface IFilterValueItem {
  name: string;
  isActive: boolean;
}

export interface IFilterRange {
  title: string;
  type: string;
  data: [string | number, string | number];
}

export interface IFilterSort {
  title: string;
  type: string;
  isActive: boolean;
}

export interface IFilterValue {
  title: string;
  type: string;
  data: Array<IFilterValueItem>;
}

export interface IFilterData {
  title: string;
  type: string;
  children: Array<IFilterRange | IFilterValue | IFilterSort>;
}

export interface IFilterModel {
  cardDataChanged: Observer<Array<IFilterData>>;
  filterData: Array<IFilterData>;
  createFilters: () => void;
  getFiltersDataFromLs: () => void;
  saveFiltersData: () => void;
  setFilterData: (elemToFind: string) => void;
  getAllActiveFilters: () => Array<ActiveFilters>;
  setSortData: (value: string) => void;
  getSortData: () => string;
  setRangeData: (type: string, val: (string | number)[]) => void;
  getFilterDataByType: <T>(str: string) => Array<T> | null;
  setDefaultFilters: () => void;
  removeDataFromLs: () => void;
}

export interface IFilterView {
  rootElement: HTMLElement;
  setEvent: (callback: (e: Event) => void) => void;
  toogleActiveClass: (elem: HTMLElement, className: string) => void;
  renderSearchElement: (elemSearch: HTMLElement) => void;
}

export interface IFilterController {
  createFilters: (parent: HTMLElement, callback: (e: Event) => void) => void;
  getActiveFilterData: () => Array<ActiveFilters>;
  setActiveFilterData: (dataFilter: string) => void;
  getSortData: () => string;
  toggleActiveClass: (elem: HTMLElement) => void;
  setSortData: (value: string) => void;
  setRangeData: (str: string, val: (string | number)[]) => void;
  setDefaultFilters: () => void;
  resetSettings: () => void;
  saveData: () => void;
  initRangeSlider: (handleClickCallback: (str: string, val: (string | number)[]) => void) => void;
}

export interface IFilterFactory {
  getFilterElems: (filters: Array<IFilterData>) => IFilter[];
}
