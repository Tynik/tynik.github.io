import React from 'react';

import { useCurrentPost } from '~/hooks';
import { PostSkeleton } from './components';
import { ViewPostPageFit } from './ViewPostPageFit';

export const ViewPostPage = () => {
  const { post } = useCurrentPost();

  if (!post) {
    return <PostSkeleton />;
  }

  return <ViewPostPageFit post={post} />;
};
