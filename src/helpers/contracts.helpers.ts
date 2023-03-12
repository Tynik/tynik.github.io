import Web3 from 'web3';

import type { AbiItem } from 'web3-utils';

import MyProfileContract from '~/smart-contracts/MyProfile.json';

export const getMyProfileContractAddress = () => {
  const myProfileContractAddress = process.env.MY_PROFILE_CONTRACT_ADDRESS;
  if (!myProfileContractAddress) {
    throw new Error('MY_PROFILE_CONTRACT_ADDRESS env variable is missed');
  }

  return myProfileContractAddress;
};

export const getMyProfileContract = (web3: Web3) => {
  return new web3.eth.Contract(MyProfileContract.abi as AbiItem[], getMyProfileContractAddress());
};

export const getMyProfileContractBalanceEth = async (web3: Web3) => {
  const balance = await web3.eth.getBalance(getMyProfileContractAddress());

  return web3.utils.fromWei(balance, 'ether');
};
