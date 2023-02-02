import {
  createHandler,
  createResponse,
  getMyProfileContract,
  getWeb3Client,
} from '../netlify.helpers';

export const handler = createHandler(async event => {
  const web3Client = getWeb3Client();
  const myProfileContract = getMyProfileContract(web3Client);

  const tx = await myProfileContract.methods.getPosts();

  const postCIDs = (await tx.call()) as string[];

  return createResponse(
    { status: 'ok', data: postCIDs },
    {
      allowMethods: ['GET', 'OPTIONS'],
    }
  );
});
