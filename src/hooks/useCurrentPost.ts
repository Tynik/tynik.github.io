import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { getPostRequest } from '~/api';

export const useCurrentPost = () => {
  const { postCID } = useParams<{ postCID: string }>();

  const { data: post } = useQuery(['get-post', postCID], () => getPostRequest(postCID!), {
    refetchOnWindowFocus: false,
  });

  return {
    post,
  };
};
