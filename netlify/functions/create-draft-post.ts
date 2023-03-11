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
  keywords: string[];
  slug: string;
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

    const { slug, ethAccount, ...post } = payload;

    const postCreatedTime = new Date().getTime();

    const postCID = await putWeb3PostFiles({ ...post, created: postCreatedTime });

    const web3Client = getWeb3Client();
    web3WalletAddPrivateKey(web3Client);

    const myProfileContract = getMyProfileContract(web3Client);

    return {
      status: 'ok',
      data: await new Promise((resolve, reject) => {
        myProfileContract.methods
          .createDraftPost(postCID, slug, postCreatedTime)
          .send({ from: ethAccount, gas: 1000000 })
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
