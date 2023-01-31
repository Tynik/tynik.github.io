import type { Handler } from '@netlify/functions';

import {
  createResponse,
  getMyProfileContract,
  getWeb3Client,
  getWeb3StorageClient,
  web3WalletAddPrivateKey,
  Web3File,
} from '../netlify.helpers';

type Payload = {
  title: string;
  subtitle: string;
  content: string;
  ethAccount: string;
};

export const handler: Handler = async event => {
  if (event.httpMethod === 'OPTIONS') {
    return createResponse({ message: 'Successful preflight call.' });
  }

  if (event.httpMethod !== 'POST') {
    return createResponse('You are not using a http POST method for this endpoint.', {
      statusCode: 400,
      allowMethods: ['POST', 'OPTIONS'],
    });
  }

  const payload = JSON.parse(event.body) as Payload;

  try {
    const web3StorageClient = getWeb3StorageClient();

    const postWeb3File = new Web3File(
      'post.json',
      JSON.stringify({
        title: payload.title,
        content: payload.content,
        subtitle: payload.subtitle,
        // read created date from post
        created: new Date().getTime(),
        updated: new Date().getTime(),
      })
    );

    const postCID = await web3StorageClient.put([postWeb3File], { name: 'maliinyk-posts' });

    const web3Client = getWeb3Client();
    web3WalletAddPrivateKey(web3Client);

    const myProfileContract = getMyProfileContract(web3Client);

    const tx = await myProfileContract.methods.addPost(postCID);

    tx.send({ from: payload.ethAccount, gas: 1000000 });

    return createResponse(
      { status: 'ok' },
      {
        allowMethods: ['POST', 'OPTIONS'],
      }
    );
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
