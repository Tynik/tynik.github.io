import Web3 from 'web3';

import type { AbiItem } from 'web3-utils';
import type { PostCID } from '~/types';

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

export const getMyProfileContractETHBalance = async (web3: Web3) => {
  const balance = await web3.eth.getBalance(getMyProfileContractAddress());

  return web3.utils.fromWei(balance, 'ether');
};

type MyProfileContractCreateDraftPostOptions = {
  cid: PostCID;
  slug: string;
  created: number;
};

export const myProfileContractCreateDraftPost = (
  web3: Web3,
  ethAccount: string,
  { cid, slug, created }: MyProfileContractCreateDraftPostOptions
) => {
  const myProfileContract = getMyProfileContract(web3);

  return myProfileContract.methods
    .createDraftPost(cid, slug, created)
    .send({ from: ethAccount, gas: 1000000 });
};

type MyProfileContractUpdatePostOptions = {
  oldCID: PostCID;
  newCID: PostCID;
};

export const myProfileContractUpdatePost = (
  web3: Web3,
  ethAccount: string,
  { oldCID, newCID }: MyProfileContractUpdatePostOptions
) => {
  const myProfileContract = getMyProfileContract(web3);

  return myProfileContract.methods
    .updatePost(oldCID, newCID)
    .send({ from: ethAccount, gas: 1000000 });
};

type MyProfileContractRestorePostOptions = {
  cid: PostCID;
  slug: string;
  created: number;
};

export const myProfileContractRestorePost = (
  web3: Web3,
  ethAccount: string,
  { cid, slug, created }: MyProfileContractRestorePostOptions
) => {
  const myProfileContract = getMyProfileContract(web3);

  return myProfileContract.methods
    .createDraftPost(cid, slug, created)
    .send({ from: ethAccount, gas: 1000000 });
};

export const myProfileContractPublishPost = (web3: Web3, ethAccount: string, cid: PostCID) => {
  const myProfileContract = getMyProfileContract(web3);

  return myProfileContract.methods.publishPost(cid).send({ from: ethAccount, gas: 1000000 });
};
