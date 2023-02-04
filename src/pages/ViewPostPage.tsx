import React from 'react';
import { Typography } from '@mui/material';

import { useCurrentPost } from '~/hooks';
import { PostSkeleton } from './components';

export const ViewPostPage = () => {
  const { post } = useCurrentPost();

  if (!post) {
    return <PostSkeleton />;
  }

  return (
    <>
      <Typography variant="h2" fontWeight="bold">
        {post.title}
      </Typography>

      <Typography mt={2} variant="h4">
        {post.subtitle}
      </Typography>

      <Typography mt={2} variant="body1" dangerouslySetInnerHTML={{ __html: post.content }} />
    </>
  );
};
