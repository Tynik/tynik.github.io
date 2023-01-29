import React from 'react';
import type { PropsWithChildren } from 'react';

import { styled } from '@mui/material';
import { useStretchHeight } from '~/hooks';

const ContentStyled = styled('div')(({ theme }) => ({
  overflow: 'auto',

  '> *': {
    minHeight: '100%',

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
