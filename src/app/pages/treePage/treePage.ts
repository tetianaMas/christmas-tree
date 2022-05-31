import Card from '../toysPage/cards/card/card';
import AudioManager from './audio';
import { ITreePage } from './interfaces';
import MenuController from './menu/menuController';
import SnowManager from './snow';
import TreeController from './tree/treeController';

enum VolumeState {
  off = '0',
  on = '1',
}

enum SnowState {
  off = '0',
  on = '1',
}
export default class TreePage implements ITreePage {
  private rootNode: HTMLElement | null = null;

  private favData: Card[] | null = null;

  private readonly controllerTree = new TreeController();

  private readonly controllerMenu = new MenuController();

  private readonly snowManager = new SnowManager();

  private readonly audioManager = new AudioManager();

  public createPage(node: HTMLElement, favData: Array<Card>): void {
    node.textContent = '';
    node.className = 'main main--tree';
    this.rootNode = node;
    this.favData = favData;

    this.controllerMenu.createPage(favData, node, this.handleSettingsEvent.bind(this));
    this.controllerTree.createPage(
      this.controllerMenu.settings,
      node,
      this.addTreeToys.bind(this),
      this.removeTreeToys.bind(this)
    );
    if (this.controllerMenu.settings.snow) {
      this.showSnow();
    }
    if (this.controllerMenu.settings.volume) {
      this.playMusic();
    }
    document.addEventListener('click', (e: Event) => {
      if ((<HTMLElement>e.target).closest('.navigation-wrapper')) {
        this.stopMusic();
      }
    });
  }

  private showSnow(): void {
    const canvasWrapper = document.querySelector('.tree__bg');
    if (canvasWrapper) {
      this.snowManager.init(canvasWrapper);
    }
  }

  private playMusic(): void {
    this.audioManager.play();
  }

  private stopMusic(): void {
    this.audioManager.pause();
    this.audioManager.currentTime = 0;
  }

  private addTreeToys(x: string, y: string, toyId: string): void {
    const card = this.controllerMenu.getCardById(toyId);

    if (card) {
      this.controllerMenu.decreaseCardAmount(toyId);
      this.controllerTree.setToyToTree(x, y, card);
    }
  }

  private removeTreeToys(id: string): void {
    const card = this.controllerMenu.getCardById(id);
    if (card) {
      this.controllerMenu.increaseCardAmount(id);
      this.controllerTree.removeToyFromTree(card);
    } else {
      const idCard = id.split('-')[0];
      this.controllerTree.removeToyFromTree(idCard);
    }
  }

  private handleSettingsEvent(e: Event): void {
    const currElem = <HTMLElement>e.target;
    if (currElem.dataset.bg) {
      this.removeActiveClass('.menu__item__btn.btn--bg', 'active-elem');
      currElem.classList.add('active-elem');
      this.controllerTree.setBg(currElem.dataset.bg);
      this.controllerMenu.setBg(currElem.dataset.bg);
    }
    if (currElem.dataset.tree) {
      this.removeActiveClass('.menu__item__btn.btn--tree', 'active-elem');
      currElem.classList.add('active-elem');
      this.controllerTree.setTree(currElem.dataset.tree);
      this.controllerMenu.setTree(currElem.dataset.tree);
    }
    if (currElem.dataset.lights) {
      this.handleLights(currElem);
    }

    if (currElem.dataset.snow) {
      this.handleSnow(currElem);
    }

    if (currElem.dataset.reset) {
      this.resetSettings();
    }

    if (currElem.dataset.volume) {
      this.handleAudio(currElem);
    }
  }

  private handleLights(currElem: HTMLElement): void {
    let value;
    const togglerBtn = this.rootNode?.querySelector('.btn--toggler');
    this.removeActiveClass('.menu__item__btn.btn--lights', 'active-elem');

    if (currElem.classList.contains('active')) {
      value = '1';
      if (this.rootNode) {
        this.rootNode.querySelector('[data-lights="1"]')?.classList.add('active-elem');
      }
      currElem.classList.add('active-elem');
    } else {
      value = currElem.dataset.lights;
    }
    if (currElem !== togglerBtn) {
      togglerBtn?.classList.add('active');
    }
    currElem.classList.add('active-elem');

    if (value) {
      this.controllerTree.setLights(value);
      this.controllerMenu.setLights(value);
    }
  }

  private handleSnow(currElem: HTMLElement): void {
    if (currElem.classList.contains('active-btn')) {
      currElem.classList.remove('active-btn');
      this.snowManager.hideSnow();
      currElem.dataset.snow = SnowState.off;
    } else {
      currElem.classList.add('active-btn');
      this.showSnow();
      currElem.dataset.snow = SnowState.on;
    }
    const value = Number(currElem.dataset.snow);
    this.controllerMenu.setSnowValue(!!value);
  }

  private handleAudio(currElem: HTMLElement): void {
    if (currElem.classList.contains('active-btn')) {
      currElem.classList.remove('active-btn');
      this.audioManager.pause();
      currElem.dataset.volume = VolumeState.off;
    } else {
      currElem.classList.add('active-btn');
      this.audioManager.play();
      currElem.dataset.volume = VolumeState.on;
    }
    const value = Number(currElem.dataset.volume);
    this.controllerMenu.setVolumeValue(!!value);
  }

  private removeActiveClass(classToFind: string, activeClass: string): void {
    if (this.rootNode) {
      const elems = this.rootNode.querySelectorAll(classToFind);
      elems.forEach((elem: Element): void => elem.classList.remove(activeClass));
    }
  }

  private resetSettings() {
    this.controllerMenu.setDefaultSettings();
    this.controllerTree.setDefaultSettings();
    this.stopMusic();

    if (this.rootNode && this.favData) {
      this.createPage(this.rootNode, this.favData);
    }
  }
}
