import type { ComponentProps } from 'react';
import React, { forwardRef, useState } from 'react';
import { Box } from '@mui/material';
import type { ContentBlock, DraftHandleValue } from 'draft-js';
import { ContentState, Editor, RichUtils, EditorState } from 'draft-js';

import 'draft-js/dist/Draft.css';

import { RichEditorStyled } from './RichEditor.styled';
import { MediaRenderer } from './renderers';

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

    const toggleH1 = () => {
      onChange(RichUtils.toggleInlineStyle(editorState, 'FONT_SIZE_H1'));
    };

    const toggleH2 = () => {
      onChange(RichUtils.toggleInlineStyle(editorState, 'FONT_SIZE_H2'));
    };

    const toggleBold = () => {
      onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
    };

    const toggleCode = () => {
      onChange(RichUtils.toggleBlockType(editorState, 'code-block'));
    };

    const handleKeyCommand = (command: string, editorState: EditorState): DraftHandleValue => {
      const newState = RichUtils.handleKeyCommand(editorState, command);

      if (newState) {
        onChange(newState);
        return 'handled';
      }

      return 'not-handled';
    };

    const handleReturn = (e: React.KeyboardEvent, editorState: EditorState): DraftHandleValue => {
      if (
        e.code === 'Enter' &&
        (e.getModifierState('Shift') || e.getModifierState('Alt') || e.getModifierState('Control'))
      ) {
        onChange(RichUtils.insertSoftNewline(editorState));
        return 'handled';
      }

      return 'not-handled';
    };

    const blockStyleFn = (contentBlock: ContentBlock): string => {
      const type = contentBlock.getType();

      if (type === 'code-block') {
        return 'code';
      }

      return '';
    };

    const blockRendererFn = (block: ContentBlock) => {
      if (block.getType() === 'atomic') {
        return {
          component: MediaRenderer,
          editable: false,
          props: {
            setEditorReadOnly: setReadOnly,
            onUpdateContent: (contentState: ContentState) => {
              onChange(EditorState.push(editorState, contentState, 'apply-entity'));
            },
          },
        };
      }

      return null;
    };

    return (
      <RichEditorStyled>
        <div>
          <button onClick={toggleH1}>H1</button>
          <button onClick={toggleH2}>H2</button>
          <button onClick={toggleBold}>B</button>
          <button onClick={toggleCode}>``</button>
        </div>

        <Box mt={1} display="flex" flexGrow={1}>
          <Editor
            ref={ref}
            editorState={editorState}
            onChange={onChange}
            customStyleMap={customStyleMap}
            blockStyleFn={blockStyleFn}
            blockRendererFn={blockRendererFn}
            handleKeyCommand={handleKeyCommand}
            handleReturn={handleReturn}
            readOnly={readOnly}
            {...props}
          />
        </Box>
      </RichEditorStyled>
    );
  }
);
