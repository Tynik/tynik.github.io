import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Chip, Grid } from '@mui/material';
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
        <Grid xs={12} item>
          <Box display="flex" gap={2} justifyContent="space-between" alignItems="center">
            <Chip label={post.status} color={POST_STATUS_COLOR[post.status]} size="small" />

            <Button onClick={onEditPost} startIcon={<EditIcon />} variant="outlined">
              Edit
            </Button>
          </Box>
        </Grid>
      )}

      <Grid xs={12} item>
        <ViewPostPageFit post={post} />
      </Grid>
    </Grid>
  );
};
