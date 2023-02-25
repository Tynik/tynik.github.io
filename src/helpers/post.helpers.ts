import type { EditorState } from 'draft-js';
import { convertToRaw, Editor } from 'draft-js';

import type { PostCID } from '~/types';
import { createDraftPostRequest, updatePostRequest } from '~/api';

const getRichContent = (editorState: EditorState) =>
  JSON.stringify(convertToRaw(editorState.getCurrentContent()));

type CreateDraftPostOptions = {
  title: string;
  subtitle: string;
  slug: string;
  ethAccount: string;
};

export const createDraftPost = (
  editor: Editor,
  editorState: EditorState,
  options: CreateDraftPostOptions
) => {
  return createDraftPostRequest({
    richContent: getRichContent(editorState),
    content: editor.editor?.innerHTML ?? '',
    ...options,
  });
};

type UpdatePostOptions = {
  cid: PostCID;
  title: string;
  subtitle: string;
  ethAccount: string;
};

export const updatePost = (
  editor: Editor,
  editorState: EditorState,
  options: UpdatePostOptions
) => {
  return updatePostRequest({
    richContent: getRichContent(editorState),
    content: editor.editor?.innerHTML ?? '',
    ...options,
  });
};
