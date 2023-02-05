import { Web3Storage } from 'web3.storage';
import { Telegraf } from 'telegraf';
import Web3 from 'web3';
import fs from 'graceful-fs';

import type { Handler, HandlerResponse, HandlerEvent, HandlerContext } from '@netlify/functions';
import type { Post } from './netlify.types';

import MyProfileContract from './smart-contracts/MyProfile.json';

class Web3File {
  name: string;

  content: string;

  constructor(name: string, content: string) {
    this.name = name;
    this.content = content;
  }

  stream(): fs.ReadStream {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return this.content;
  }
}

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

const createWeb3File = (name: string, data: any) => {
  return new Web3File(name, JSON.stringify(data));
};

export const createWeb3PostFiles = (post: Post) => {
  const postInfoWeb3File = createWeb3File('post.json', {
    title: post.title,
    subtitle: post.subtitle,
    created: post.created,
  });

  // full post content should be stored in separate file
  const postContentWeb3File = createWeb3File('post-content.json', {
    content: post.content,
  });

  const richPostContentWeb3File = createWeb3File('post-rich-content.json', {
    content: post.richContent,
  });

  return [postInfoWeb3File, postContentWeb3File, richPostContentWeb3File];
};

export const putWeb3PostFiles = (post: Post) => {
  const web3PostFiles = createWeb3PostFiles(post);

  const web3StorageClient = getWeb3StorageClient();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return web3StorageClient.put(web3PostFiles, {
    name: 'maliinyk-posts',
  });
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

type HTTPMethod = 'POST' | 'GET' | 'OPTIONS' | 'PUT' | 'UPDATE' | 'DELETE';

type CreateResponseOptions = {
  statusCode?: number;
  allowMethods?: HTTPMethod[] | null;
};

export const createResponse = (
  data: any,
  { statusCode = 200, allowMethods = null }: CreateResponseOptions = {}
): HandlerResponse => {
  return {
    statusCode,
    body: JSON.stringify(data),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': allowMethods?.join(', ') ?? '*',
    },
  };
};

type CreateHandlerFunctionOptions<Payload = unknown> = {
  event: HandlerEvent;
  context: HandlerContext;
  payload: Payload | null;
};

type CreateHandlerOptions = {
  allowMethods?: HTTPMethod[];
} | null;

type CreateHandlerFunction<Payload = unknown> = (
  options: CreateHandlerFunctionOptions<Payload>
) => Promise<object | null>;

export const createHandler = <Payload = unknown>(
  options: CreateHandlerOptions,
  func: CreateHandlerFunction<Payload>
): Handler => {
  return async (event, context) => {
    if (event.httpMethod === 'OPTIONS') {
      return createResponse(
        { message: 'Successful preflight call.' },
        { allowMethods: options?.allowMethods }
      );
    }

    if (options?.allowMethods && !options.allowMethods.includes(event.httpMethod as HTTPMethod)) {
      return createResponse(`You cannot use HTTP method "${event.httpMethod}" for this endpoint`, {
        statusCode: 400,
        allowMethods: options.allowMethods,
      });
    }

    try {
      const payload = event.body ? (JSON.parse(event.body) as Payload) : null;

      const result = await func({ event, context, payload });

      return createResponse(
        { status: 'ok', data: result ?? null },
        {
          allowMethods: options?.allowMethods,
        }
      );
    } catch (e) {
      console.error(e);

      return createResponse(
        { status: 'error' },
        {
          statusCode: 500,
          allowMethods: options?.allowMethods,
        }
      );
    }
  };
};
