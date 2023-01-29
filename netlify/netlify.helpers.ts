import { Web3Storage } from 'web3.storage';
import { Telegraf } from 'telegraf';
import Web3 from 'web3';
import fs from 'graceful-fs';

import type { Response } from '@netlify/functions/dist/function/response';
import MyProfileContract from './smart-contracts/MyProfile.json';

export const getWeb3Client = () => new Web3(process.env.WEB3_PROVIDER || 'http://127.0.0.1:7545');

export const getWeb3StorageClient = () => {
  const token = process.env.WEB3_STORAGE_TOKEN;

  if (!token) {
    throw new Error('WEB3_STORAGE_TOKEN environment variable should be set');
  }

  return new Web3Storage({ token });
};

export const getTelegrafClient = () => {
  const token = process.env.BOT_TOKEN;

  if (!token) {
    throw new Error('BOT_TOKEN environment variable should be set');
  }

  return new Telegraf(token);
};

export const getMyProfileContract = (web3Client: Web3) => {
  return new web3Client.eth.Contract(
    MyProfileContract.abi,
    process.env.MY_PROFILE_CONTRACT_ADDRESS
  );
};

type AllowMethod = 'POST' | 'GET' | 'OPTIONS' | '*';

type CreateResponseOptions = {
  statusCode?: number;
  allowMethods?: AllowMethod[];
};

export const createResponse = (
  data: any,
  { statusCode = 200, allowMethods = ['*'] }: CreateResponseOptions = {}
): Response => {
  return {
    statusCode,
    body: JSON.stringify(data),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': allowMethods?.join(', '),
    },
  };
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
