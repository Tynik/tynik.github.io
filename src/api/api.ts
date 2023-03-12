import type { PostInfoContent, Post, PostCID, RichPost, PostStatus } from '~/types';

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

export const getMyProfileContractAddress = async () => {
  return (await netlifyRequest<string>('get-my-profile-contract-address')).data;
};

export const getMyProfileContractBalance = async () => {
  return (await netlifyRequest<string>('get-my-profile-contract-balance')).data;
};

type CreateDraftPostPayload = {
  title: string;
  subtitle: string;
  keywords: string[];
  slug: string;
  content: string;
  richContent: string;
  ethAccount: string;
};

export const createDraftPostRequest = async (payload: CreateDraftPostPayload) =>
  netlifyRequest('create-draft-post', { payload, method: 'POST' });

type RestorePostPayload = {
  cid: PostCID;
  slug: string;
  created: number;
  ethAccount: string;
};

export const restorePostRequest = async (payload: RestorePostPayload) =>
  netlifyRequest('restore-post', { payload, method: 'POST' });

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
  keywords: string[];
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

export type PostInfo = {
  cid: string;
  status: PostStatus;
  slug: string;
  created: number;
};

export const getPostBySlugRequest = async (slug: string) => {
  return (await netlifyRequest<PostInfo>('get-post-by-slug', { params: { slug } })).data;
};

export const getPostInfoContentRequest = async (postCID: PostCID): Promise<PostInfoContent> => {
  const response = await fetch(`https://${postCID}.ipfs.w3s.link/post.json`);
  if (!response.ok) {
    return Promise.reject();
  }

  const postInfo = (await response.json()) as Omit<PostInfoContent, 'cid'>;

  return {
    cid: postCID,
    ...postInfo,
  };
};

export const getPostContentRequest = async (postCID: PostCID) => {
  const response = await fetch(`https://${postCID}.ipfs.w3s.link/post-content.json`);
  if (!response.ok) {
    return Promise.reject();
  }

  return (
    (await response.json()) as {
      content: string;
    }
  ).content;
};

export const getPostRequest = async (slug: string): Promise<Post> => {
  const post = await getPostBySlugRequest(slug);

  const [postInfo, content] = await Promise.all([
    getPostInfoContentRequest(post.cid),
    getPostContentRequest(post.cid),
  ]);

  return {
    ...postInfo,
    status: post.status,
    slug: post.slug,
    content,
  };
};

export const getRichPostContentRequest = async (postCID: PostCID) => {
  const response = await fetch(`https://${postCID}.ipfs.w3s.link/post-rich-content.json`);
  if (!response.ok) {
    return Promise.reject();
  }

  return (
    (await response.json()) as {
      content: string;
    }
  ).content;
};

export const getRichPostRequest = async (slug: string): Promise<RichPost> => {
  const post = await getPostBySlugRequest(slug);

  const [postInfo, content] = await Promise.all([
    getPostInfoContentRequest(post.cid),
    getRichPostContentRequest(post.cid),
  ]);

  return {
    ...postInfo,
    status: post.status,
    slug: post.slug,
    richContent: content,
  };
};

type GetPublishedPostsResponse = {
  list: PostInfo[];
  total: number;
};

export const getPublishedPostsRequest = async () => {
  return (await netlifyRequest<GetPublishedPostsResponse>('get-published-posts')).data;
};

type GetDraftPostsResponse = {
  list: PostInfo[];
  total: number;
};

export const getDraftPostsRequest = async () => {
  return (await netlifyRequest<GetDraftPostsResponse>('get-draft-posts')).data;
};
