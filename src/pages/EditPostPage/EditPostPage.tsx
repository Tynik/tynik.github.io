import React from 'react';

import { useRichCurrentPost } from '~/hooks';

import { EditPostPageFit } from './EditPostPageFit';
import { PostSkeleton } from '../components';

export const EditPostPage = () => {
  const { post } = useRichCurrentPost();

  if (!post) {
    return <PostSkeleton />;
  }

  return <EditPostPageFit post={post} />;
};
