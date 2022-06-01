import { IFilterData } from './interfaces';

export const FILTER_DATA: Array<IFilterData> = [
  {
    title: 'Filters by value',
    type: 'value',
    children: [
      {
        title: 'Shape',
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
        title: 'Color',
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
        title: 'Size',
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
    ],
  },
  {
    title: 'Filters by range',
    type: 'range',
    children: [
      {
        title: 'Count',
        type: 'count',
        data: ['1', '12'],
      },
      {
        title: 'Year',
        type: 'year',
        data: ['1940', '2020'],
      },
    ],
  },
  {
    title: 'Sort by',
    type: 'sort',
    children: [
      {
        title: 'A to Z',
        type: 'name-to-max',
        isActive: true,
      },
      {
        title: 'Z to A',
        type: 'name-to-min',
        isActive: false,
      },
      {
        title: 'Ascending year',
        type: 'count-max',
        isActive: false,
      },
      {
        title: 'Descending year',
        type: 'count-min',
        isActive: false,
      },
    ],
  },
];
