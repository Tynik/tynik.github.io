import { createHandler, getWeb3Client } from '../netlify.helpers';

export const handler = createHandler(null, async () => {
  const web3Client = getWeb3Client();

  const balance = await web3Client.eth.getBalance(process.env.MY_PROFILE_CONTRACT_ADDRESS);

  return {
    status: 'ok',
    data: web3Client.utils.fromWei(balance, 'ether'),
  };
});
