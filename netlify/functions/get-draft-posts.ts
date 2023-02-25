import type { ContractPost } from '../types';

import { createHandler, getMyProfileContract, getWeb3Client } from '../netlify.helpers';
import { CONTRACT_POST_STATUS_MAP } from '../constants';

export const handler = createHandler({ allowMethods: ['GET', 'OPTIONS'] }, async () => {
  const web3Client = getWeb3Client();
  const myProfileContract = getMyProfileContract(web3Client);

  const draftPosts = (await myProfileContract.methods.getDraftPosts(0, 20).call()) as {
    0: ContractPost[];
    1: string;
  };

  return {
    status: 'ok',
    data: {
      total: +draftPosts['1'],
      list: draftPosts['0']
        .filter(post => post.cid)
        .map(post => ({
          cid: post.cid,
          status: CONTRACT_POST_STATUS_MAP[post.status],
          slug: post.slug,
          created: +post.created,
        })),
    },
  };
});
