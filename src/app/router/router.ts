import { RouteOption } from '../types';
import { IRouter, IRouterOptions } from './interfaces';

export class Router implements IRouter {
  private routes: Array<RouteOption>;

  private root: string;

  private current: string | null;

  private intervalId: ReturnType<typeof setInterval> | null;

  constructor(options: IRouterOptions) {
    this.routes = options.routes;
    this.root = '/';
    if (options.root) {
      this.root = options.root;
    }
    this.current = null;
    this.intervalId = null;
    this.listen();
  }

  addPath(path: RegExp, callback: () => void): void {
    this.routes.push({
      path,
      callback,
    });
  }

  removePath(path: RegExp): void {
    const routeToDelete = this.routes.find((route: RouteOption) => route.path === path);
    if (routeToDelete) {
      this.routes.splice(this.routes.indexOf(routeToDelete), 1);
    }
  }

  getPath(path: RegExp | string): string {
    return path.toString().replace(/^\//, '').replace(/\\/, '').replace(/\/$/, '');
  }

  getRoute(): string {
    let route = '';
    const match = window.location.href.match(/#(.*)$/);
    route = match && match[1] ? match[1] : this.root;

    return this.getPath(route);
  }

  findCurrentRoute(route: string): object | undefined {
    if (!route) {
      return {};
    }
    const currRoute = this.routes.find((item) => item.path.test(route));
    if (currRoute) {
      return currRoute;
    }
  }

  navigate(path = ''): void {
    window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#/${this.getPath(path)}`;
  }

  listen(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(this.checkRoute.bind(this), 50);
  }

  checkRoute(): void {
    if (this.current === this.getRoute()) {
      return;
    }

    this.current = this.getRoute();

    this.routes.some((route) => {
      if (this.current) {
        const match = this.current.match(route.path) as [];

        if (match) {
          const currRoute = match.shift();
          this.navigate(currRoute);

          route.callback.apply({}, match);
          return this;
        }
        this.navigate(this.root);

        return false;
      } else {
        this.navigate(this.root);
      }
    });
  }
}
