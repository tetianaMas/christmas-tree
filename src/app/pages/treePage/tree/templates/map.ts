export enum Coords {
  mobile = '149,6,6,379,44,424,174,429,222,432,255,421,296,383',
  desktop = '250,9,8,685,77,771,362,781,435,758,493,700',
}

export default (isMobile = false): string => {
  console.log(isMobile ? Coords.mobile : Coords.desktop);
  return `
    <area alt="tree" coords="${isMobile ? Coords.mobile : Coords.desktop}" shape="poly"></area>
  `;
};
