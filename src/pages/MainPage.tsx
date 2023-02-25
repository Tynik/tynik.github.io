import React from 'react';
import { useQuery } from 'react-query';
import { Grid, Typography } from '@mui/material';

import { PersonMicrodata, PostCard, WebSiteMicrodata } from '~/components';
import { getPublishedPostsRequest } from '~/api';
import { MY_CURRENT_POSITION, MY_EMAIL, MY_FULL_NAME, MY_PHOTO } from '~/constants';

export const MainPage = () => {
  const { data: publishedPosts } = useQuery(['get-published-posts'], getPublishedPostsRequest);

  return (
    <Grid spacing={2} container>
      <WebSiteMicrodata name="Mykhailo Aliinyk Profile" url="https://maliinyk.info">
        <PersonMicrodata
          name={MY_FULL_NAME}
          email={MY_EMAIL}
          jobTitle={MY_CURRENT_POSITION}
          image={MY_PHOTO}
          gender="Male"
          itemProp="creator"
        />
      </WebSiteMicrodata>

      <Grid xs={12} item>
        <Typography variant="h4">Posts</Typography>
      </Grid>

      {publishedPosts?.list.map(postInfo => (
        <PostCard key={postInfo.cid} postInfo={postInfo} />
      ))}
    </Grid>
  );
};
