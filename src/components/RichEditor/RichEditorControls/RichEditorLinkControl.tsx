import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Link as LinkIcon } from '@mui/icons-material';
import { CompositeDecorator, Modifier, EditorState } from 'draft-js';

import { getRichEditorSelectedText, createRichEditorLinkDecorator } from '~/components';

type RichEditorLinkControlProps = {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
};

export const RichEditorLinkControl = ({ editorState, onChange }: RichEditorLinkControlProps) => {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();

  const [isCreateLink, setIsCreateLink] = useState(false);
  const [linkHref, setLinkHref] = useState('');

  const createLink = () => {
    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', {
      href: linkHref,
      target: '_blank',
    });

    const selectedText = getRichEditorSelectedText(contentState, selectionState);

    const contentStateWithLink = Modifier.replaceText(
      contentStateWithEntity,
      selectionState,
      selectedText,
      editorState.getCurrentInlineStyle(),
      contentStateWithEntity.getLastCreatedEntityKey()
    );

    onChange(
      EditorState.createWithContent(
        contentStateWithLink,
        new CompositeDecorator([createRichEditorLinkDecorator()])
      )
    );
  };

  const onCreateLink = () => {
    createLink();

    setIsCreateLink(false);
  };

  return (
    <>
      <Button
        variant={0 ? 'contained' : 'outlined'}
        size="small"
        onClick={() => setIsCreateLink(true)}
      >
        <LinkIcon fontSize="small" />
      </Button>

      <Dialog open={isCreateLink} onClose={() => setIsCreateLink(false)}>
        <DialogTitle>Create Link</DialogTitle>

        <DialogContent>
          <TextField
            value={linkHref}
            onChange={e => setLinkHref(e.target.value)}
            variant="standard"
            label="URL"
            autoFocus
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onCreateLink} disabled={!linkHref}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
