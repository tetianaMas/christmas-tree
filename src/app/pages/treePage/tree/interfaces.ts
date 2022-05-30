import Observer from '../../../utils/Observer';
import { IToys } from '../../toysPage/interfaces';
import { ISettingsData } from '../interfaces';
import { ToyTreeData } from '../types';

export interface ITreeController {
  createPage: (
    settings: ISettingsData,
    node: HTMLElement,
    callback: (x: string, y: string, toyId: string) => void,
    callbackReturn: (id: string) => void
  ) => void;
  setToyToTree: (x: string, y: string, card: IToys) => void;
  removeToyFromTree: (card: IToys) => void;
  setBg: (bg: string) => void;
  setTree: (tree: string) => void;
  setLights: (data: string) => void;
  setDefaultSettings: () => void;
}

export interface ITreeModel {
  settingsUpdate: Observer<ISettingsData>;
  treeUpdate: Observer<ToyTreeData[]>;
  updateBg: Observer<number>;
  updateTree: Observer<number>;
  updateLights: Observer<number>;
  settings: ISettingsData;
  toysData: ToyTreeData;
  getToysData: () => void;
  removeToyData: (card: IToys | string) => void;
  setBg: (data: string) => void;
  setTree: (tree: string) => void;
  setLights: (data: string) => void;
  setDefaultSettings: () => void;
}

export interface ITreeView {
  root: HTMLElement;
  initDragEvent: (
    callback: (x: string, y: string, toyId: string) => void,
    callbackReturn: (id: string) => void
  ) => void;
}
