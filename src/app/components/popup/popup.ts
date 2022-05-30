import './popup.scss';

export default (): string => {
  return `<div class="overflow active" id="overflow"></div>
  <div class="popup active" id="popup">
    <div class="popup__img"></div>
    <p class="popup__text">Извините, все слоты заполнены.</p>
    <div class="popup__controls popup-controls-js">
      <button class="btn popup__btn" id="close-popup">
        Ок
      </button>
    </div>
  </div>`;
};
