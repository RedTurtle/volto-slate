import { slate_block_selections, upload_content } from './reducers';

import installSlate from './editor';
import installTextBlock from './blocks/Text';
import installTableBlock from './blocks/Table';
import installFootnoteBlock from './blocks/Footnote';
import installVoltoProposals from './futurevolto';
import RichTextWidget from './widgets/RichTextWidget';

export default (config) => {
  config = [
    installSlate,
    installTextBlock,
    installTableBlock,
    installFootnoteBlock,
    installVoltoProposals,
  ].reduce((acc, apply) => apply(acc), config);

  config.addonReducers = {
    ...config.addonReducers,
    slate_block_selections,
    upload_content,
  };

  config.views = {
    ...config.views,
  };

  config.widgets.widget.slate_richtext = RichTextWidget;

  return config;
};

export function asDefault(config) {
  config.settings.defaultBlockType = 'slate';

  config.blocks.blocksConfig.text.restricted = true;
  config.blocks.blocksConfig.table.restricted = true;

  // TODO: handle title and description blocks
  return config;
}
