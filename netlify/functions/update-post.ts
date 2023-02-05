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

    const web3Client = getWeb3Client();
    web3WalletAddPrivateKey(web3Client);

    const myProfileContract = getMyProfileContract(web3Client);

    const postInfo = (await myProfileContract.methods.getPost(payload.cid).call()) as {
      created: string;
      index: string;
    };

    const postCID = await putWeb3PostFiles({ ...payload, created: +postInfo.created });

    return new Promise(resolve => {
      myProfileContract.methods
        .updatePost(payload.cid, postCID)
        .send({ from: payload.ethAccount, gas: 1000000 })
        .on('transactionHash', (transactionHash: string) => {
          resolve({
            transactionHash,
          });
        });
    });
  }
);
