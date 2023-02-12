import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid } from '@mui/material';

import { useCurrentPost } from '~/hooks';
import { useUser } from '~/providers';
import { PostSkeleton } from './components';
import { ViewPostPageFit } from './ViewPostPageFit';

export const ViewPostPage = () => {
  const navigate = useNavigate();

  const { post } = useCurrentPost();
  const { isAuthenticated } = useUser();

  if (!post) {
    return <PostSkeleton />;
  }

  const onEditPost = () => {
    navigate(`/post/${post.cid}/edit`);
  };

  return (
    <Grid spacing={2} container>
      {isAuthenticated && (
        <Grid xs={12} textAlign="right" item>
          <Button onClick={onEditPost}>Edit</Button>
        </Grid>
      )}

      <Grid xs={12} item>
        <ViewPostPageFit post={post} />
      </Grid>
    </Grid>
  );
};
