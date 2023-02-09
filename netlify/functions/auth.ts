import { createHandler, getMyProfileContract, getWeb3Client } from '../netlify.helpers';

export const handler = createHandler(null, async ({ event }) => {
  const { ethAccount } = event.queryStringParameters as { ethAccount?: string };

  if (ethAccount) {
    const web3Client = getWeb3Client();
    const myProfileContract = getMyProfileContract(web3Client);

    const ownerAddress = (await myProfileContract.methods.owner().call()) as string;

    if (ownerAddress.toLowerCase() === ethAccount.toLowerCase()) {
      return { status: 'ok' };
    }
  }

  return { status: 'error' };
});
