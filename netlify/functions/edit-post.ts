import {
  createResponse,
  getMyProfileContract,
  getWeb3Client,
  web3WalletAddPrivateKey,
  createHandler,
  putWeb3PostFiles,
} from '../netlify.helpers';

type Payload = {
  cid: string;
  title: string;
  subtitle: string;
  content: string;
  ethAccount: string;
};

export const handler = createHandler<Payload>(
  { allowMethods: ['UPDATE', 'OPTIONS'] },
  async ({ payload }) => {
    if (!payload) {
      return createResponse('Payload is required', {
        statusCode: 400,
        allowMethods: ['UPDATE', 'OPTIONS'],
      });
    }

    const web3Client = getWeb3Client();
    web3WalletAddPrivateKey(web3Client);

    const myProfileContract = getMyProfileContract(web3Client);

    const postCreatedTime = (await myProfileContract.methods.getPost(payload.cid).call()) as number;

    const postCID = await putWeb3PostFiles({ ...payload, created: postCreatedTime });

    myProfileContract.methods
      .editPost(payload.cid, postCID)
      .send({ from: payload.ethAccount, gas: 1000000 });

    return null;
  }
);
