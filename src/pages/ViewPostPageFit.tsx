import React from 'react';
import { Grid, Typography } from '@mui/material';

import type { Post } from '~/types';

type ViewPostPageFitProps = {
  post: Pick<Post, 'title' | 'subtitle' | 'content'>;
};

export const ViewPostPageFit = ({ post }: ViewPostPageFitProps) => {
  return (
    <Grid spacing={2} container>
      <Grid xs={12} item>
        <Typography variant="h2" fontWeight="bold">
          {post.title}
        </Typography>
      </Grid>

      <Grid xs={12} item>
        <Typography variant="h4">{post.subtitle}</Typography>
      </Grid>

      <Grid xs={12} item>
        <Typography
          variant="body1"
          fontSize={18}
          lineHeight={1.6}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </Grid>
    </Grid>
  );
};
