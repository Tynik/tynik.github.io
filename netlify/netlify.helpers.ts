import { Web3Storage } from 'web3.storage';
import { Telegraf } from 'telegraf';
import Web3 from 'web3';
import fs from 'graceful-fs';

import type { Handler, HandlerResponse, HandlerEvent, HandlerContext } from '@netlify/functions';

import MyProfileContract from './smart-contracts/MyProfile.json';

type Post = {
  title: string;
  subtitle: string;
  content: string;
};

class Web3File {
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

const createWeb3File = (name: string, data: any) => {
  return new Web3File(name, JSON.stringify(data));
};

export const createWeb3PostFiles = (post: Post) => {
  const postWeb3File = createWeb3File('post.json', {
    title: post.title,
    subtitle: post.subtitle,
    created: new Date().getTime(),
  });

  // full post content should be stored in separate file
  const fullPostWeb3File = createWeb3File('full-post.json', {
    content: post.content,
  });

  return [postWeb3File, fullPostWeb3File];
};

export const getWeb3Client = () => new Web3(process.env.WEB3_PROVIDER || 'http://127.0.0.1:7545');

export const web3WalletAddPrivateKey = (
  web3Client: Web3,
  privateKey = process.env.SIGNER_PRIVATE_KEY
) => {
  if (process.env.NODE_ENV !== 'development') {
    if (!privateKey) {
      throw new Error('SIGNER_PRIVATE_KEY environment variable should be set');
    }

    web3Client.eth.accounts.wallet.add(web3Client.eth.accounts.privateKeyToAccount(privateKey));
  }
};

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

type AllowMethod = 'POST' | 'GET' | 'OPTIONS' | 'PUT' | '*';

type CreateResponseOptions = {
  statusCode?: number;
  allowMethods?: AllowMethod[];
};

export const createResponse = (
  data: any,
  { statusCode = 200, allowMethods = ['*'] }: CreateResponseOptions = {}
): HandlerResponse => {
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

export const createHandler = (
  func: (event: HandlerEvent, context: HandlerContext) => Promise<HandlerResponse>
): Handler => {
  return async (event, context) => {
    if (event.httpMethod === 'OPTIONS') {
      return createResponse({ message: 'Successful preflight call.' });
    }

    try {
      return await func(event, context);
    } catch (e) {
      console.error(e);

      return createResponse(
        { status: 'error' },
        {
          statusCode: 500,
          allowMethods: ['POST', 'OPTIONS'],
        }
      );
    }
  };
};
