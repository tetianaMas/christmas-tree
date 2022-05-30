import Card from './card/card';

export type SortType = { [index: string]: (cards: Card[]) => void };
