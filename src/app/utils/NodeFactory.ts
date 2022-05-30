export default class NodeFactory {
  static getNode(type: string, className: string, text: string): HTMLElement {
    const node = document.createElement(type);
    node.className = className;
    node.textContent = text;

    return node;
  }
}
