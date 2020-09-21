import { defineMessages } from 'react-intl'; // , defineMessages
import linkSVG from '@plone/volto/icons/link.svg';
import { makeInlineElementPlugin } from 'volto-slate/components/ElementEditor';

import { LINK } from 'volto-slate/constants';
import { LinkElement } from './render';
import { withLink } from './extensions';
import { linkDeserializer } from './deserialize';
import ObjectByTypeWidget from './ObjectByTypeWidget';
import LinkEditSchema from './schema';

const messages = defineMessages({
  edit: {
    id: 'Edit link',
    defaultMessage: 'Edit link',
  },
  delete: {
    id: 'Remove link',
    defaultMessage: 'Remove link',
  },
});

export default (config) => {
  const { slate } = config.settings;

  slate.toolbarButtons = [...(slate.toolbarButtons || []), LINK];
  slate.expandedToolbarButtons = [
    ...(slate.expandedToolbarButtons || []),
    LINK,
  ];

  slate.htmlTagsToSlate.A = linkDeserializer;

  const opts = {
    pluginId: LINK,
    elementType: LINK,
    element: LinkElement,
    isInlineElement: true,
    editSchema: LinkEditSchema,
    extensions: [withLink],
    hasValue: (formData) => !!formData.link,
    toolbarButtonIcon: linkSVG,
    messages,
  };

  const [installLinkEditor] = makeInlineElementPlugin(opts);
  config = installLinkEditor(config);

  config.widgets.widget.object_by_type = ObjectByTypeWidget;

  return config;
};
