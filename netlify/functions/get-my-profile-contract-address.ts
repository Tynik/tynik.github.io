import { createHandler } from '../netlify.helpers';

export const handler = createHandler(null, () => {
  return Promise.resolve({ status: 'ok', data: process.env.MY_PROFILE_CONTRACT_ADDRESS });
});
