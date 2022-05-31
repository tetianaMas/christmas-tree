import { IToys } from '../../interfaces';

export default function cardTemplate(data: IToys): string {
  return `
  <h3 class="card__title">${data.name}</h3>
  <div class="card__wrapper">
    <img class="card__img" src="./assets/toys/${data.num}.png" alt="toy image">
    <div class="card__info">
      <p class="card__info__item card__amount">Count: ${data.count}</p>
      <p class="card__info__item card__year">Year: ${data.year}</p>
      <p class="card__info__item card__form">Shape: ${data.shape}</p>
      <p class="card__info__item card__color">Color: ${data.color}</p>
      <p class="card__info__item card__size">Size: ${data.size}</p>
      <p class="card__info__item card__is-favorite">Favorite: ${data.favorite ? 'Yes' : 'No'}</p>
    </div>
  </div>
  `;
}
