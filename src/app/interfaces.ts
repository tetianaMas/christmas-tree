export interface IApp {
  start: () => void;
}

export interface IAppController {
  createMainPage(node: HTMLElement, callback: () => void): void;
  createToysPage(node: HTMLElement): Promise<void>;
  createTreePage(node: HTMLElement): void;
}
