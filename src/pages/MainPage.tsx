import React from 'react';
import { useQuery } from 'react-query';
import { Grid, Typography } from '@mui/material';

import { PostCard } from '~/components';
import { getPostsRequest } from '~/api';

export const MainPage = () => {
  const { data: posts } = useQuery(['get-posts'], getPostsRequest);

  return (
    <>
      <Typography variant="h4">Posts</Typography>

      <Grid mt={1} spacing={2} container>
        {posts?.list.map(postCID => (
          <PostCard key={postCID} postCID={postCID} />
        ))}
      </Grid>
    </>
  );
};
