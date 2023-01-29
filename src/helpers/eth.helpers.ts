export const requestEthAccounts = async (): Promise<string[]> => {
  try {
    return await window.ethereum.request({ method: 'eth_requestAccounts' });
  } catch (e) {
    if (e.code === 4001) {
      // EIP-1193 userRejectedRequest error
      // If this happens, the user rejected the connection request.
      console.log('Please connect to MetaMask.');
    }
    throw e;
  }
};
