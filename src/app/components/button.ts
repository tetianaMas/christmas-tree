export default (className: string, extraAttributes: string, textContent: string): string => {
  return `<button class="${className}" ${extraAttributes}>${textContent}</button>`;
};
