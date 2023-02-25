import React from 'react';

import { useRichCurrentPost } from '~/hooks';

import { EditPostPageFit } from './EditPostPageFit';
import { PostSkeleton } from '../components';

export const EditPostPage = () => {
  const { richPost } = useRichCurrentPost();

  if (!richPost) {
    return <PostSkeleton />;
  }

  return <EditPostPageFit richPost={richPost} />;
};
