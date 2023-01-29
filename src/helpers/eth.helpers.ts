export const requestEthAccounts = async () => {
  if (!window.ethereum) {
    throw new Error();
  }

  try {
    return await window.ethereum.request<string[]>({ method: 'eth_requestAccounts' });
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
