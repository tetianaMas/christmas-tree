import './pages/startPage';
import './pages/toysPage';
import ToysPage from './pages/toysPage/toysPage';
import StartPage from './pages/startPage/startPage';
import { IAppController } from './interfaces';
import TreePage from './pages/treePage/treePage';

export default class AppController implements IAppController {
  private toysPage: ToysPage;

  private startPage: StartPage;

  private treePage: TreePage;

  constructor() {
    this.toysPage = new ToysPage();
    this.startPage = new StartPage();
    this.treePage = new TreePage();
    document.addEventListener('click', (e: Event): void => this.handleNavClick(e));
  }

  public createMainPage(node: HTMLElement, callback: () => void): void {
    this.startPage.createPage(node, callback);
  }

  public async createToysPage(node: HTMLElement): Promise<void> {
    this.toysPage.createPage(node);
    const navElem = document.querySelector('[href="#/toys"]');
    if (navElem) {
      navElem.parentElement?.classList.add('active');
    }
  }

  public async createTreePage(node: HTMLElement): Promise<void> {
    const cards = await this.toysPage.getFavCards();
    this.treePage.createPage(node, cards);
    const navElem = document.querySelector('[href="#/tree"]');
    if (navElem) {
      navElem.parentElement?.classList.add('active');
    }
  }

  private handleNavClick(e: Event): void {
    const currElem = <HTMLElement>e.target;
    const navElems = document.querySelectorAll('.nav__item');

    if (currElem.classList.contains('nav__item')) {
      this.removeActiveNavClasses(navElems);
      currElem.classList.toggle('active');
    } else if (currElem.closest('.nav__item')) {
      this.removeActiveNavClasses(navElems);
      currElem.closest('.nav__item')?.classList.toggle('active');
    } else if (currElem.classList.contains('logo')) {
      this.removeActiveNavClasses(navElems);
    }
  }

  private removeActiveNavClasses(elems: NodeListOf<Element>): void {
    if (elems) {
      elems.forEach((elem: Element): void => elem.classList.remove('active'));
    }
  }
}
