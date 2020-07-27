import React from 'react';
import { Node } from 'slate';
import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
} from '@plone/volto/helpers';
import { FOOTNOTE } from 'volto-slate/constants';

const getBlocks = (properties) => {
  const blocksFieldName = getBlocksFieldname(properties);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(properties);
  return properties[blocksLayoutFieldname].items.map(
    (n) => properties[blocksFieldName][n],
  );
};

const FootnotesBlockView = (props) => {
  const { data, properties } = props;
  const { title } = data;

  // console.log(properties);
  const blocks = getBlocks(properties);
  const footnotes = [];
  // TODO: slice the blocks according to existing footnote listing blocks.
  // A footnote listing block should reset the counter of the footnotes above it
  // If so, then it should only include the footnotes between the last footnotes listing block and this block
  blocks
    .filter((b) => b['@type'] === 'slate')
    .forEach(({ value }) => {
      if (!value) return;

      Array.from(Node.elements(value[0])).forEach(([node]) => {
        if (node.type === FOOTNOTE) {
          footnotes.push(node);
        }
      });
    });

  return (
    <div className="footnotes-listing-block">
      <h3>{title}</h3>
      {footnotes && (
        <ol>
          {footnotes.map(({ data }) => {
            const { uid, footnote } = data;
            return (
              <li key={uid} id={`footnote-${uid}`}>
                {footnote}
                <a href={`#ref-${uid}`} aria-label="Back to content">
                  ↵
                </a>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
};

export default FootnotesBlockView;
