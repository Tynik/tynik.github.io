import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Chip, Grid } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

import { POST_STATUS_COLOR } from '~/constants/post.constants';
import { useCurrentPost } from '~/hooks';
import { useUser } from '~/providers';

import { PostSkeleton } from '../components';
import { ViewPostPageFit } from './ViewPostPageFit';
import { ViewPostPageMicrodata } from './ViewPostPageMicrodata';

export const ViewPostPage = () => {
  const navigate = useNavigate();

  const { post } = useCurrentPost();
  const { isAuthenticated } = useUser();

  if (!post) {
    return <PostSkeleton />;
  }

  const onEditPost = () => {
    navigate(`/post/${post.slug}/edit`);
  };

  return (
    <Grid spacing={2} container>
      <ViewPostPageMicrodata post={post} />

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
          <Button onClick={onEditPost} startIcon={<EditIcon />} variant="outlined">
            Edit
          </Button>
        </Grid>
      )}
    </Grid>
  );
};
