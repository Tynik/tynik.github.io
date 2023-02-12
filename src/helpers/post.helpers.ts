import type { EditorState } from 'draft-js';
import { convertToRaw, Editor } from 'draft-js';

import type { PostCID } from '~/types';
import { publishPostRequest, updatePostRequest } from '~/api';

const getRichContent = (editorState: EditorState) =>
  JSON.stringify(convertToRaw(editorState.getCurrentContent()));

type PublishPostOptions = {
  title: string;
  subtitle: string;
  ethAccount: string;
};

export const publishPost = (
  editor: Editor,
  editorState: EditorState,
  options: PublishPostOptions
) => {
  return publishPostRequest({
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