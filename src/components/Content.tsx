import React from 'react';
import type { PropsWithChildren } from 'react';

import { styled } from '@mui/material';
import { useStretchHeight } from '~/hooks';

const ContentStyled = styled('div')(({ theme }) => ({
  overflow: 'auto',

  '> *': {
    maxWidth: '1200px',
    minHeight: '100%',

    margin: '0 auto',
    padding: theme.spacing(3),
  },
}));

type ContentProps = PropsWithChildren;

export const Content = ({ children }: ContentProps) => {
  const contentRef = useStretchHeight<HTMLDivElement>();

  return (
    <ContentStyled ref={contentRef}>
      <div>{children}</div>
    </ContentStyled>
  );
};
