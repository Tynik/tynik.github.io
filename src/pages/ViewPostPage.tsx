import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Chip, Grid } from '@mui/material';

import type { ChipProps } from '@mui/material';
import type { PostStatus } from '~/types';

import { useCurrentPost } from '~/hooks';
import { useUser } from '~/providers';
import { PostSkeleton } from './components';
import { ViewPostPageFit } from './ViewPostPageFit';

const POST_STATUS_COLOR: Record<PostStatus, ChipProps['color']> = {
  DRAFT: 'default',
  PUBLISHED: 'success',
  ARCHIVED: 'warning',
};

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
          <Chip label={post.status} color={POST_STATUS_COLOR[post.status]} size="small" />
        </Grid>
      )}

      <Grid xs={12} item>
        <ViewPostPageFit post={post} />
      </Grid>

      {isAuthenticated && (
        <Grid xs={12} textAlign="right" item>
          <Button onClick={onEditPost}>Edit</Button>
        </Grid>
      )}
    </Grid>
  );
};
