import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { DraftHandleValue } from 'draft-js';
import { Editor, EditorState, convertToRaw, convertFromRaw, AtomicBlockUtils } from 'draft-js';
import { Button, Stack, TextField, Grid } from '@mui/material';

import { toast } from 'react-toastify';

import type { RichPost } from '~/types';

import { updatePostRequest, uploadPostFileRequest } from '~/api';
import { RichEditor } from '~/components';
import { useUser } from '~/providers';
import { PreviewPostPage } from './PreviewPostPage';

type EditPostPageFitProps = {
  post: RichPost;
};

export const EditPostPageFit = ({ post }: EditPostPageFitProps) => {
  const navigate = useNavigate();

  const user = useUser();

  const [title, setTitle] = useState(post.title);
  const [subtitle, setSubtitle] = useState(post.subtitle);

  const [editorState, setEditorState] = useState(() => {
    const content = convertFromRaw(JSON.parse(post.richContent) as never);

    return EditorState.createWithContent(content);
  });

  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const editorRef = useRef<Editor | null>(null);

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const savePostHandler = async () => {
    const editorEl = editorRef.current;

    if (!title || !subtitle || !user.ethAccount || !editorEl || !editorEl.editor) {
      return;
    }

    try {
      await updatePostRequest({
        title,
        subtitle,
        cid: post.cid,
        ethAccount: user.ethAccount,
        content: editorEl.editor.innerHTML,
        richContent: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      });

      toast('Successfully updated', { type: 'success' });

      navigate('/');
    } catch (e) {
      console.error(e);

      toast('Something went wrong', { type: 'error' });
    }
  };

  const isCanBeSaved = Boolean(
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

  const handlePastedFiles = (files: Blob[]): DraftHandleValue => {
    uploadPostFileRequest({ files, ethAccount: '' })
      .then(fileURL => {
        const contentStateWithEntity = editorState
          .getCurrentContent()
          .createEntity('IMAGE', 'IMMUTABLE', {
            src: fileURL,
          });

        const newEditorState = EditorState.set(editorState, {
          currentContent: contentStateWithEntity,
        });

        setEditorState(
          AtomicBlockUtils.insertAtomicBlock(
            newEditorState,
            contentStateWithEntity.getLastCreatedEntityKey(),
            ' '
          )
        );
      })
      .catch(() => {
        toast('Something went wrong', { type: 'error' });
      });

    return 'handled';
  };

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
        <RichEditor
          ref={editorRef}
          editorState={editorState}
          onChange={setEditorState}
          handlePastedFiles={handlePastedFiles}
        />

        <Stack mt={2} spacing={2} direction="row" justifyContent="right">
          <Button onClick={togglePreviewMode} disabled={!isCanBeSaved}>
            Preview
          </Button>

          <Button onClick={savePostHandler} disabled={!isCanBeSaved}>
            Save
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};
