import type { ContractPost } from '../types';

import {
  getMyProfileContract,
  getWeb3Client,
  web3WalletAddPrivateKey,
  createHandler,
  putWeb3PostFiles,
} from '../netlify.helpers';

type UpdatePostPayload = {
  cid: string;
  title: string;
  subtitle: string;
  keywords: string[];
  content: string;
  richContent: string;
  ethAccount: string;
};

export const handler = createHandler<UpdatePostPayload>(
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

    const web3Client = getWeb3Client();
    web3WalletAddPrivateKey(web3Client);

    const myProfileContract = getMyProfileContract(web3Client);

    const { cid, ethAccount, ...postPayload } = payload;

    const post = (await myProfileContract.methods.getPost(cid).call()) as ContractPost;

    const postCID = await putWeb3PostFiles({ ...postPayload, created: +post.created });

    return {
      status: 'ok',
      data: await new Promise((resolve, reject) => {
        myProfileContract.methods
          .updatePost(payload.cid, postCID)
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
