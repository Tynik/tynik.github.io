import type { Handler } from '@netlify/functions';

import { createResponse, getMyProfileContract, getWeb3Client } from '../netlify.helpers';

export const handler: Handler = async event => {
  if (event.httpMethod === 'OPTIONS') {
    return createResponse({ message: 'Successful preflight call.' });
  }

  const { ethAccount } = event.queryStringParameters as { ethAccount?: string };

  try {
    if (ethAccount) {
      const web3Client = getWeb3Client();
      const myProfileContract = getMyProfileContract(web3Client);

      const tx = await myProfileContract.methods.owner();

      const ownerAddress = (await tx.call()) as string;

      if (ownerAddress.toLowerCase() === ethAccount.toLowerCase()) {
        return createResponse(
          { status: 'ok' },
          {
            allowMethods: ['GET', 'OPTIONS'],
          }
        );
      }
    }

    return createResponse(
      { status: 'error' },
      {
        statusCode: 403,
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
