import { IFilter, IFilterData, IFilterSort } from '../../interfaces';
import sortTemplate from './sortTemplate';
import './sort.scss';

export default class FilterSort implements IFilter {
  private data: IFilterData;

  constructor(data: IFilterData) {
    this.data = data;
  }

  public getTemplate(): string {
    const optionsTemplate = this.createOptionsTemplate(this.data.children as unknown as IFilterSort[]);

    return sortTemplate(this.data, optionsTemplate);
  }

  private createOptionsTemplate(sortFilters: IFilterSort[]): string {
    let template = '';

    sortFilters.forEach((child: IFilterSort) => {
      template += `<option class="filter__option" value="${child.type}" ${child.isActive ? 'selected' : ''}>${
        child.title
      }</option>`;
    });

    return template;
  }
}
