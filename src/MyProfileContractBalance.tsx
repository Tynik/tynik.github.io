import React from 'react';
import { useQuery } from 'react-query';
import { Typography } from '@mui/material';

import { getMyProfileContractBalance } from '~/api';

export const MyProfileContractBalance = () => {
  const { data: balance } = useQuery(
    ['get-my-profile-contract-balance'],
    getMyProfileContractBalance
  );

  return <Typography variant="h6">{balance ?? '-'} ETH</Typography>;
};
