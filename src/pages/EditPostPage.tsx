import React from 'react';

import { useCurrentPost } from '~/hooks';
import { EditPostPageFit } from './EditPostPageFit';
import { PostSkeleton } from './components';

export const EditPostPage = () => {
  const { post } = useCurrentPost();

  if (!post) {
    return <PostSkeleton />;
  }

  return <EditPostPageFit post={post} />;
};
