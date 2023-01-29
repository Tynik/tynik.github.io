import React from 'react';
import { useQuery } from 'react-query';
import { Stack, Typography } from '@mui/material';

import { PostCard } from '~/components';
import { getPostsRequest } from '~/api';

export const MainPage = () => {
  const { data: posts } = useQuery(['get-posts'], getPostsRequest);

  return (
    <>
      <Typography variant="h4">Posts</Typography>

      <Stack mt={2} direction="row" sx={{ flexWrap: 'wrap', gap: 2 }}>
        {posts?.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </Stack>
    </>
  );
};
