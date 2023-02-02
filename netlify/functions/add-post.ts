import {
  createResponse,
  getMyProfileContract,
  getWeb3Client,
  getWeb3StorageClient,
  web3WalletAddPrivateKey,
  createWeb3PostFiles,
  createHandler,
} from '../netlify.helpers';

type Payload = {
  title: string;
  subtitle: string;
  content: string;
  ethAccount: string;
};

export const handler = createHandler(async event => {
  if (event.httpMethod !== 'POST') {
    return createResponse('You are not using a http POST method for this endpoint.', {
      statusCode: 400,
      allowMethods: ['POST', 'OPTIONS'],
    });
  }

  const payload = JSON.parse(event.body) as Payload;

  const web3StorageClient = getWeb3StorageClient();

  const postCID = await web3StorageClient.put(createWeb3PostFiles(payload), {
    name: 'maliinyk-posts',
  });

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
});
