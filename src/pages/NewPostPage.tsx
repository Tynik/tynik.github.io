import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { convertToRaw, Editor, EditorState } from 'draft-js';
import { Button, Stack, TextField, Grid } from '@mui/material';

import { toast } from 'react-toastify';
import { publishPostRequest } from '~/api';
import { RichEditor } from '~/components';
import { useUser } from '~/providers';
import { PreviewPostPage } from './PreviewPostPage';

export const NewPostPage = () => {
  const navigate = useNavigate();

  const user = useUser();

  const [title, setTitle] = useState<string | null>(null);
  const [subtitle, setSubtitle] = useState<string | null>(null);

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const editorRef = useRef<Editor | null>(null);

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const publishPostHandler = async () => {
    const editorEl = editorRef.current;

    if (!title || !subtitle || !user.ethAccount || !editorEl || !editorEl.editor) {
      return;
    }

    try {
      await publishPostRequest({
        title,
        subtitle,
        ethAccount: user.ethAccount,
        content: editorEl.editor.innerHTML,
        richContent: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      });

      toast('Successfully published', { type: 'success' });

      navigate('/');
    } catch (e) {
      console.error(e);

      toast('Something went wrong', { type: 'error' });
    }
  };

  const isCanBeAdded = Boolean(
    user.ethAccount && title && subtitle && editorState.getCurrentContent().getPlainText()
  );

  if (isPreviewMode) {
    return (
      <PreviewPostPage
        title={title ?? ''}
        subtitle={subtitle ?? ''}
        editor={editorRef.current}
        onExit={togglePreviewMode}
      />
    );
  }

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

        <Stack mt={2} spacing={2} direction="row" justifyContent="right">
          <Button onClick={togglePreviewMode} disabled={!isCanBeAdded}>
            Preview
          </Button>

          <Button onClick={publishPostHandler} disabled={!isCanBeAdded}>
            Publish
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};