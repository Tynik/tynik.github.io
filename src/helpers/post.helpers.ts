import { convertToRaw, Editor } from 'draft-js';

import type { EditorState } from 'draft-js';
import type { PostCid } from '~/types';

import { createDraftPostRequest, updatePostRequest } from '~/api';

import { getWeb3Client } from './eth.helpers';
import { myProfileContractCreateDraftPost, myProfileContractUpdatePost } from './contracts.helpers';

const getRichContent = (editorState: EditorState) =>
  JSON.stringify(convertToRaw(editorState.getCurrentContent()));

type CreateDraftPostOptions = {
  title: string;
  subtitle: string;
  keywords: string[];
  slug: string;
  ethAccount: string;
};

export const createDraftPost = async (
  editor: Editor,
  editorState: EditorState,
  { slug, ethAccount, ...options }: CreateDraftPostOptions
) => {
  const created = new Date().getTime();

  const postCID = await createDraftPostRequest({
    richContent: getRichContent(editorState),
    content: editor.editor?.innerHTML ?? '',
    created,
    ...options,
  });

  return myProfileContractCreateDraftPost(getWeb3Client(), ethAccount, {
    cid: postCID,
    slug,
    created,
  });
};

type UpdatePostOptions = {
  cid: PostCid;
  title: string;
  subtitle: string;
  slug: string;
  keywords: string[];
  ethAccount: string;
};

export const updatePost = async (
  editor: Editor,
  editorState: EditorState,
  { ethAccount, ...options }: UpdatePostOptions
) => {
  const newPostCID = await updatePostRequest({
    richContent: getRichContent(editorState),
    content: editor.editor?.innerHTML ?? '',
    ...options,
  });

  return myProfileContractUpdatePost(getWeb3Client(), ethAccount, {
    oldCid: options.cid,
    newCid: newPostCID,
    slug: options.slug,
  });
};
