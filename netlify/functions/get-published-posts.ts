import { createHandler, getMyProfileContract, getWeb3Client } from '../netlify.helpers';

export const handler = createHandler({ allowMethods: ['GET', 'OPTIONS'] }, async () => {
  const web3Client = getWeb3Client();
  const myProfileContract = getMyProfileContract(web3Client);

  const publishedPosts = (await myProfileContract.methods.getPublishedPosts(0, 20).call()) as {
    0: string[];
    1: string;
  };

  return {
    status: 'ok',
    data: {
      list: publishedPosts['0'].filter(postCID => postCID),
      total: +publishedPosts['1'],
    },
  };
});
