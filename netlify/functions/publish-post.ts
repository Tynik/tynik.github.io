import {
  getMyProfileContract,
  getWeb3Client,
  web3WalletAddPrivateKey,
  createHandler,
} from '../netlify.helpers';

type Payload = {
  cid: string;
  ethAccount: string;
};

export const handler = createHandler<Payload>(
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

    return {
      status: 'ok',
      data: await new Promise((resolve, reject) => {
        myProfileContract.methods
          .publishPost(payload.cid)
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
