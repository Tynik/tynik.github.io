import type { Post } from '~/types';

export type NetlifyResponse<Response> = {
  status: string;
  data: Response;
};

type NetlifyRequestOptions<Payload> = {
  payload?: Payload;
  method?: 'POST' | 'GET';
  params?: Record<string, string>;
};

const netlifyRequest = async <Response, Payload = void>(
  funcName: string,
  { payload, method = 'GET', params = {} }: NetlifyRequestOptions<Payload> = {}
) => {
  let body: BodyInit | null = null;

  if (payload instanceof FormData) {
    body = payload;
    //
  } else if (payload) {
    body = JSON.stringify(payload);
  }

  return (await (
    await fetch(
      `${process.env.NETLIFY_SERVER || ''}/.netlify/functions/${funcName}?${new URLSearchParams(
        params
      ).toString()}`,
      {
        method,
        body,
      }
    )
  ).json()) as Promise<NetlifyResponse<Response>>;
};

export type MakeOfferPayload = {
  company: string;
  name: string;
  contact: string;
  salaryRange: string;
  desc: string;
};

export const makeOffer = (payload: MakeOfferPayload) =>
  netlifyRequest('make-offer', { payload, method: 'POST' });

export type AddPostPayload = {
  title: string;
  content: string;
  ethAccount: string;
};

export const addPost = async (payload: AddPostPayload) =>
  netlifyRequest('add-post', { payload, method: 'POST' });

type Web3PostFile = {
  content: string;
};

export const getPosts = async () => {
  const web3PostFiles = (await netlifyRequest<Web3PostFile[]>('get-posts')).data;

  return web3PostFiles.map(file => JSON.parse(file.content) as Post);
};
