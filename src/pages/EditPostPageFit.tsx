import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Editor, EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Button, Stack, TextField, Grid } from '@mui/material';

import type { Post } from '~/types';

import { editPostRequest } from '~/api';
import { RichEditor } from '~/components';
import { useUser } from '~/providers';
import { PreviewPostPage } from './PreviewPostPage';

type EditPostPageFitProps = {
  post: Post;
};

export const EditPostPageFit = ({ post }: EditPostPageFitProps) => {
  const navigate = useNavigate();

  const user = useUser();

  const [title, setTitle] = useState(post.title);
  const [subtitle, setSubtitle] = useState(post.subtitle);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(
      ContentState.createFromBlockArray(convertFromHTML(post.content).contentBlocks)
    )
  );

  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const editorRef = useRef<Editor | null>(null);

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const editPostHandler = async () => {
    const editorEl = editorRef.current;

    if (!title || !subtitle || !user.ethAccount || !editorEl || !editorEl.editor) {
      return;
    }

    try {
      await editPostRequest({
        title,
        subtitle,
        cid: post.cid,
        ethAccount: user.ethAccount,
        content: editorEl.editor.innerHTML,
      });

      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  const isCanBeEdited = Boolean(
    user.ethAccount && title && subtitle && editorState.getCurrentContent().getPlainText()
  );

  if (isPreviewMode) {
    return (
      <PreviewPostPage
        title={title}
        subtitle={subtitle}
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
          <Button onClick={togglePreviewMode} disabled={!isCanBeEdited}>
            Preview
          </Button>

          <Button onClick={editPostHandler} disabled={!isCanBeEdited}>
            Edit Post
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};
