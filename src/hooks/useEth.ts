import { useEffect, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';

import { requestEthAccounts } from '~/helpers';

export const useEth = () => {
  const [ethAccount, setEthAccount] = useState<string | null>(null);

  useEffect(() => {
    detectEthereumProvider({ mustBeMetaMask: true })
      .then(provider => {
        if (!provider) {
          throw new Error('Please install MetaMask!');
        }

        return requestEthAccounts().then(accounts => {
          if (!accounts.length) {
            console.log('Please connect to MetaMask.');
          }

          setEthAccount(accounts[0]);
        });
      })
      .catch(e => {
        console.error(e);
      });
  }, []);

  return { ethAccount };
};
