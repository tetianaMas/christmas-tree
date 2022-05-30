import { IFilterData } from '../../interfaces';
import './range.scss';

export default (data: IFilterData, rangeTemp: string): string => {
  return `
  <div class="filter-panel__item">
      <h3 class="filter-panel__item__title">${data.title}</h3>
      <div class="filter filter--range">
        ${rangeTemp}
      </div>
  </div>
  `;
};
