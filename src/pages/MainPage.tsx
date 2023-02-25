import React from 'react';
import { useQuery } from 'react-query';
import { Grid, Typography } from '@mui/material';

import { PostCard } from '~/components';
import { getPublishedPostsRequest } from '~/api';

export const MainPage = () => {
  const { data: publishedPosts } = useQuery(['get-published-posts'], getPublishedPostsRequest);

  return (
    <Grid spacing={2} container>
      <Grid xs={12} item>
        <Typography variant="h4">Posts</Typography>
      </Grid>

      {publishedPosts?.list.map(postInfo => (
        <PostCard key={postInfo.cid} postInfo={postInfo} />
      ))}
    </Grid>
  );
};
