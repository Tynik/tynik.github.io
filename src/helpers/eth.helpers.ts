import Web3 from 'web3';

export const requestEthAccounts = async () => {
  try {
    return await window.ethereum?.request<string[]>({ method: 'eth_requestAccounts' });
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (e.code === 4001) {
      // EIP-1193 userRejectedRequest error
      // If this happens, the user rejected the connection request.
      console.log('Please connect to MetaMask.');
    }
    throw e;
  }
};

export const getWeb3Client = () => new Web3(window.ethereum as never);

export const sentEthTransaction = async (from: string, to: string, value: string) => {
  if (!window.ethereum) {
    throw new Error('window.ethereum is undefined');
  }

  const web3 = getWeb3Client();

  await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [
      {
        from,
        to,
        value: web3.utils.toHex(web3.utils.toWei(value, 'ether')),
      },
    ],
  });
};
