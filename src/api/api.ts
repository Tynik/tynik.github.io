import type { PostInfo, Post, PostCID, RichPost } from '~/types';

import { netlifyRequest } from './apiClient';

export type MakeOfferPayload = {
  company: string;
  name: string;
  contact: string;
  salaryRange: string;
  desc: string;
};

export const makeOfferRequest = (payload: MakeOfferPayload) =>
  netlifyRequest('make-offer', { payload, method: 'POST' });

export const authRequest = async (ethAccount: string) => {
  return netlifyRequest('auth', { params: { ethAccount } });
};

type CreateDraftPostPayload = {
  title: string;
  subtitle: string;
  content: string;
  richContent: string;
  ethAccount: string;
};

export const createDraftPostRequest = async (payload: CreateDraftPostPayload) =>
  netlifyRequest('create-draft-post', { payload, method: 'POST' });

type PublishPostPayload = {
  cid: PostCID;
  ethAccount: string;
};

export const publishPostRequest = async (payload: PublishPostPayload) =>
  netlifyRequest('publish-post', { payload, method: 'POST' });

type UpdatePostPayload = {
  cid: PostCID;
  title: string;
  subtitle: string;
  content: string;
  richContent: string;
  ethAccount: string;
};

export const updatePostRequest = async (payload: UpdatePostPayload) =>
  netlifyRequest('update-post', { payload, method: 'POST' });

type UploadPostFilePayload = {
  files: Blob[];
  ethAccount: string;
};

export const uploadPostFileRequest = async ({ files, ethAccount }: UploadPostFilePayload) => {
  const fd = new FormData();

  fd.append('file', files[0]);
  fd.append('ethAccount', ethAccount);

  return (await netlifyRequest('upload-post-file', { payload: fd, method: 'POST' })).data as string;
};

export const getPostInfoRequest = async (postCID: PostCID) =>
  ({
    cid: postCID,
    ...(await (await fetch(`https://${postCID}.ipfs.w3s.link/post.json`)).json()),
  } as PostInfo);

export const getPostContentRequest = async (postCID: PostCID) =>
  (
    (await (await fetch(`https://${postCID}.ipfs.w3s.link/post-content.json`)).json()) as {
      content: string;
    }
  ).content;

export const getPostRequest = async (postCID: PostCID) => {
  const [postInfo, content] = await Promise.all([
    getPostInfoRequest(postCID),
    getPostContentRequest(postCID),
  ]);

  return {
    ...postInfo,
    content,
  } as Post;
};

export const getRichPostContentRequest = async (postCID: PostCID) =>
  (
    (await (await fetch(`https://${postCID}.ipfs.w3s.link/post-rich-content.json`)).json()) as {
      content: string;
    }
  ).content;

export const getRichPostRequest = async (postCID: PostCID) => {
  const [postInfo, content] = await Promise.all([
    getPostInfoRequest(postCID),
    getRichPostContentRequest(postCID),
  ]);

  return {
    ...postInfo,
    richContent: content,
  } as RichPost;
};

type GetPublishedPostsResponse = {
  list: PostCID[];
  total: number;
};

export const getPublishedPostsRequest = async () => {
  return (await netlifyRequest<GetPublishedPostsResponse>('get-published-posts')).data;
};

type GetDraftPostsResponse = {
  list: PostCID[];
  total: number;
};

export const getDraftPostsRequest = async () => {
  return (await netlifyRequest<GetDraftPostsResponse>('get-draft-posts')).data;
};
