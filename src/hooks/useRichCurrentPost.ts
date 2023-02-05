import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { getRichPostRequest } from '~/api';

export const useRichCurrentPost = () => {
  const { postCID } = useParams<{ postCID: string }>();

  const { data: post } = useQuery(['get-rich-post', postCID], () => getRichPostRequest(postCID!), {
    refetchOnWindowFocus: false,
  });

  return {
    post,
  };
};
