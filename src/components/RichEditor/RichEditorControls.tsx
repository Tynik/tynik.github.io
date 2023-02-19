import type { DraftBlockType } from 'draft-js';

import React, { useEffect, useRef } from 'react';
import { Button, Stack, styled } from '@mui/material';
import {
  Code as CodeIcon,
  FormatBold as FormatBoldIcon,
  FormatItalic as FormatItalicIcon,
  FormatListNumbered as FormatListNumberedIcon,
  Link as LinkIcon,
  FormatClear as FormatClearIcon,
} from '@mui/icons-material';
import { EditorState, Modifier, RichUtils } from 'draft-js';

import { useContent } from '~/components';

const Controls = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  '&.stick': {
    position: 'fixed',
    zIndex: 9999,
  },
}));

type RichEditorControlsProps = {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
};

export const RichEditorControls = ({ editorState, onChange }: RichEditorControlsProps) => {
  const currentBlockType = RichUtils.getCurrentBlockType(editorState);
  const currentInlineStyle = editorState.getCurrentInlineStyle();

  const contentElRef = useContent();
  const controlsElRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const contentEl = contentElRef?.current;
    const controlsEl = controlsElRef.current;
    const controlsParent = controlsEl?.parentElement;

    if (!contentEl || !controlsEl || !controlsParent) {
      return () => {};
    }

    let initialOffset: number | null = null;

    const stick = () => {
      const contentScrollY = contentEl.offsetTop + contentEl.scrollTop;

      if (initialOffset) {
        if (contentScrollY <= initialOffset) {
          initialOffset = null;
          controlsEl.classList.remove('stick');

          controlsParent.style.paddingTop = '0';
        }
        return;
      }

      if (contentScrollY > controlsEl.offsetTop) {
        initialOffset = controlsEl.offsetTop;

        controlsEl.style.top = `${contentEl.offsetTop}px`;
        controlsEl.classList.add('stick');

        controlsParent.style.paddingTop = `${controlsEl.clientHeight}px`;
      }
    };

    contentEl.addEventListener('scroll', stick);

    return () => {
      contentEl.removeEventListener('scroll', stick);
    };
  }, [contentElRef, controlsElRef.current]);

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

  const removeInlineStyles = (editorState: EditorState) => {
    const contentState = editorState.getCurrentContent();

    const contentWithoutStyles = ['FONT_SIZE_H1', 'FONT_SIZE_H2', 'BOLD', 'ITALIC', 'CODE'].reduce(
      (newContentState, style) =>
        Modifier.removeInlineStyle(newContentState, editorState.getSelection(), style),
      contentState
    );

    return EditorState.push(editorState, contentWithoutStyles, 'change-inline-style');
  };

  const clearFormatting = () => {
    onChange(removeInlineStyles(editorState));
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
    <Controls ref={controlsElRef} direction="row" spacing={1}>
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

      <Button variant="outlined" size="small" onClick={clearFormatting}>
        <FormatClearIcon fontSize="small" />
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
    </Controls>
  );
};
