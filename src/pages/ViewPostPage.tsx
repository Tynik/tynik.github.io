import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Typography } from '@mui/material';

import { getPostRequest } from '~/api';

export const ViewPostPage = () => {
  const { postCID } = useParams<{ postCID: string }>();

  const { data: post } = useQuery(['get-post', postCID], () => getPostRequest(postCID!));

  return (
    <>
      <Typography variant="h4">{post?.title}</Typography>
      <Typography variant="body1">{post?.content}</Typography>
    </>
  );
};
