import { broadcast } from './socketService';
import { textToPatch, patchToText } from './textDiffHelpers';

export default class Editor {
  text: string = '';

  container: HTMLTextAreaElement;

  constructor() {
    this.container = <HTMLTextAreaElement>document.querySelector('.editor');

    this.container.addEventListener('keyup', this.onChange.bind(this));
    this.container.addEventListener('change', this.onChange.bind(this));
  }

  onChange(e: KeyboardEvent) {
    const target: HTMLTextAreaElement = e.target as HTMLTextAreaElement;

    if (target.value !== this.text) {
      const diff = textToPatch(this.text, target.value);
      broadcast(diff);

      this.setText(target.value);
    }
  }

  applyChanges(patch: string) {
    const newText: string = patchToText(patch, this.text);
    this.changeText(newText);
  }

  setText(text: string) {
    this.text = text;
  }

  changeText(text: string) {
    this.setText(text);
    this.container.value = text;
  }
}
