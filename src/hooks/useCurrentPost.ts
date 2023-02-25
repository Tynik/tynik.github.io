import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { getPostRequest } from '~/api';

export const useCurrentPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post } = useQuery(['get-post', slug], () => getPostRequest(slug!));

  return {
    post,
  };
};
