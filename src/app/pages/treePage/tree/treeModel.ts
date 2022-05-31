import LocalStorageManager from '../../../utils/localStorageManager';
import Observer from '../../../utils/Observer';
import { IToys } from '../../toysPage/interfaces';
import { ISettingsData } from '../interfaces';
import { TTree } from '../tree.model';
import { ITreeModel } from './interfaces';

export default class TreeModel implements ITreeModel {
  private readonly localStorage = new LocalStorageManager();

  private settingsData: ISettingsData | null = null;

  private toys = new Set<TTree>();

  public settingsUpdate = new Observer<ISettingsData>();

  public treeUpdate = new Observer<TTree[]>();

  public updateBg = new Observer<number>();

  public setTreeData = new Observer<number>();

  public updateLights = new Observer<number>();

  public getToysData(): void {
    this.toys = new Set();
    const toys = <TTree[]>this.localStorage.getValue('toys-tree');

    if (toys) {
      toys.forEach((toy: TTree) => this.toys.add(toy));
    }

    this.treeUpdate.notify([...this.toys]);
  }

  set settings(setData: ISettingsData) {
    this.settingsData = setData;
    this.settingsUpdate.notify(this.settingsData);
  }

  set toysData(toy: TTree) {
    this.toys.add(toy);

    this.localStorage.setValue('toys-tree', [...this.toys]);
  }

  public removeToyData(dataCard: IToys | string): void {
    const toys = [...this.toys];
    let currToyToRemove;
    if (typeof dataCard === 'string') {
      currToyToRemove = toys.find((toy: TTree) => toy.data.num === dataCard);
    } else {
      currToyToRemove = toys.find((toy: TTree) => toy.data.num === dataCard.num);
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
      this.setTreeData.notify(this.settingsData.tree);
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
