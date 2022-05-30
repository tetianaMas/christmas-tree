import LocalStorageManager from '../../../utils/localStorageManager';
import Observer from '../../../utils/Observer';
import { IToys } from '../../toysPage/interfaces';
import { ISettingsData } from '../interfaces';
import { ToyTreeData } from '../types';
import { ITreeModel } from './interfaces';

export default class TreeModel implements ITreeModel {
  private localStorage: LocalStorageManager;

  private settingsData: ISettingsData | null;

  private toys: Set<ToyTreeData>;

  public settingsUpdate: Observer<ISettingsData>;

  public treeUpdate: Observer<ToyTreeData[]>;

  public updateBg: Observer<number>;

  public updateTree: Observer<number>;

  public updateLights: Observer<number>;

  constructor() {
    this.settingsData = null;
    this.settingsUpdate = new Observer();
    this.treeUpdate = new Observer();
    this.updateBg = new Observer();
    this.updateTree = new Observer();
    this.updateLights = new Observer();
    this.toys = new Set();
    this.localStorage = new LocalStorageManager();
  }

  public getToysData(): void {
    this.toys = new Set();
    const toys = <ToyTreeData[]>this.localStorage.getValue('toys-tree');

    if (toys) {
      toys.forEach((toy: ToyTreeData) => this.toys.add(toy));
    }

    this.treeUpdate.notify([...this.toys]);
  }

  set settings(setData: ISettingsData) {
    this.settingsData = setData;
    this.settingsUpdate.notify(this.settingsData);
  }

  set toysData(toy: ToyTreeData) {
    this.toys.add(toy);

    this.localStorage.setValue('toys-tree', [...this.toys]);
  }

  public removeToyData(dataCard: IToys | string): void {
    const toys = [...this.toys];
    let currToyToRemove;
    if (typeof dataCard === 'string') {
      currToyToRemove = toys.find((toy: ToyTreeData) => toy.data.num === dataCard);
    } else {
      currToyToRemove = toys.find((toy: ToyTreeData) => toy.data.num === dataCard.num);
    }

    if (currToyToRemove) {
      this.toys.delete(currToyToRemove);
    }

    this.localStorage.setValue('toys-tree', [...this.toys]);
  }

  public setBg(data: string): void {
    if (this.settingsData) {
      this.settingsData.bg = Number(data);
      this.updateBg.notify(this.settingsData.bg);
    }
  }

  public setTree(tree: string): void {
    if (this.settingsData) {
      this.settingsData.tree = Number(tree);
      this.updateTree.notify(this.settingsData.tree);
    }
  }

  public setLights(data: string): void {
    if (this.settingsData) {
      this.settingsData.lights = Number(data);
      this.updateLights.notify(this.settingsData.lights);
    }
  }

  public setDefaultSettings(): void {
    this.localStorage.removeData('toys-tree');
    this.toys = new Set();
  }
}
