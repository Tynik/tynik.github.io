import React from 'react';

import type { Post } from '~/types';

type ViewPostPageMicrodataProps = {
  post: Post;
};

export const ViewPostPageMicrodata = ({ post }: ViewPostPageMicrodataProps) => {
  return (
    <div itemType="https://schema.org/TechArticle" itemScope>
      <meta itemProp="name" content={post.title} />
      <meta itemProp="articleBody" content={post.content} />
      <meta itemProp="proficiencyLevel" content="Expert" />
    </div>
  );
};
