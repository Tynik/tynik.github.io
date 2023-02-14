import React from 'react';
import { useQuery } from 'react-query';
import { Grid, Typography } from '@mui/material';

import { PostCard } from '~/components';
import { getDraftPostsRequest } from '~/api';

export const DraftPostsPage = () => {
  const { data: draftPosts } = useQuery(['get-draft-posts'], getDraftPostsRequest);

  return (
    <Grid spacing={2} container>
      <Grid xs={12} item>
        <Typography variant="h4">Drafts</Typography>
      </Grid>

      {draftPosts?.list.map(postCID => (
        <PostCard key={postCID} postCID={postCID} />
      ))}
    </Grid>
  );
};
