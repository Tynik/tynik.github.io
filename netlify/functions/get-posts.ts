import { createHandler, getMyProfileContract, getWeb3Client } from '../netlify.helpers';

export const handler = createHandler({ allowMethods: ['GET', 'OPTIONS'] }, async () => {
  const web3Client = getWeb3Client();
  const myProfileContract = getMyProfileContract(web3Client);

  const result = (await myProfileContract.methods.getPosts(0, 20).call()) as {
    0: string[];
    1: string;
  };

  return {
    list: result['0'],
    total: +result['1'],
  };
});
