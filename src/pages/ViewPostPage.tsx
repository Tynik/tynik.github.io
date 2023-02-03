import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Skeleton, Typography } from '@mui/material';

import { getPostRequest } from '~/api';

export const ViewPostPage = () => {
  const { postCID } = useParams<{ postCID: string }>();

  const { data: post } = useQuery(['get-post', postCID], () => getPostRequest(postCID!));

  if (!post) {
    return (
      <>
        <Skeleton width="100%" height={50} />

        <Skeleton width="100%" height={300} />
      </>
    );
  }

  return (
    <>
      <Typography variant="h4">{post.title}</Typography>

      <Typography variant="body1" dangerouslySetInnerHTML={{ __html: post.content }} />
    </>
  );
};
