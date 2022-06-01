export interface IToys {
  num: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
}

export interface IToysPage {
  createPage: (node: HTMLElement) => Promise<void>;
}
