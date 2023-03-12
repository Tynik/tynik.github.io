import { createHandler, putWeb3PostFiles } from '../netlify.helpers';

type CreateDraftPostPayload = {
  title: string;
  subtitle: string;
  keywords: string[];
  content: string;
  richContent: string;
  created: number;
};

export const handler = createHandler<CreateDraftPostPayload>(
  { allowMethods: ['POST', 'OPTIONS'] },
  async ({ payload }) => {
    if (!payload) {
      return {
        status: 'error',
        data: {
          message: 'Payload is required',
        },
      };
    }

    const postCID = await putWeb3PostFiles(payload);

    return {
      status: 'ok',
      data: postCID,
    };
  }
);
