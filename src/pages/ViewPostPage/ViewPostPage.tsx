import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Alert, AlertTitle, Box, Button, Chip, Grid, Stack } from '@mui/material';
import { Edit as EditIcon, Send as SendIcon } from '@mui/icons-material';

import { getWeb3Client, myProfileContractPublishPost } from '~/helpers';
import { POST_STATUS_COLOR } from '~/constants/post.constants';
import { useCurrentPost } from '~/hooks';
import { useUser } from '~/providers';

import { PostSkeleton } from '../components';
import { ViewPostPageFit } from './ViewPostPageFit';
import { ViewPostPageMicrodata } from './ViewPostPageMicrodata';
import { ViewPostDonateButton } from './ViewPostDonateButton';

export const ViewPostPage = () => {
  const navigate = useNavigate();
  const user = useUser();

  const { post, isPostLoadingError } = useCurrentPost();
  const { isAuthenticated } = useUser();

  if (isPostLoadingError) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Loading post error
      </Alert>
    );
  }

  if (!post) {
    return <PostSkeleton />;
  }

  const onEditPost = () => {
    navigate(`/post/${post.slug}/edit`);
  };

  const publishPostHandler = async () => {
    if (!user.ethAccount) {
      return;
    }

    try {
      await myProfileContractPublishPost(getWeb3Client(), user.ethAccount, post.cid);

      toast('Successfully published', { type: 'success' });

      navigate('/');
    } catch (e) {
      toast('Something went wrong', { type: 'error' });
    }
  };

  return (
    <Grid spacing={2} container>
      <ViewPostPageMicrodata post={post} />

      {isAuthenticated && (
        <Grid xs={12} item>
          <Box display="flex" gap={2} justifyContent="space-between" alignItems="center">
            <Chip label={post.status} color={POST_STATUS_COLOR[post.status]} size="small" />

            <Stack direction="row" spacing={2}>
              <Button onClick={onEditPost} startIcon={<EditIcon />} variant="outlined">
                Edit
              </Button>

              {post.status !== 'PUBLISHED' && (
                <Button
                  onClick={publishPostHandler}
                  startIcon={<SendIcon />}
                  variant="outlined"
                  color="success"
                >
                  Publish
                </Button>
              )}
            </Stack>
          </Box>
        </Grid>
      )}

      <Grid xs={12} item>
        <ViewPostPageFit post={post} />
      </Grid>

      <Grid xs={12} textAlign="center" item>
        <ViewPostDonateButton />
      </Grid>
    </Grid>
  );
};
