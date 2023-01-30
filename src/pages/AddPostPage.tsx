import React, { useRef, useState } from 'react';
import { Editor, EditorState } from 'draft-js';
import { Button, Box, TextField, Grid } from '@mui/material';

import { addPostRequest } from '~/api';
import { useEth } from '~/hooks';
import { RichEditor } from '~/components';

export const AddPostPage = () => {
  const [title, setTitle] = useState<string | null>(null);
  const [subtitle, setSubtitle] = useState<string | null>(null);

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const editorRef = useRef<Editor | null>(null);

  const { ethAccount } = useEth();

  const addPostHandler = async () => {
    const editorEl = editorRef.current;

    if (!title || !subtitle || !ethAccount || !editorEl || !editorEl.editor) {
      return;
    }

    try {
      await addPostRequest({
        title,
        subtitle,
        ethAccount,
        content: editorEl.editor.innerHTML,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const isCanBeAdded = Boolean(
    ethAccount && title && subtitle && editorState.getCurrentContent().getPlainText()
  );

  return (
    <Grid spacing={2} container>
      <Grid xs={12} item>
        <TextField
          label="Title"
          value={title || ''}
          onChange={e => setTitle(e.target.value)}
          error={title === ''}
          fullWidth
        />
      </Grid>

      <Grid xs={12} item>
        <TextField
          label="Subtitle"
          value={subtitle || ''}
          onChange={e => setSubtitle(e.target.value)}
          error={subtitle === ''}
          fullWidth
        />
      </Grid>

      <Grid xs={12} item>
        <RichEditor ref={editorRef} editorState={editorState} onChange={setEditorState} />

        <Box mt={2} textAlign="right">
          <Button onClick={addPostHandler} disabled={!isCanBeAdded}>
            Add Post
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
