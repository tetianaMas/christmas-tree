export default class LocalStorageManager {
  static instance: LocalStorageManager;

  private prefix = '';

  constructor() {
    if (LocalStorageManager.instance) {
      return LocalStorageManager.instance;
    }
    LocalStorageManager.instance = this;
    this.prefix = 'tetianaMas-christmas-task-';
  }

  setValue<T>(key: string, value: T): void {
    this.handleLsOperation(() => localStorage.setItem(this.getPrefix(key), JSON.stringify(value)));
  }

  getValue<T>(key: string): T | void {
    const data = localStorage.getItem(this.getPrefix(key));

    return this.handleLsOperation<T>(() => {
      if (data) {
        return JSON.parse(data) as T;
      }
    });
  }

  removeData(key: string): void {
    localStorage.removeItem(this.getPrefix(key));
  }

  private getPrefix(key: string): string {
    return `${this.prefix}${key}`;
  }

  private handleLsOperation<T>(callback: () => T | void): T | void {
    try {
      return callback();
    } catch (err) {
      console.warn(`Some error occured: ${err}`);
    }
  }
}
