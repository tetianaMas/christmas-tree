export default interface ISearch {
  getSearchNode: () => void;
  clearValue: (parent: HTMLElement) => void;
}
