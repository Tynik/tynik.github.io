import { Web3Storage } from 'web3.storage';
import Web3 from 'web3';
import fs from 'graceful-fs';

import MyProfileContract from './smart-contracts/MyProfile.json';

export const getWeb3Client = () => new Web3(process.env.WEB3_PROVIDER || 'http://127.0.0.1:7545');

export const getWeb3StorageClient = () =>
  new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN });

export const getMyProfileContract = (web3Client: Web3) => {
  return new web3Client.eth.Contract(
    MyProfileContract.abi,
    process.env.MY_PROFILE_CONTRACT_ADDRESS
  );
};

export class Web3File {
  name: string;

  content: string;

  constructor(name: string, content: string) {
    this.name = name;
    this.content = content;
  }

  stream(): fs.ReadStream {
    return this.content;
  }
}
