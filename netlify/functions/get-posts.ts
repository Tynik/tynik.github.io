import type { Handler } from '@netlify/functions';

import { getMyProfileContract, getWeb3Client } from '../netlify.helpers';

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

    return {
      headers,
      statusCode: 200,
      body: JSON.stringify({ status: 'ok', data: postCIDs }),
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
