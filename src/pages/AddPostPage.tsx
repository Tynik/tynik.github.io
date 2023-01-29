import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Button, Box, TextField } from '@mui/material';

import { addPostRequest } from '~/api';
import { useEth } from '~/hooks';
import { RichEditor } from '~/components';

export const AddPostPage = () => {
  const [title, setTitle] = useState<string | null>(null);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const { ethAccount } = useEth();

  const addPostHandler = async () => {
    try {
      await addPostRequest({
        title,
        ethAccount,
        content: editorState.getCurrentContent().getPlainText(),
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <TextField
        label="Title"
        value={title || ''}
        onChange={e => setTitle(e.target.value)}
        error={title === ''}
        fullWidth
      />

      <RichEditor editorState={editorState} onChange={setEditorState} />

      <Box mt={2} textAlign="right">
        <Button onClick={addPostHandler}>Add Post</Button>
      </Box>
    </>
  );
};
