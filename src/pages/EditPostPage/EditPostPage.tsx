import React from 'react';

import { Alert, AlertTitle } from '@mui/material';
import { useRichCurrentPost } from '~/hooks';

import { EditPostPageFit } from './EditPostPageFit';
import { PostSkeleton } from '../components';

export const EditPostPage = () => {
  const { richPost, isRichPostLoadingError } = useRichCurrentPost();

  if (isRichPostLoadingError) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Loading post error
      </Alert>
    );
  }

  if (!richPost) {
    return <PostSkeleton />;
  }

  return <EditPostPageFit richPost={richPost} />;
};
