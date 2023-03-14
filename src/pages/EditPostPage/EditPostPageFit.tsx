import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TextField, Grid } from '@mui/material';
import {
  Editor,
  EditorState,
  convertFromRaw,
  AtomicBlockUtils,
  CompositeDecorator,
} from 'draft-js';

import type { DraftHandleValue } from 'draft-js';
import type { RichPost } from '~/types';

import { uploadPostFileRequest } from '~/api';
import { createRichEditorLinkDecorator, RichEditor } from '~/components';
import { updatePost } from '~/helpers';
import { useUser } from '~/providers';

import { PreviewPostPage } from '../PreviewPostPage';
import { EditPostPageControls } from './EditPostPageControls';
import { PostKeywordsField } from '../components';

type EditPostPageFitProps = {
  richPost: RichPost;
};

export const EditPostPageFit = ({ richPost }: EditPostPageFitProps) => {
  const navigate = useNavigate();
  const user = useUser();

  const [title, setTitle] = useState(richPost.title);
  const [subtitle, setSubtitle] = useState(richPost.subtitle);
  const [slug, setSlug] = useState(richPost.slug);
  const [keywords, setKeywords] = useState(richPost.keywords ?? []);

  const [editorState, setEditorState] = useState(() => {
    const content = convertFromRaw(JSON.parse(richPost.richContent) as never);

    return EditorState.createWithContent(
      content,
      new CompositeDecorator([createRichEditorLinkDecorator()])
    );
  });

  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const editorRef = useRef<Editor | null>(null);

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

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
        const contentState = editorState.getCurrentContent();

        const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', {
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

  const savePostHandler = async () => {
    const editor = editorRef.current;

    if (!title || !subtitle || !user.ethAccount || !editor) {
      return;
    }

    try {
      await updatePost(editor, editorState, {
        title,
        subtitle,
        slug,
        keywords,
        cid: richPost.cid,
        ethAccount: user.ethAccount,
      });

      toast('Successfully updated', { type: 'success' });

      navigate(`/post/${slug}`);
    } catch (e) {
      toast('Something went wrong', { type: 'error' });
    }
  };

  const isCanBeSaved = Boolean(
    user.ethAccount && title && subtitle && editorState.getCurrentContent().getPlainText()
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
        <TextField
          label="Slug"
          value={slug || ''}
          onChange={e => setSlug(e.target.value)}
          error={slug === ''}
          fullWidth
        />
      </Grid>

      <Grid xs={12} item>
        <PostKeywordsField keywords={keywords} onChange={setKeywords} />
      </Grid>

      <Grid xs={12} item>
        <RichEditor
          ref={editorRef}
          editorState={editorState}
          onChange={setEditorState}
          handlePastedFiles={handlePastedFiles}
        />
      </Grid>

      <Grid xs={12} item>
        <EditPostPageControls
          richPost={richPost}
          canBeSaved={isCanBeSaved}
          onTogglePreviewMode={togglePreviewMode}
          onSave={savePostHandler}
        />
      </Grid>
    </Grid>
  );
};
