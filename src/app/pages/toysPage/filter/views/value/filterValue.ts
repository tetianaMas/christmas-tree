import button from '../../../../../components/button';
import { IFilter, IFilterData, IFilterValue } from '../../interfaces';
import valueTemplate from './valueTemplate';
import './value.scss';

export default class FilterValue implements IFilter {
  private data: IFilterData;

  constructor(data: IFilterData) {
    this.data = data;
  }

  public getTemplate(): string {
    let valueTemp = '';
    valueTemp = this.getValueItemsTemplate(this.data.children as unknown as IFilterValue[]);

    return valueTemplate(this.data, valueTemp);
  }

  private getValueItemsTemplate(filters: IFilterValue[]): string {
    let temp = '';

    filters.forEach((filter: IFilterValue) => {
      const btnTemp = this.getButtonsTemplate(filter);
      temp += `<div class="filter filter--${filter.type}" >
        <h4 class="filter__title">${filter.title}:</h4>
        ${btnTemp}
      </div>`;
    });

    return temp;
  }

  private getButtonsTemplate(btnData: IFilterValue): string {
    if (btnData.type === 'favorite') {
      return this.getCheckboxTemplate(btnData);
    }
    let btnTemplate = '';

    btnData.data.forEach((btn): void => {
      btnTemplate += button(
        `${btnData.type}__btn ${btnData.type}__btn--${btn.name} ${btn.isActive ? 'active' : ''}`,
        `data-filter="${btnData.type}-${btn.name}"`,
        ''
      );
    });

    return btnTemplate;
  }

  private getCheckboxTemplate(checkboxData: IFilterValue): string {
    return `<input class="filter__checkbox__input ${
      checkboxData.data[0].isActive ? 'active' : ''
    }" type="checkbox" id="checkbox" data-filter="favorite-favorite" ${checkboxData.data[0].isActive ? 'checked' : ''}>
      <label class="filter__checkbox__label" for="checkbox"></label>`;
  }
}
