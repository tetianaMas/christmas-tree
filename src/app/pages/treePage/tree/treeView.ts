import { ISettingsData } from '../interfaces';
import map, { Coords } from './templates/map';
import TreeModel from './treeModel';
import NodeFactory from '../../../utils/NodeFactory';
import { TTree } from '../tree.model';
import { ITreeView } from './interfaces';
import { ButtonAmount } from '../menu/menuView';

const LIGHTS_SETTINGS = {
  minLightsAmount: 6,
  get maxLightsAmount() {
    if (window.innerWidth > 550) {
      return 30;
    }
    return 20;
  },
  lightsDiff: 3,
  lightsHeightCoef: 2,
};

const LIGHTS_COLORS = {
  1: 'multycolor',
  2: 'yellow',
  3: 'green',
  4: 'red',
  5: 'blue',
};

const MAX_RANDOM_NUMBER = 1000;

export default class TreeView implements ITreeView {
  private model: TreeModel;

  private lightsWrapper: HTMLElement;

  private rootNode: HTMLElement | null = null;

  private bgElement: HTMLElement | null = null;

  private area: HTMLElement | null = null;

  private wrapper: HTMLElement;

  private bgWrapper: HTMLElement;

  public resetArea!: (isMobile: boolean) => void;

  constructor(model: TreeModel) {
    this.model = model;
    this.wrapper = NodeFactory.getNode('div', 'tree-wrapper', '');
    this.bgWrapper = NodeFactory.getNode('div', 'tree__bg', '');
    this.lightsWrapper = NodeFactory.getNode('div', 'lights__wrapper', '');
    this.model.settingsUpdate.subscribe(this.drawTree.bind(this));
    this.model.updateBg.subscribe(this.updateBg.bind(this));
    this.model.setTreeData.subscribe(this.setTreeData.bind(this));
    this.model.updateLights.subscribe(this.updateLights.bind(this));
    this.model.treeUpdate.subscribe(this.hangToys.bind(this));
  }

  public set root(rootElement: HTMLElement) {
    this.rootNode = rootElement;
  }

  private drawTree(settings: ISettingsData) {
    this.createLights(settings.lights);
    const isMobile = window.matchMedia('(max-width: 550px)').matches ? true : false;

    const mapElem = NodeFactory.getNode('map', 'map', '');
    mapElem.setAttribute('name', 'image-map');

    this.bgElement = NodeFactory.getNode('img', 'tree', '');
    this.bgElement.setAttribute('src', `./assets/tree/${settings.tree}.webp`);
    this.bgElement.setAttribute('alt', 'tree');
    this.bgElement.setAttribute('usemap', '#image-map');

    this.bgWrapper.textContent = '';
    this.bgWrapper.append(this.lightsWrapper);
    mapElem.insertAdjacentHTML('beforeend', map(isMobile));
    this.bgWrapper.append(mapElem);
    this.bgWrapper.append(this.bgElement);

    this.wrapper.textContent = '';
    this.wrapper.style.backgroundImage = `url(./assets/bg/${settings.bg}1.jpg)`;
    this.wrapper.append(this.bgWrapper);
    this.wrapper.insertAdjacentHTML('afterbegin', '<canvas class="canvas" id="canvas"></canvas>');

    this.rootNode?.append(this.wrapper);

    this.resetArea = this.resetMapArea(settings, mapElem);
  }

  public resetMapArea(settings: ISettingsData, mapElem: Element | null) {
    return (isMobile: boolean) => {
      if (mapElem && mapElem.firstElementChild) {
        mapElem.firstElementChild.setAttribute('coords', isMobile ? Coords.mobile : Coords.desktop);
      }
      this.createLights(settings.lights);
    };
  }

  private hangToys(toys: TTree[]): void {
    if (this.rootNode) {
      this.area = this.rootNode.querySelector('area');
      if (this.area) {
        toys.forEach((toy: TTree) => this.createImage(toy));
      }
    }
  }

  private createImage(toy: TTree): void {
    if (this.area) {
      this.area.textContent = '';
    }

    const img = new Image();
    img.className = 'card-fav';
    img.setAttribute('alt', 'toy image');
    img.setAttribute('draggable', 'true');
    img.src = `./assets/toys/${toy.data.num}.png`;
    img.id = this.getId(toy.data.num);
    img.style.position = 'absolute';
    img.style.zIndex = '1';
    img.style.left = toy.xAxis;
    img.style.top = toy.yAxis;
    img.onload = () => {
      if (this.area) {
        this.area.append(img);
      }
    };
    img.ondragstart = function (e: DragEvent): void {
      e.dataTransfer?.setData('cardImage', img.id);
      e.dataTransfer?.setData('parent', 'tree');
    };
  }

  private getId(toy: string): string {
    return `${toy}-${Math.floor(Math.random() * MAX_RANDOM_NUMBER)}`;
  }

  public initDragEvent(
    callback: (x: string, y: string, toyId: string) => void,
    callbackReturn: (id: string) => void,
    callbackUpdateToyData: (toy: string, x: string, y: string) => void
  ): void {
    if (this.area && this.rootNode) {
      this.area.ondrop = (e: DragEvent) => this.handleDragEvent(e, callback, callbackUpdateToyData);
      this.area.ondrag = (e: DragEvent) => this.handleDragEvent(e, callback, callbackUpdateToyData);

      this.rootNode.ondragover = (e: DragEvent) => this.handleDragRemoveEvent(e, callbackReturn);
      this.rootNode.ondrop = (e: DragEvent) => this.handleDragRemoveEvent(e, callbackReturn);
    }
  }

