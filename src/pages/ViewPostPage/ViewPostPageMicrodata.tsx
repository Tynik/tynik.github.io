import React from 'react';

import type { Post } from '~/types';

import { ArticleMicrodata } from '~/components';

type ViewPostPageMicrodataProps = {
  post: Post;
};

export const ViewPostPageMicrodata = ({ post }: ViewPostPageMicrodataProps) => {
  return (
    <ArticleMicrodata type="Tech" name={post.title} body={post.content} proficiencyLevel="Expert" />
  );
};
