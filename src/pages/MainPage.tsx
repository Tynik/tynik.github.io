import React from 'react';
import { useQuery } from 'react-query';
import { Grid, Typography } from '@mui/material';

import { PostCard } from '~/components';
import { getDraftPostsRequest, getPublishedPostsRequest } from '~/api';
import { useUser } from '~/providers';

export const MainPage = () => {
  const { isAuthenticated } = useUser();

  const { data: publishedPosts } = useQuery(['get-published-posts'], getPublishedPostsRequest);

  const { data: draftPosts } = useQuery(['get-draft-posts'], getDraftPostsRequest, {
    enabled: isAuthenticated,
  });

  return (
    <Grid spacing={2} container>
      <Grid xs={12} item>
        <Typography variant="h4">Posts</Typography>
      </Grid>

      {publishedPosts?.list.map(postCID => (
        <PostCard key={postCID} postCID={postCID} />
      ))}

      {isAuthenticated && (
        <>
          <Grid xs={12} item>
            <Typography variant="h4">Drafts</Typography>
          </Grid>

          {draftPosts?.list.map(postCID => (
            <PostCard key={postCID} postCID={postCID} />
          ))}
        </>
      )}
    </Grid>
  );
};
