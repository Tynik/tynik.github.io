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

type PublishPostPayload = {
  title: string;
  subtitle: string;
  content: string;
  richContent: string;
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

type GetPostsResponse = {
  list: PostCID[];
  total: number;
};

export const getPostsRequest = async () => {
  return (await netlifyRequest<GetPostsResponse>('get-posts')).data;
};
