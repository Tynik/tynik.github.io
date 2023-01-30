import React, { ComponentProps, forwardRef } from 'react';
import { Box } from '@mui/material';
import { Editor, RichUtils } from 'draft-js';

import { RichEditorStyled } from './RichEditor.styled';

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
      onChange(RichUtils.toggleCode(editorState));
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
            {...props}
          />
        </Box>
      </RichEditorStyled>
    );
  }
);