  private handleDragRemoveEvent(e: DragEvent, callbackReturn: (id: string) => void) {
    e.preventDefault();

    if (e.type === 'drop' && e.dataTransfer) {
      const parent = e.dataTransfer.getData('parent');
      const id = e.dataTransfer.getData('cardImage');
      const toy = document.getElementById(id);
      if (parent && parent === 'tree' && id && toy && (<HTMLElement>e.target).tagName !== 'AREA') {
        if ((<HTMLElement>e.target).classList.contains('card-fav')) {
          return;
        }
        toy.parentNode?.removeChild(toy);
        callbackReturn(id);
      }
    }
  }

  private handleDragEvent(
    e: DragEvent,
    callback: (x: string, y: string, toyId: string) => void,
    callbackUpdateToyData: (toy: string, x: string, y: string) => void
  ): void {
    e.preventDefault();

    if (e.type === 'drop' && e.dataTransfer) {
      const toyId = e.dataTransfer.getData('cardImage');
      const toy = document.getElementById(toyId);
      const parent = e.dataTransfer.getData('parent');

      console.log(toy, toy?.parentNode, e.target);
      if (toy && toy.parentNode && e.target) {
        if (parent === 'tree' && (<HTMLElement>e.target).tagName === 'AREA') {
          this.moveToyOnTree(e, toy, callbackUpdateToyData);
        } else if (parent === 'menu' && !(<HTMLElement>e.target).classList.contains('card-fav')) {
          this.addToyToTree(e, toy, toyId, callback);
        }
      }
    }
  }

  private moveToyOnTree(
    e: DragEvent,
    toy: HTMLElement,
    callbackUpdateToyData: (toy: string, x: string, y: string) => void
  ) {
    const [x, y] = this.getPoints(e.offsetX, e.offsetY);

    toy.style.left = x;
    toy.style.top = y;
    (<HTMLElement>e.target).append(toy);
    callbackUpdateToyData(toy.id.split('-')[0], x, y);
  }

  private addToyToTree(
    e: DragEvent,
    toy: HTMLElement,
    toyId: string,
    callback: (x: string, y: string, toyId: string) => void
  ) {
    if (toy) {
      toy.parentNode?.removeChild(toy);
      toy.style.position = 'absolute';
      toy.style.zIndex = '1';

      const [x, y] = this.getPoints(e.offsetX, e.offsetY);
      toy.style.left = x;
      toy.style.top = y;
      callback(x, y, toyId);
      (<HTMLElement>e.target).append(toy);
      toy.ondragstart = function () {
        return false;
      };
      toy.ondragstart = function (event: DragEvent): void {
        event.dataTransfer?.setData('cardImage', toy.id);
        event.dataTransfer?.setData('parent', 'tree');
      };
    }
  }

  private getPoints(x: number, y: number): Array<string> {
    const wrapperSize = this.bgWrapper.getBoundingClientRect();
    const width = wrapperSize.width;
    const height = wrapperSize.height;
    const xAxis = `${(x * 100) / width}%`;
    const yAxis = `${(y * 100) / height}%`;

    return [xAxis, yAxis];
  }

  private createLights(color: number): void {
    this.lightsWrapper.textContent = '';
    if (color === 0) {
      return;
    }
    const lights = this.createLightsRope(LIGHTS_SETTINGS.minLightsAmount, LIGHTS_SETTINGS.maxLightsAmount, color);
    this.lightsWrapper.append(lights);
  }

  private createLightsRope(min: number, max: number, color: number): DocumentFragment {
    const fragment = document.createDocumentFragment();

    while (min < max) {
      fragment.append(this.createLightsRopeItems(min, color));
      min += LIGHTS_SETTINGS.lightsDiff;
    }

    return fragment;
  }

  private createLightsRopeItems(num: number, color: number): HTMLUListElement {
    const elementUl = document.createElement('ul');
    elementUl.className = 'lights';
    let index = num;
    const step = Math.PI / num;
    let angle = 0;

    while (index > 0) {
      const currTranslate = Math.sin(angle) * num * LIGHTS_SETTINGS.lightsHeightCoef;
      angle += step;
      const elementLi = document.createElement('li');
      elementLi.className = `lights__item lights__item--${this.getColor(color)}`;
      elementLi.style.transform = `translateY(${currTranslate}px)`;
      elementUl.append(elementLi);
      index -= 1;
    }

    return elementUl;
  }

  private getColor(color: number): string {
    let currentColor = this.getlightsColor(color);
    if (currentColor === 'multycolor') {
      let randomNum = Math.ceil(Math.random() * ButtonAmount.lightsBtns);
      while (randomNum === 1) {
        randomNum = Math.ceil(Math.random() * ButtonAmount.lightsBtns);
      }
      currentColor = this.getlightsColor(randomNum);
    }

    return currentColor;
  }

  private updateBg(src: number): void {
    const img = new Image();
    img.src = `./assets/bg/${src}1.jpg`;
    img.onload = () => {
      this.wrapper.style.backgroundImage = `url(${img.src})`;
    };
  }

  private setTreeData(src: number): void {
    const img = new Image();
    img.src = `./assets/tree/${src}.webp`;
    img.onload = () => {
      if (this.bgElement) {
        this.bgElement.setAttribute('src', `${img.src}`);
      }
    };
  }

  private updateLights(value: number): void {
    this.createLights(value);
  }

  private getlightsColor(num: number): string {
    return LIGHTS_COLORS[num as keyof typeof LIGHTS_COLORS];
  }
}
