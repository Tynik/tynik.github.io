import {
  getMyProfileContract,
  getWeb3Client,
  web3WalletAddPrivateKey,
  createHandler,
  putWeb3PostFiles,
} from '../netlify.helpers';

type CreateDraftPostPayload = {
  title: string;
  subtitle: string;
  content: string;
  richContent: string;
  ethAccount: string;
};

export const handler = createHandler<CreateDraftPostPayload>(
  { allowMethods: ['POST', 'OPTIONS'] },
  async ({ payload }) => {
    if (!payload) {
      return {
        status: 'error',
        data: {
          message: 'Payload is required',
        },
      };
    }

    const postCreatedTime = new Date().getTime();
    const postCID = await putWeb3PostFiles({ ...payload, created: postCreatedTime });

    const web3Client = getWeb3Client();
    web3WalletAddPrivateKey(web3Client);

    const myProfileContract = getMyProfileContract(web3Client);

    return {
      status: 'ok',
      data: await new Promise((resolve, reject) => {
        myProfileContract.methods
          .createDraftPost(postCID, postCreatedTime)
          .send({ from: payload.ethAccount, gas: 1000000 })
          .on('transactionHash', (transactionHash: string) => {
            resolve({
              transactionHash,
            });
          })
          .on('error', error => {
            reject(error);
          });
      }),
    };
  }
);
