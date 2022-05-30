import { IToys } from '../../interfaces';

export default function cardTemplate(data: IToys): string {
  return `
  <h3 class="card__title">${data.name}</h3>
  <div class="card__wrapper">
    <img class="card__img" src="./assets/toys/${data.num}.png" alt="toy image">
    <div class="card__info">
      <p class="card__info__item card__amount">количество: ${data.count}</p>
      <p class="card__info__item card__year">год покупки: ${data.year}</p>
      <p class="card__info__item card__form">форма: ${data.shape}</p>
      <p class="card__info__item card__color">цвет: ${data.color}</p>
      <p class="card__info__item card__size">размер: ${data.size}</p>
      <p class="card__info__item card__is-favorite">любимый: ${data.favorite ? 'Да' : 'Нет'}</p>
    </div>
  </div>
  `;
}
