import { parse } from 'parse-multipart-data';

import { createHandler, getWeb3StorageClient, Web3File } from '../netlify.helpers';

type UploadPostFileData = {
  file: {
    filename: string;
    type: string;
    name: string;
    data: Buffer;
  };
  ethAccount: {
    name: string;
    data: Buffer;
  };
};

export const handler = createHandler({ allowMethods: ['POST', 'OPTIONS'] }, async ({ event }) => {
  const contentType = event.headers['content-type'];
  if (!contentType) {
    return {
      status: 'error',
      data: {
        message: 'Content type is not present in headers',
      },
    };
  }

  const boundary = contentType.split('=').pop();
  if (!boundary) {
    return {
      status: 'error',
      data: {
        message: 'Boundary cannot be identified',
      },
    };
  }

  if (!event.body) {
    return {
      status: 'error',
      data: {
        message: 'Body is empty',
      },
    };
  }

  const parts = parse(Buffer.from(event.body, 'base64'), boundary);

  const data = parts.reduce((result, part) => {
    if (part.name) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      result[part.name] = part;
    }

    return result;
  }, {} as UploadPostFileData);

  const web3StorageClient = getWeb3StorageClient();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const fileCID = await web3StorageClient.put([new Web3File(data.file.filename, data.file.data)], {
    name: 'maliinyk-posts',
  });

  return {
    status: 'ok',
    data: `https://${fileCID}.ipfs.w3s.link/${data.file.filename}`,
  };
});
