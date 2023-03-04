import type { ContractPost } from '../types';

import { createHandler, getMyProfileContract, getWeb3Client } from '../netlify.helpers';
import { CONTRACT_POST_STATUS_MAP } from '../constants';

export const handler = createHandler({ allowMethods: ['GET', 'OPTIONS'] }, async ({ event }) => {
  const web3Client = getWeb3Client();
  const myProfileContract = getMyProfileContract(web3Client);

  const slug = event.queryStringParameters?.slug;

  const post = (await myProfileContract.methods.getPostBySlug(slug).call()) as ContractPost;

  if (!post.cid) {
    return {
      status: 'error',
      statusCode: 404,
    };
  }

  return {
    status: 'ok',
    data: {
      cid: post.cid,
      status: CONTRACT_POST_STATUS_MAP[post.status],
      slug: post.slug,
      created: +post.created,
    },
  };
});
