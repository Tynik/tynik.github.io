import type { EditorState, DraftBlockType } from 'draft-js';

import React from 'react';
import { Button, Stack } from '@mui/material';
import {
  Code as CodeIcon,
  FormatBold as FormatBoldIcon,
  FormatItalic as FormatItalicIcon,
  FormatListNumbered as FormatListNumberedIcon,
  Link as LinkIcon,
} from '@mui/icons-material';
import { RichUtils } from 'draft-js';

type RichEditorControlsProps = {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
};

export const RichEditorControls = ({ editorState, onChange }: RichEditorControlsProps) => {
  const currentBlockType = RichUtils.getCurrentBlockType(editorState);
  const currentInlineStyle = editorState.getCurrentInlineStyle();

  const toggleInlineStyle = (inlineStyle: string) => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const toggleBlockType = (blockType: DraftBlockType | string) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleH1 = () => {
    toggleInlineStyle('FONT_SIZE_H1');
  };

  const toggleH2 = () => {
    toggleInlineStyle('FONT_SIZE_H2');
  };

  const toggleBold = () => {
    toggleInlineStyle('BOLD');
  };

  const toggleItalic = () => {
    toggleInlineStyle('ITALIC');
  };

  const toggleLink = () => {
    //
  };

  const toggleOrderedList = () => {
    toggleBlockType('ordered-list-item');
  };

  const toggleCode = () => {
    toggleBlockType('code');
  };

  return (
    <Stack direction="row" spacing={1}>
      <Button
        variant={currentInlineStyle.has('FONT_SIZE_H1') ? 'contained' : 'outlined'}
        size="small"
        onClick={toggleH1}
      >
        H1
      </Button>

      <Button
        variant={currentInlineStyle.has('FONT_SIZE_H2') ? 'contained' : 'outlined'}
        size="small"
        onClick={toggleH2}
      >
        H2
      </Button>

      <Button
        variant={currentInlineStyle.has('BOLD') ? 'contained' : 'outlined'}
        size="small"
        onClick={toggleBold}
      >
        <FormatBoldIcon fontSize="small" />
      </Button>

      <Button
        variant={currentInlineStyle.has('ITALIC') ? 'contained' : 'outlined'}
        size="small"
        onClick={toggleItalic}
      >
        <FormatItalicIcon fontSize="small" />
      </Button>

      <Button
        variant={currentBlockType === 'ordered-list-item' ? 'contained' : 'outlined'}
        size="small"
        onClick={toggleOrderedList}
      >
        <FormatListNumberedIcon fontSize="small" />
      </Button>

      <Button
        variant={currentInlineStyle.has('LINK') ? 'contained' : 'outlined'}
        size="small"
        onClick={toggleLink}
      >
        <LinkIcon fontSize="small" />
      </Button>

      <Button
        variant={currentBlockType === 'code' ? 'contained' : 'outlined'}
        size="small"
        onClick={toggleCode}
      >
        <CodeIcon fontSize="small" />
      </Button>
    </Stack>
  );
};
