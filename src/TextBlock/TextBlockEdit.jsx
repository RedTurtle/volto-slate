/**
 * A lot of inspiration from the great https://github.com/udecode/slate-plugins/,
 * especially the list element.
 */

import React, { useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { Icon, BlockChooser, SidebarPortal } from '@plone/volto/components';
import addSVG from '@plone/volto/icons/circle-plus.svg';
import { settings } from '~/config';

import { saveSlateBlockSelection } from 'volto-slate/actions';
import SlateEditor from 'volto-slate/editor';
import { serializeNodesToText } from 'volto-slate/editor/render';
import ShortcutListing from './ShortcutListing';
import { handleKey } from './keyboard';

// import { withList, withDeserializeHtml } from './extensions';
// import {
//   getBackspaceKeyDownHandlers,
//   getFocusRelatedKeyDownHandlers,
//   onKeyDownList,
// } from './keyDownHandlers';

const TextBlockEdit = (props) => {
  const {
    block,
    data,
    detached,
    index,
    onAddBlock,
    onChangeBlock,
    onMutateBlock,
    onSelectBlock,
    properties,
    selected,
  } = props;

  // console.log('properties', properties);

  const { slate } = settings;
  const { textblockExtensions } = slate;
  const { value } = data;
  const [addNewBlockOpened, setAddNewBlockOpened] = useState();

  // const keyDownHandlers = useMemo(() => {
  //   return {
  //     ...getBackspaceKeyDownHandlers({
  //       block,
  //       onDeleteBlock,
  //       index,
  //       properties,
  //       saveSlateBlockSelection,
  //       onChangeBlock,
  //       onFocusPreviousBlock,
  //       blockNode,
  //     }),
  //     ...getFocusRelatedKeyDownHandlers({
  //       block,
  //       blockNode,
  //       onFocusNextBlock,
  //       onFocusPreviousBlock,
  //     }),
  //     ...slate.keyDownHandlers,
  //   };
  // }, [
  //   block,
  //   blockNode,
  //   index,
  //   onFocusNextBlock,
  //   onFocusPreviousBlock,
  //   onDeleteBlock,
  //   onChangeBlock,
  //   properties,
  //   saveSlateBlockSelection,
  // ]);
  // const configuredWithList = useMemo(
  //   () => withList({ onChangeBlock, onAddBlock, onSelectBlock, index }),
  //   [index, onAddBlock, onChangeBlock, onSelectBlock],
  // );
  // const configuredOnKeyDownList = useMemo(() => onKeyDownList(), []);
  //withBlockProps, withList

  // let timeoutTillRerender = null;
  // React.useEffect(() => {
  //   return () => {
  //     if (timeoutTillRerender) {
  //       clearTimeout(timeoutTillRerender);
  //     }
  //   };
  // });

  // const getLatestProps = () => {
  //   const [contextData] = useFormContext();
  //   return contextData;
  // };
  const withBlockProperties = React.useCallback(
    (editor) => {
      editor.getBlockProps = () => {
        return props;
      };
      return editor;
    },
    [props],
  );

  return (
    <>
      <SidebarPortal selected={selected}>
        <div id="slate-plugin-sidebar"></div>
        <ShortcutListing />
      </SidebarPortal>
      <SlateEditor
        index={index}
        properties={properties}
        onAddBlock={onAddBlock}
        extensions={[withBlockProperties, ...textblockExtensions]}
        onSelectBlock={onSelectBlock}
        value={value}
        block={block}
        onChange={(value, selection) => {
          // without using setTimeout, the user types characters on the right side of the text cursor
          // timeoutTillRerender = setTimeout(() => {
          //   saveSlateBlockSelection(block, selection);
          // });

          onChangeBlock(block, {
            ...data,
            value,
            plaintext: serializeNodesToText(value || []),
          });
        }}
        onKeyDown={handleKey}
        selected={selected}
        placeholder="Enter some rich text…"
      />
      {!detached && !data.plaintext && (
        <Button
          basic
          icon
          onClick={() => setAddNewBlockOpened(!addNewBlockOpened)}
          className="block-add-button"
        >
          <Icon name={addSVG} className="block-add-button" size="24px" />
        </Button>
      )}
      {addNewBlockOpened && (
        <BlockChooser onMutateBlock={onMutateBlock} currentBlock={block} />
      )}
    </>
  );
};

export default connect(null, {
  saveSlateBlockSelection, // needed to dispatch action in keyboard handlers
})(TextBlockEdit);
