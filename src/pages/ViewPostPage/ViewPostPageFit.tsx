import React, { useEffect } from 'react';
import { css, Divider, Grid, styled, Typography } from '@mui/material';

import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github-dark-dimmed.css';

import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
import bash from 'highlight.js/lib/languages/bash';

import type { Post } from '~/types';

import { RichEditorCodeStyles } from '~/components/RichEditor/RichEditor.styled';
import { getTextOverflowStyles } from '~/helpers';

// eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-unsafe-assignment
const hljsDefineSolidity = require('highlightjs-solidity');

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('bash', bash);

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
hljsDefineSolidity(hljs);

const ContentStyled = styled('div')(
  ({ theme }) => css`
    ${RichEditorCodeStyles(theme)}

    > * {
      display: flex;
      flex-direction: column;
      gap: ${theme.spacing(1)};
    }

    a {
      color: ${theme.palette.primary.main};

      &:hover {
        color: ${theme.palette.primary.dark};
      }
    }
  `
);

type ViewPostPageFitProps = {
  post: Pick<Post, 'title' | 'subtitle' | 'content'>;
};

export const ViewPostPageFit = ({ post }: ViewPostPageFitProps) => {
  useEffect(() => {
    document
      .querySelectorAll('[contenteditable=true]')
      .forEach(el => el.setAttribute('contentEditable', 'false'));

    hljs.highlightAll();
  }, []);

  return (
    <Grid spacing={2} fontFamily="Georgia" container>
      <Grid xs={12} item>
        <Typography
          variant="h3"
          fontWeight="bold"
          fontFamily="inherit"
          sx={getTextOverflowStyles()}
        >
          {post.title}
        </Typography>
      </Grid>

      <Grid xs={12} item>
        <Typography variant="h5" fontFamily="inherit" sx={getTextOverflowStyles()}>
          {post.subtitle}
        </Typography>
      </Grid>

      <Grid xs={12} item>
        <Divider />
      </Grid>

      <Grid xs={12} fontSize={20} item>
        <ContentStyled dangerouslySetInnerHTML={{ __html: post.content }} />
      </Grid>
    </Grid>
  );
};
