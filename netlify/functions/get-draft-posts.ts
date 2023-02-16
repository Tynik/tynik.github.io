import { createHandler, getMyProfileContract, getWeb3Client } from '../netlify.helpers';

export const handler = createHandler({ allowMethods: ['GET', 'OPTIONS'] }, async () => {
  const web3Client = getWeb3Client();
  const myProfileContract = getMyProfileContract(web3Client);

  const draftPosts = (await myProfileContract.methods.getDraftPosts(0, 20).call()) as {
    0: string[];
    1: string;
  };

  return {
    status: 'ok',
    data: {
      list: draftPosts['0'].filter(postCID => postCID),
      total: +draftPosts['1'],
    },
  };
});
