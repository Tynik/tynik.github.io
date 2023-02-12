import React from 'react';

import type { ContentState } from 'draft-js';
import type { ImageAttributes } from '../components';
import type { ActiveBlockRendererComponent, OnUpdateEntityDateHandler } from '../RichEditor.types';

import { Image } from '../components';

export const MediaBlockRenderer = ({
  contentState,
  block,
  blockProps: { onUpdateContent, setEditorReadOnly },
}: ActiveBlockRendererComponent) => {
  const entityKey = block.getEntityAt(0);
  const entity = contentState.getEntity(entityKey);

  const type = entity.getType();

  const onUpdate: OnUpdateEntityDateHandler = (data, mode = 'soft') => {
    let newContentState: ContentState;

    if (mode === 'soft') {
      newContentState = contentState.mergeEntityData(entityKey, data);
    } else {
      newContentState = contentState.replaceEntityData(entityKey, data);
    }

    onUpdateContent(newContentState);
  };

  if (type === 'IMAGE') {
    const imageAttributes = entity.getData() as ImageAttributes;

    return <Image setEditorReadOnly={setEditorReadOnly} onUpdate={onUpdate} {...imageAttributes} />;
  }

  return null;
};
