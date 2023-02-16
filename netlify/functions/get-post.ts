import type { ContractPost } from '../types';

import { createHandler, getMyProfileContract, getWeb3Client } from '../netlify.helpers';
import { CONTRACT_POST_STATUS_MAP } from '../constants';

export const handler = createHandler({ allowMethods: ['GET', 'OPTIONS'] }, async ({ event }) => {
  const web3Client = getWeb3Client();
  const myProfileContract = getMyProfileContract(web3Client);

  const postCID = event.queryStringParameters?.postCID;

  const post = (await myProfileContract.methods.getPost(postCID).call()) as ContractPost;

  return {
    status: 'ok',
    data: {
      status: CONTRACT_POST_STATUS_MAP[post.status],
      created: +post.created,
    },
  };
});
