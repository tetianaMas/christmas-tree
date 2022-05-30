import { IFilterData } from './interfaces';

export const FILTER_DATA: Array<IFilterData> = [
  {
    title: 'Фильтры по значению',
    type: 'value',
    children: [
      {
        title: 'Форма',
        type: 'shape',
        data: [
          {
            name: 'bell',
            isActive: false,
          },
          {
            name: 'ball',
            isActive: false,
          },
          {
            name: 'cone',
            isActive: false,
          },
          {
            name: 'snowflake',
            isActive: false,
          },
          {
            name: 'figure',
            isActive: false,
          },
        ],
      },
      {
        title: 'Цвет',
        type: 'color',
        data: [
          {
            name: 'white',
            isActive: false,
          },
          {
            name: 'yellow',
            isActive: false,
          },
          {
            name: 'red',
            isActive: false,
          },
          {
            name: 'blue',
            isActive: false,
          },
          {
            name: 'green',
            isActive: false,
          },
        ],
      },
      {
        title: 'Размер',
        type: 'size',
        data: [
          {
            name: 'big',
            isActive: false,
          },
          {
            name: 'medium',
            isActive: false,
          },
          {
            name: 'small',
            isActive: false,
          },
        ],
      },
      {
        title: 'Только любимые',
        type: 'favorite',
        data: [
          {
            name: 'favorite',
            isActive: false,
          },
        ],
      },
    ],
  },
  {
    title: 'Фильтры по диапазону',
    type: 'range',
    children: [
      {
        title: 'Количество экземпляров',
        type: 'count',
        data: ['1', '12'],
      },
      {
        title: 'Год приобретения',
        type: 'year',
        data: ['1940', '2020'],
      },
    ],
  },
  {
    title: 'Сортировка',
    type: 'sort',
    children: [
      {
        title: 'По названию от А до Я',
        type: 'name-to-max',
        isActive: true,
      },
      {
        title: 'По названию от Я до А',
        type: 'name-to-min',
        isActive: false,
      },
      {
        title: 'По возрастанию',
        type: 'count-max',
        isActive: false,
      },
      {
        title: 'По убыванию',
        type: 'count-min',
        isActive: false,
      },
    ],
  },
];
