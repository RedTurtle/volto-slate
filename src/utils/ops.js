import {
  getFragmentFromBeginningOfEditorToStartOfSelection,
  getFragmentFromStartOfSelectionToEndOfEditor,
} from './selection';
import _ from 'lodash';

/*
 * Gets two fragments: left, right: before selection, after selection
 */
export function splitEditorInTwoFragments(editor, initialSelection) {
  initialSelection = initialSelection || editor.selection;
  let left = getFragmentFromBeginningOfEditorToStartOfSelection(
    editor,
    initialSelection,
  );
  let right = getFragmentFromStartOfSelectionToEndOfEditor(
    editor,
    initialSelection,
  );
  return [left, right];
}
