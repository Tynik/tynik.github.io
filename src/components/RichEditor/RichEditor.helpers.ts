import type { SelectionState, ContentState, EntityInstance } from 'draft-js';

import { CompositeDecorator } from 'draft-js';

import { createRichEditorLinkDecorator } from './decorators';

export const getRichEditorDecorators = () =>
  new CompositeDecorator([createRichEditorLinkDecorator()]);

export const getRichEditorCurrentBlock = (
  contentState: ContentState,
  selectionState: SelectionState
) => contentState.getBlockForKey(selectionState.getAnchorKey());

export const getRichEditorSelectedText = (
  contentState: ContentState,
  selectionState: SelectionState
) => {
  const currentBlock = getRichEditorCurrentBlock(contentState, selectionState);

  const startOffset = selectionState.getStartOffset();
  const endOffset = selectionState.getEndOffset();

  return currentBlock.getText().slice(startOffset, endOffset);
};

type FoundEntityInstance = EntityInstance & {
  start: number;
  end: number;
};

export const findRichEditorEntity = (
  contentState: ContentState,
  selectionState: SelectionState,
  predicate: (entity: EntityInstance) => boolean
): FoundEntityInstance | null => {
  let currentEntity: EntityInstance | null = null;
  let foundEntity: FoundEntityInstance | null = null;

  const currentBlock = getRichEditorCurrentBlock(contentState, selectionState);

  currentBlock.findEntityRanges(
    value => {
      if (foundEntity) {
        return false;
      }

      const entityKey = value.getEntity();
      if (entityKey) {
        const entity = contentState.getEntity(entityKey);

        if (predicate(entity)) {
          currentEntity = entity;
          return true;
        }
      }

      return false;
    },
    (start, end) => {
      if (currentEntity) {
        foundEntity = {
          start,
          end,
          ...currentEntity,
        };
      }
    }
  );

  return foundEntity;
};
