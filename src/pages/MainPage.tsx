import React, { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';

import type { Post } from '~/types';

import { PostCard } from '~/components';
import { getPostsRequest } from '~/api';

export const MainPage = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    getPostsRequest()
      .then(setPosts)
      .catch(() => {
        //
      });
  }, []);

  return (
    <>
      <Typography variant="h4">Posts</Typography>

      <Stack mt={2} direction="row" sx={{ flexWrap: 'wrap', gap: 2 }}>
        {posts?.map(({ title, content }, index) => (
          <PostCard key={index} title={title} content={content} />
        ))}
      </Stack>
    </>
  );
};
