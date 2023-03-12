import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

import { getMyProfileContractBalanceEth, getWeb3Client, noop } from '~/helpers';

export const MyProfileContractBalance = () => {
  const [balance, setBalance] = useState('');

  useEffect(() => {
    getMyProfileContractBalanceEth(getWeb3Client()).then(setBalance).catch(noop);
  }, []);

  return <Typography variant="h6">{balance ?? '-'} ETH</Typography>;
};
