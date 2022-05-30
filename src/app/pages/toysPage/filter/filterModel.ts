import Observer from '../../../utils/Observer';
import { FILTER_DATA } from './filterData';
import { ActiveFilters } from '../types';
import { IFilterData, IFilterRange, IFilterSort, IFilterValue, IFilterModel } from './interfaces';
import LocalStorageManager from '../../../utils/localStorageManager';

export default class FilterModel implements IFilterModel {
  private dataFilter: Array<IFilterData>;

  public cardDataChanged: Observer<Array<IFilterData>>;

  private localStorage: LocalStorageManager;

  constructor() {
    this.dataFilter = JSON.parse(JSON.stringify(FILTER_DATA));
    this.cardDataChanged = new Observer();
    this.localStorage = new LocalStorageManager();
  }

  get filterData(): Array<IFilterData> {
    return this.dataFilter;
  }

  public createFilters(): void {
    this.cardDataChanged.notify(this.filterData);
  }

  public getFiltersDataFromLs(): void {
    const filters = this.localStorage.getValue('filters');

    if (filters) {
      this.dataFilter = <Array<IFilterData>>filters;
    }

    this.cardDataChanged.notify(this.filterData);
  }

  public saveFiltersData(): void {
    this.localStorage.setValue('filters', this.filterData);
  }

  public setFilterData(elemToFind: string): void {
    const elemToFindArr = elemToFind.split('-');
    const [type, value] = elemToFindArr;
    const allValueFilters = this.getFilterDataByType<IFilterValue>('value');
    const currValueFilter = allValueFilters?.find((item: IFilterValue) => item.type === type);

    if (currValueFilter) {
      const res = currValueFilter.data.find((item) => item.name === value);

      if (res) {
        res.isActive = !res.isActive;
      }
    }
  }

  public getAllActiveFilters(): Array<ActiveFilters> {
    const allValueFilters = this.getFilterDataByType<IFilterValue>('value');
    const allRangeFilters = this.getFilterDataByType<IFilterRange>('range');
    const result: Array<ActiveFilters> = [];

    allValueFilters?.forEach((filter: IFilterValue) => {
      filter.data.forEach((item): void => {
        if (item.isActive) {
          const typeExist = result.find((resItem) => resItem.type === filter.type);
          if (typeExist && Array.isArray(typeExist.name)) {
            typeExist.name.push(item.name as string);
          } else {
            result.push({ type: filter.type, name: [item.name] as string[] });
          }
        }
      });
    });

    allRangeFilters?.forEach((filter: IFilterRange): void => {
      result.push({
        type: filter.type,
        name: filter.data,
      });
    });

    return result;
  }

  public setSortData(value: string): void {
    const allSortTypes = this.getFilterDataByType<IFilterSort>('sort');
    allSortTypes?.forEach((type) => (type.isActive = false));
    const currType = allSortTypes?.find((type) => type.type === value);
    if (currType) {
      currType.isActive = true;
    }
  }

  public getSortData(): string {
    const allSortTypes = this.getFilterDataByType<IFilterSort>('sort');
    const currType = allSortTypes?.find((type: IFilterSort): boolean => type.isActive);

    if (currType && currType.type) {
      return currType.type;
    }

    return '';
  }

  public setRangeData(type: string, val: (string | number)[]): void {
    const allRangeTypes = this.getFilterDataByType<IFilterRange>('range');
    if (allRangeTypes) {
      const currType = allRangeTypes.find((filter) => filter.type === type);

      if (currType) {
        currType.data = [String(val[0]), String(val[1])];
      }
    }
  }

  public getFilterDataByType<T>(str: string): Array<T> | null {
    const currData = this.dataFilter.find((filter: IFilterData) => filter.type === str);
    if (currData) {
      return currData.children as unknown as Array<T>;
    }
    return null;
  }

  public setDefaultFilters(): void {
    this.dataFilter = JSON.parse(JSON.stringify(FILTER_DATA));
  }

  public removeDataFromLs() {
    this.localStorage.removeData('filters');
  }
}
