import { IToys } from '../../toysPage/interfaces';
import { ISettingsData } from '../interfaces';
import { TTree } from '../tree.model';
import { ITreeController } from './interfaces';
import TreeModel from './treeModel';
import TreeView from './treeView';

export default class TreeController implements ITreeController {
  private model: TreeModel;

  private view: TreeView;

  constructor() {
    this.model = new TreeModel();
    this.view = new TreeView(this.model);
  }

  public createPage(
    settings: ISettingsData,
    node: HTMLElement,
    callback: (x: string, y: string, toyId: string) => void,
    callbackReturn: (id: string) => void
  ): void {
    this.view.root = node;
    this.model.settings = settings;
    this.model.getToysData();
    this.view.initDragEvent(callback, callbackReturn, this.callbackUpdateToyData.bind(this));

    window.addEventListener('resize', () => {
      const isMobileOnResize = window.matchMedia('(max-width: 550px)').matches ? true : false;

      this.view.resetArea(isMobileOnResize);
      this.model.getToysData();
    });
  }

  private callbackUpdateToyData(toyId: string, x: string, y: string): void {
    this.model.updateData(toyId, x, y);
  }

  public setToyToTree(x: string, y: string, card: IToys): void {
    const toyData: TTree = {
      data: card,
      xAxis: x,
      yAxis: y,
    };

    this.model.toysData = toyData;
  }

  public removeToyFromTree(card: IToys | string): void {
    this.model.removeToyData(card);
  }

  public setBg(bg: string): void {
    this.model.setBg(bg);
  }

  public setTree(tree: string): void {
    this.model.setTree(tree);
  }

  public setLights(data: string): void {
    this.model.setLights(data);
  }

  public setDefaultSettings(): void {
    this.model.setDefaultSettings();
  }
}
