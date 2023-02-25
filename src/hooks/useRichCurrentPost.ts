import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { getRichPostRequest } from '~/api';

export const useRichCurrentPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: richPost } = useQuery(['get-rich-post', slug], () => getRichPostRequest(slug!));

  return {
    richPost,
  };
};
