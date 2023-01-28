import type { Handler } from '@netlify/functions';

import { getMyProfileContract, getWeb3Client, getWeb3StorageClient } from '../helpers';

type Web3File = {
  content: string;
};

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

export const handler: Handler = async event => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      headers,
      statusCode: 200,
      body: JSON.stringify({ message: 'Successful preflight call.' }),
    };
  }

  try {
    const web3Client = getWeb3Client();
    const myProfileContract = getMyProfileContract(web3Client);

    const tx = await myProfileContract.methods.getPosts();

    const postCIDs = (await tx.call()) as string[];

    const web3PostFiles: Web3File[] = [];

    const web3StorageClient = getWeb3StorageClient();

    await Promise.all(
      postCIDs.map(async postCID => {
        const list = await web3StorageClient.get(postCID);
        const files = await list.files();

        return Promise.all(
          files.map(async file => {
            const content = await file.text();

            web3PostFiles.push({
              content,
            });
          })
        );
      })
    );

    return {
      headers,
      statusCode: 200,
      body: JSON.stringify({ status: 'ok', data: web3PostFiles }),
    };
  } catch (e) {
    console.error(e);

    return {
      headers,
      statusCode: 500,
      body: JSON.stringify({ status: 'error' }),
    };
  }
};
