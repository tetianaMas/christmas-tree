export default class Observer<T> {
  private observers: Array<(arg: T) => void>;

  constructor() {
    this.observers = [];
  }

  subscribe(handler: (arg: T) => void) {
    this.observers.push(handler);
  }

  notify(data: T) {
    this.observers.forEach((handler) => handler(data));
  }
}
