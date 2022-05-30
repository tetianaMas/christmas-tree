export default function cardTemplate(title: string, counter: number): string {
  return `
  <h2 class="cards__title">${title}</h2>
  <div class="fav-counter">${counter}</div>`;
}
