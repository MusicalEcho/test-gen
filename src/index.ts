import Editor from './editor';
import { connect } from './socketService';

const editor = new Editor();

connect(
  editor.changeText.bind(editor),
  editor.applyChanges.bind(editor),
);
