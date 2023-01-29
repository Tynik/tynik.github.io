import type { Post, PostCID } from '~/types';
import { netlifyRequest } from '~/api/apiClient';

export type MakeOfferPayload = {
  company: string;
  name: string;
  contact: string;
  salaryRange: string;
  desc: string;
};

export const makeOfferRequest = (payload: MakeOfferPayload) =>
  netlifyRequest('make-offer', { payload, method: 'POST' });

export type AddPostPayload = {
  title: string;
  content: string;
  ethAccount: string;
};

export const addPostRequest = async (payload: AddPostPayload) =>
  netlifyRequest('add-post', { payload, method: 'POST' });

export const getPostRequest = async (postCID: PostCID) =>
  ({
    cid: postCID,
    ...(await (await fetch(`https://${postCID}.ipfs.w3s.link/post.json`)).json()),
  } as Post);

export const getPostsRequest = async () => {
  const postCIDs = (await netlifyRequest<PostCID[]>('get-posts')).data;

  return Promise.all(postCIDs.map(getPostRequest));
};
