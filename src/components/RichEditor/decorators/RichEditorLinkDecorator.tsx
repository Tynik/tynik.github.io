import React from 'react';

import type { DraftDecorator } from 'draft-js';

import { RichEditorLink } from '../components';

export const createRichEditorLinkDecorator = (): DraftDecorator => ({
  strategy: (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(value => {
      const entityKey = value.getEntity();

      return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
    }, callback);
  },
  component: RichEditorLink,
});
