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
import { EditorState, RichUtils } from 'draft-js';

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

    const nextEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });

    onChange(
      RichUtils.toggleLink(
        nextEditorState,
        selectionState,
        contentStateWithEntity.getLastCreatedEntityKey()
      )
    );
  };

  const removeLink = () => {
    //
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
        disabled={selectionState.isCollapsed()}
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
