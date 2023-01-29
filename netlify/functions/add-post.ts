import type { Handler } from '@netlify/functions';

import {
  getMyProfileContract,
  getWeb3Client,
  getWeb3StorageClient,
  Web3File,
} from '../netlify.helpers';

type Payload = {
  title: string;
  content: string;
  ethAccount: string;
};

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export const handler: Handler = async event => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      headers,
      statusCode: 200,
      body: JSON.stringify({ message: 'Successful preflight call.' }),
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 400,
      body: 'You are not using a http POST method for this endpoint.',
      headers: {
        Allow: 'POST',
      },
    };
  }

  const payload = JSON.parse(event.body) as Payload;

  try {
    const web3StorageClient = getWeb3StorageClient();

    const postWeb3File = new Web3File(
      'post.json',
      JSON.stringify({
        title: payload.title,
        content: payload.content,
      })
    );

    const postCID = await web3StorageClient.put([postWeb3File], { name: 'maliinyk-posts' });

    const web3Client = getWeb3Client();

    if (process.env.NODE_ENV !== 'development') {
      const signer = web3Client.eth.accounts.privateKeyToAccount(process.env.SIGNER_PRIVATE_KEY);
      web3Client.eth.accounts.wallet.add(signer);
    }

    const myProfileContract = getMyProfileContract(web3Client);

    const tx = await myProfileContract.methods.addPost(postCID);

    tx.send({ from: payload.ethAccount, gas: 1000000 });

    return {
      headers,
      statusCode: 200,
      body: JSON.stringify({ status: 'ok' }),
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
