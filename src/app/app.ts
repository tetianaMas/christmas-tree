import { Router } from './router/router';
import { RouteOption } from './types';
import AppController from './appController';
import { IApp } from './interfaces';

export default class App implements IApp {
  private router: Router | null;

  private rootNode: HTMLElement;

  private controller: AppController;

  constructor() {
    this.controller = new AppController();
    this.router = null;
    this.rootNode = document.getElementById('app') as HTMLElement;
  }

  public start(): void {
    const routes = this.getRoutes();

    this.router = new Router({
      root: 'main',
      routes,
    });
  }

  private getRoutes(): Array<RouteOption> {
    const currRoutes: Array<RouteOption> = [
      {
        path: /main/,
        callback: () => this.controller.createMainPage(this.rootNode, () => this.router?.navigate('toys')),
      },
      {
        path: /toys/,
        callback: () => this.controller.createToysPage(this.rootNode),
      },
      {
        path: /tree/,
        callback: () => this.controller.createTreePage(this.rootNode),
      },
    ];

    return currRoutes;
  }
}
