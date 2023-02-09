import React from 'react';
import { css, Grid, styled, Typography } from '@mui/material';

import type { Post } from '~/types';
import { RichEditorCodeStyles } from '~/components/RichEditor/RichEditor.styled';

const ContentStyled = styled('div')(
  ({ theme }) => css`
    ${RichEditorCodeStyles(theme)}
  `
);

type ViewPostPageFitProps = {
  post: Pick<Post, 'title' | 'subtitle' | 'content'>;
};

export const ViewPostPageFit = ({ post }: ViewPostPageFitProps) => {
  return (
    <Grid spacing={2} container>
      <Grid xs={12} item>
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {post.title}
        </Typography>
      </Grid>

      <Grid xs={12} item>
        <Typography
          variant="h4"
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {post.subtitle}
        </Typography>
      </Grid>

      <Grid xs={12} item>
        <ContentStyled dangerouslySetInnerHTML={{ __html: post.content }} />
      </Grid>
    </Grid>
  );
};
