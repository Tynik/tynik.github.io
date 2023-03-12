import type { ContractPost } from '../types';

import {
  getMyProfileContract,
  getWeb3Client,
  createHandler,
  putWeb3PostFiles,
} from '../netlify.helpers';

type UpdatePostPayload = {
  cid: string;
  title: string;
  subtitle: string;
  keywords: string[];
  content: string;
  richContent: string;
};

export const handler = createHandler<UpdatePostPayload>(
  { allowMethods: ['POST', 'OPTIONS'] },
  async ({ payload }) => {
    if (!payload) {
      return {
        status: 'error',
        data: {
          message: 'Payload is required',
        },
      };
    }

    const { cid, ...postPayload } = payload;

    const web3Client = getWeb3Client();
    const myProfileContract = getMyProfileContract(web3Client);

    const post = (await myProfileContract.methods.getPost(cid).call()) as ContractPost;

    const newPostCID = await putWeb3PostFiles({ ...postPayload, created: +post.created });

    return {
      status: 'ok',
      data: newPostCID,
    };
  }
);
