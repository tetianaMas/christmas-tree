type WordEquivalent = {
  [x: string]: string;
};
const WORDS_EQUIVALENT_RUS: WordEquivalent = {
  шар: 'ball',
  шишка: 'cone',
  снежинка: 'snowflake',
  колокольчик: 'bell',
  фигурка: 'figure',
  желтый: 'yellow',
  красный: 'red',
  зелёный: 'green',
  белый: 'white',
  синий: 'blue',
  большой: 'big',
  средний: 'medium',
  малый: 'small',
};
const WORDS_EQUIVALENT_ENG: WordEquivalent = {
  ball: 'шар',
  cone: 'шишка',
  snowflake: 'снежинка',
  bell: 'колокольчик',
  figure: 'фигурка',
  yellow: 'желтый',
  red: 'красный',
  green: 'зелёный',
  white: 'белый',
  blue: 'синий',
  big: 'большой',
  medium: 'средний',
  small: 'малый',
};

export default class LangProps {
  static getWordEquivalent(word: string): string {
    const currWord = word.toLowerCase().trim();
    return WORDS_EQUIVALENT_RUS[currWord] ? WORDS_EQUIVALENT_RUS[currWord] : WORDS_EQUIVALENT_ENG[currWord];
  }
}
