import React from 'react';
import type { ContentBlock, ContentState } from 'draft-js';

import type { ImageAttributes } from '../components';
import { Image } from '../components';

type MediaProps = {
  contentState: ContentState;
  block: ContentBlock;
  blockProps: {
    setEditorReadOnly: (state: boolean) => void;
    onUpdateContent: (contentState: ContentState) => void;
  };
};

export const MediaRenderer = ({
  contentState,
  block,
  blockProps: { onUpdateContent, setEditorReadOnly },
}: MediaProps) => {
  const entityKey = block.getEntityAt(0);
  const entity = contentState.getEntity(entityKey);

  const type = entity.getType();

  if (type === 'IMAGE') {
    const imageAttributes = entity.getData() as ImageAttributes;

    const onUpdateImageAttributes = (data: Partial<ImageAttributes>) => {
      onUpdateContent(contentState.mergeEntityData(entityKey, data));
    };

    return (
      <Image
        setEditorReadOnly={setEditorReadOnly}
        onUpdateAttributes={onUpdateImageAttributes}
        {...imageAttributes}
      />
    );
  }

  return null;
};
