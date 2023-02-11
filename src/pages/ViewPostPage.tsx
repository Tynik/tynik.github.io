import React from 'react';
import { Button, Grid } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useCurrentPost } from '~/hooks';
import { PostSkeleton } from './components';
import { ViewPostPageFit } from './ViewPostPageFit';

export const ViewPostPage = () => {
  const navigate = useNavigate();

  const { post } = useCurrentPost();

  if (!post) {
    return <PostSkeleton />;
  }

  const onEditPost = () => {
    navigate(`/post/${post.cid}/edit`);
  };

  return (
    <Grid spacing={2} container>
      <Grid xs={12} textAlign="right" item>
        <Button onClick={onEditPost}>Edit</Button>
      </Grid>

      <Grid xs={12} item>
        <ViewPostPageFit post={post} />
      </Grid>
    </Grid>
  );
};
