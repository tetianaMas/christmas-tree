import { ISettingsData } from '../../interfaces';

export default (settings: ISettingsData, treeBtns: string, bgBtns: string, lightsBtns: string): string => {
  return `
      <div class="menu__item">
        <button class="btn btn--music ${settings.volume ? 'active-btn' : ''}" data-volume="${
  settings.volume ? 1 : 0
}"></button>
        <button class="btn btn--snow ${settings.snow ? 'active-btn' : ''}" data-snow="${
  settings.snow ? 1 : 0
}"></button>
      </div>
      <div class="menu__item">
        <h4 class="menu__item__title">Choose a tree</h4>
        <div class="menu__item__wrapper">
          ${treeBtns}
        </div>
      </div>
      <div class="menu__item">
        <h4 class="menu__item__title">Choose a background</h4>
        <div class="menu__item__wrapper">
          ${bgBtns}
        </div>
      </div>
      <div class="menu__item">
        <h4 class="menu__item__title">Add lights</h4>
        <div class="menu__item__wrapper">
        
          ${lightsBtns}
          <button class="menu__item__btn btn--lights btn--toggler ${
  settings.lights ? 'active' : ''
}" data-lights="0"></button>
        </div>
      </div>
      <button class="btn-hide"></button>
      <button class="btn btn--reset" data-reset="true">Reset settings</button>

  `;
};
