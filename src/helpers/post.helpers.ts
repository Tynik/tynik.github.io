import { convertToRaw, Editor } from 'draft-js';

import type { EditorState } from 'draft-js';
import type { PostCID } from '~/types';

import { createDraftPostRequest, updatePostRequest } from '~/api';

import { getWeb3Client } from './eth.helpers';
import { getMyProfileContract } from './contracts.helpers';

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
  const web3 = getWeb3Client();
  const myProfileContract = getMyProfileContract(web3);

  const created = new Date().getTime();

  const postCID = await createDraftPostRequest({
    richContent: getRichContent(editorState),
    content: editor.editor?.innerHTML ?? '',
    created,
    ...options,
  });

  return myProfileContract.methods
    .createDraftPost(postCID, slug, created)
    .send({ from: ethAccount, gas: 1000000 });
};

type UpdatePostOptions = {
  cid: PostCID;
  title: string;
  subtitle: string;
  keywords: string[];
  ethAccount: string;
};

export const updatePost = async (
  editor: Editor,
  editorState: EditorState,
  { ethAccount, ...options }: UpdatePostOptions
) => {
  const web3 = getWeb3Client();
  const myProfileContract = getMyProfileContract(web3);

  const newPostCID = await updatePostRequest({
    richContent: getRichContent(editorState),
    content: editor.editor?.innerHTML ?? '',
    ...options,
  });

  return myProfileContract.methods
    .updatePost(options.cid, newPostCID)
    .send({ from: ethAccount, gas: 1000000 });
};

type RestorePostOptions = {
  cid: PostCID;
  slug: string;
  created: number;
  ethAccount: string;
};

export const restorePost = ({ cid, slug, created, ethAccount }: RestorePostOptions) => {
  const web3 = getWeb3Client();
  const myProfileContract = getMyProfileContract(web3);

  return myProfileContract.methods
    .createDraftPost(cid, slug, created)
    .send({ from: ethAccount, gas: 1000000 });
};

type PublishPostOptions = {
  postCID: PostCID;
  ethAccount: string;
};

export const publishPost = ({ postCID, ethAccount }: PublishPostOptions) => {
  const web3 = getWeb3Client();
  const myProfileContract = getMyProfileContract(web3);

  return myProfileContract.methods.publishPost(postCID).send({ from: ethAccount, gas: 1000000 });
};
