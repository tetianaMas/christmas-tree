import FilterRange from './views/range/filterRange';
import FilterSort from './views/sort/filterSort';
import FilterValue from './views/value/filterValue';
import { IFilterData, IFilter, IFilterFactory } from './interfaces';

export default class FilterFactory implements IFilterFactory {
  private createFilter(elem: IFilterData): IFilter | never {
    switch (elem.type) {
    case 'value':
      return new FilterValue(elem);
    case 'range':
      return new FilterRange(elem);
    case 'sort':
      return new FilterSort(elem);
    default:
      throw new Error('No such type filter!');
    }
  }

  public getFilterElems(filters: Array<IFilterData>): IFilter[] {
    return filters.map((filter: IFilterData) => this.createFilter(filter));
  }
}
