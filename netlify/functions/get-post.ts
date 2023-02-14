import { createHandler, getMyProfileContract, getWeb3Client } from '../netlify.helpers';

type PostStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

const POST_STATUS_MAP: Record<string, PostStatus> = {
  0: 'DRAFT',
  1: 'PUBLISHED',
  2: 'ARCHIVED',
};

export const handler = createHandler({ allowMethods: ['GET', 'OPTIONS'] }, async ({ event }) => {
  const web3Client = getWeb3Client();
  const myProfileContract = getMyProfileContract(web3Client);

  const postCID = event.queryStringParameters?.postCID;

  const result = (await myProfileContract.methods.getPost(postCID).call()) as {
    status: string;
    created: string;
    index: string;
  };

  return {
    status: 'ok',
    data: {
      status: POST_STATUS_MAP[result.status],
      created: +result.created,
    },
  };
});
