import type { ComponentProps } from 'react';
import type { ContentBlock, DraftHandleValue, ContentState } from 'draft-js';
import React, { forwardRef, useState } from 'react';

import { Box } from '@mui/material';
import { Editor, RichUtils, EditorState } from 'draft-js';

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

import 'draft-js/dist/Draft.css';
import 'highlight.js/styles/github-dark-dimmed.css';

import type { BlockRenderer } from './richEditor.types';

import { RichEditorStyled } from './RichEditor.styled';
import { CodeBlockRenderer, MediaBlockRenderer } from './renderers';

// eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-unsafe-assignment
const hljsDefineSolidity = require('highlightjs-solidity');

hljs.registerLanguage('javascript', javascript);

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
hljsDefineSolidity(hljs);

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
      onChange(RichUtils.toggleBlockType(editorState, 'code'));
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

    const blockRendererFn = (block: ContentBlock): BlockRenderer => {
      const type = block.getType();

      if (type === 'atomic') {
        return {
          component: MediaBlockRenderer,
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
          component: CodeBlockRenderer,
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
