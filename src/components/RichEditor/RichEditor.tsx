import type { ComponentProps } from 'react';
import type { ContentBlock, DraftHandleValue, ContentState } from 'draft-js';
import React, { forwardRef, useState } from 'react';

import { Box } from '@mui/material';
import { Editor, RichUtils, EditorState } from 'draft-js';

import 'draft-js/dist/Draft.css';

import type { BlockRenderer } from './RichEditor.types';

import { RichEditorStyled } from './RichEditor.styled';
import { RichEditorCodeBlockRenderer, RichEditorMediaBlockRenderer } from './renderers';
import { RichEditorControls } from '~/components/RichEditor/RichEditorControls';

const customStyleMap: Record<string, React.CSSProperties> = {
  FONT_SIZE_H1: {
    fontSize: '32px',
  },
  FONT_SIZE_H2: {
    fontSize: '24px',
  },
};

type RichEditorProps = ComponentProps<typeof Editor>;

export const RichEditor = forwardRef<Editor, RichEditorProps>(
  ({ editorState, onChange, ...props }, ref) => {
    const [readOnly, setReadOnly] = useState(false);

    const onKeyCommandHandler = (command: string, editorState: EditorState): DraftHandleValue => {
      const newState = RichUtils.handleKeyCommand(editorState, command);

      if (newState) {
        onChange(newState);
        return 'handled';
      }

      return 'not-handled';
    };

    const onReturnHandler = (
      e: React.KeyboardEvent,
      editorState: EditorState
    ): DraftHandleValue => {
      if (
        e.code === 'Enter' &&
        (e.getModifierState('Shift') || e.getModifierState('Alt') || e.getModifierState('Control'))
      ) {
        onChange(RichUtils.insertSoftNewline(editorState));
        return 'handled';
      }

      return 'not-handled';
    };

    const blockRenderer = (block: ContentBlock): BlockRenderer => {
      const type = block.getType();

      if (type === 'atomic') {
        return {
          component: RichEditorMediaBlockRenderer,
          editable: false,
          props: {
            setEditorReadOnly: setReadOnly,
            onUpdateContent: (newContentState: ContentState) => {
              onChange(EditorState.push(editorState, newContentState, 'apply-entity'));
            },
          },
        };
      }

      if (type === 'code') {
        return {
          component: RichEditorCodeBlockRenderer,
          editable: true,
          props: {
            setEditorReadOnly: setReadOnly,
            onUpdateContent: (newContentState: ContentState) => {
              onChange(EditorState.push(editorState, newContentState, 'change-block-data'));
            },
          },
        };
      }

      return null;
    };

    return (
      <RichEditorStyled>
        <RichEditorControls editorState={editorState} onChange={onChange} />

        <Box mt={1} display="flex" flexGrow={1}>
          <Editor
            ref={ref}
            editorState={editorState}
            onChange={onChange}
            customStyleMap={customStyleMap}
            blockRendererFn={blockRenderer}
            handleKeyCommand={onKeyCommandHandler}
            handleReturn={onReturnHandler}
            readOnly={readOnly}
            {...props}
          />
        </Box>
      </RichEditorStyled>
    );
  }
);
