export interface IToys {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
}

export interface IToysPage {
  createPage: (node: HTMLElement) => Promise<void>;
}
