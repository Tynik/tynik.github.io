import Web3 from 'web3';

import type { AbiItem } from 'web3-utils';

import MyProfileContract from '~/smart-contracts/MyProfile.json';

export const getMyProfileContract = (web3: Web3) => {
  const myProfileContractAddress = process.env.MY_PROFILE_CONTRACT_ADDRESS;

  if (!myProfileContractAddress) {
    throw new Error('MY_PROFILE_CONTRACT_ADDRESS env variable is missed');
  }

  return new web3.eth.Contract(MyProfileContract.abi as AbiItem[], myProfileContractAddress);
};
