import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Editor, EditorState } from 'draft-js';
import { Button, Stack, TextField, Grid } from '@mui/material';
import { Visibility as VisibilityIcon, Save as SaveIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';

import { RichEditor } from '~/components';
import { useUser } from '~/providers';
import { createDraftPost } from '~/helpers';
import { PreviewPostPage } from './PreviewPostPage';

export const NewPostPage = () => {
  const navigate = useNavigate();
  const user = useUser();

  const [title, setTitle] = useState<string | null>(null);
  const [subtitle, setSubtitle] = useState<string | null>(null);
  const [slug, setSlug] = useState<string | null>(null);

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const editorRef = useRef<Editor | null>(null);

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const createDraftPostHandler = async () => {
    const editorEl = editorRef.current;

    if (!title || !subtitle || !slug || !user.ethAccount || !editorEl) {
      return;
    }

    try {
      await createDraftPost(editorEl, editorState, {
        title,
        subtitle,
        keywords: [],
        slug,
        ethAccount: user.ethAccount,
      });

      toast('Successfully created', { type: 'success' });

      navigate('/drafts');
    } catch (e) {
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
        <TextField
          label="Slug"
          value={slug || ''}
          onChange={e => setSlug(e.target.value)}
          error={slug === ''}
          fullWidth
        />
      </Grid>

      <Grid xs={12} item>
        <RichEditor ref={editorRef} editorState={editorState} onChange={setEditorState} />

        <Stack mt={2} spacing={2} direction="row" justifyContent="right">
          <Button
            onClick={togglePreviewMode}
            disabled={!isCanBeAdded}
            startIcon={<VisibilityIcon />}
            variant="outlined"
          >
            Preview
          </Button>

          <Button
            onClick={createDraftPostHandler}
            disabled={!isCanBeAdded}
            startIcon={<SaveIcon />}
            variant="outlined"
            color="success"
          >
            Draft
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};
