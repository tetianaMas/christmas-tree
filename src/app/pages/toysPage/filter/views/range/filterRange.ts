import { IFilter, IFilterData, IFilterRange } from '../../interfaces';
import rangeTemplate from './rangeTemplate';

export default class FilterRange implements IFilter {
  private data: IFilterData;

  constructor(data: IFilterData) {
    this.data = data;
  }

  public getTemplate(): string {
    let rangeTemp = '';
    rangeTemp = this.getRangesTemplate(this.data.children as unknown as IFilterRange[]);

    return rangeTemplate(this.data, rangeTemp);
  }

  private getRangesTemplate(data: IFilterRange[]): string {
    let temp = '';

    data.forEach((item: IFilterRange): void => {
      const type = item.type === 'count' ? 'count' : 'year';

      temp += `<h4 class="filter__title">${item.title}:</h4>
      <div class="range-container">
        <span class="range-value" id="range-${type}-min"></span>
        <div class="range-slider" id="range-${type}"></div>
        <span class="range-value" id="range-${type}-max"></span>
      </div>`;
    });

    return temp;
  }
}
