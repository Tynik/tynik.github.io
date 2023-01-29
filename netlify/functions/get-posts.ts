import type { Handler } from '@netlify/functions';

import { createResponse, getMyProfileContract, getWeb3Client } from '../netlify.helpers';

export const handler: Handler = async event => {
  if (event.httpMethod === 'OPTIONS') {
    return createResponse({ message: 'Successful preflight call.' });
  }

  try {
    const web3Client = getWeb3Client();
    const myProfileContract = getMyProfileContract(web3Client);

    const tx = await myProfileContract.methods.getPosts();

    const postCIDs = (await tx.call()) as string[];

    return createResponse(
      { status: 'ok', data: postCIDs },
      {
        allowMethods: ['GET', 'OPTIONS'],
      }
    );
  } catch (e) {
    console.error(e);

    return createResponse(
      { status: 'error' },
      {
        statusCode: 500,
        allowMethods: ['GET', 'OPTIONS'],
      }
    );
  }
};
