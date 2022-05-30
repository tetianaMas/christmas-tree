import { IFilterData } from '../../interfaces';

export default (data: IFilterData, options: string): string => {
  return `
  <div class="filter-panel__item">
    <h3 class="filter-panel__item__title">${data.title}</h3>
    <select class="filter filter--select" name="filter-select" data-sort="sort">
      ${options}
    </select>
    <span class="filter-select-arrow"></span>
  </div>
  `;
};
