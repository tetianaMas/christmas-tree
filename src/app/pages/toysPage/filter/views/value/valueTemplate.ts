import { IFilterData } from '../../interfaces';

export default (data: IFilterData, children: string): string => {
  return `
  <div class="filter-panel__item">
    <h3 class="filter-panel__item__title">${data.title}</h3>
    ${children}
  </div>
  `;
};
