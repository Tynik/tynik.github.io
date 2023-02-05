import {
  createResponse,
  getMyProfileContract,
  getWeb3Client,
  web3WalletAddPrivateKey,
  createHandler,
  putWeb3PostFiles,
} from '../netlify.helpers';

type Payload = {
  title: string;
  subtitle: string;
  content: string;
  richContent: string;
  ethAccount: string;
};

export const handler = createHandler<Payload>(
  { allowMethods: ['POST', 'OPTIONS'] },
  async ({ payload }) => {
    if (!payload) {
      return createResponse('Payload is required', {
        statusCode: 400,
        allowMethods: ['POST', 'OPTIONS'],
      });
    }

    const postCreatedTime = new Date().getTime();
    const postCID = await putWeb3PostFiles({ ...payload, created: postCreatedTime });

    const web3Client = getWeb3Client();
    web3WalletAddPrivateKey(web3Client);

    const myProfileContract = getMyProfileContract(web3Client);

    return new Promise(resolve => {
      myProfileContract.methods
        .publishPost(postCID, postCreatedTime)
        .send({ from: payload.ethAccount, gas: 1000000 })
        .on('transactionHash', (transactionHash: string) => {
          resolve({
            transactionHash,
          });
        });
    });
  }
);
