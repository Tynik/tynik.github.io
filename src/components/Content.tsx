import React, { createContext, useContext } from 'react';
import type { PropsWithChildren, RefObject } from 'react';

import { styled } from '@mui/material';
import { useStretchHeight } from '~/hooks';

const MAX_CONTENT_WIDTH = '1200px';

const ContentStyled = styled('div')(({ theme }) => ({
  overflow: 'auto',

  '> *': {
    maxWidth: MAX_CONTENT_WIDTH,
    minHeight: '100%',

    margin: '0 auto',
    padding: theme.spacing(3),
  },
}));

const ContentContext = createContext<RefObject<HTMLDivElement> | null>(null);

export const Content = ({ children }: PropsWithChildren) => {
  const contentRef = useStretchHeight<HTMLDivElement>();

  return (
    <ContentStyled ref={contentRef}>
      <ContentContext.Provider value={contentRef}>
        <div>{children}</div>
      </ContentContext.Provider>
    </ContentStyled>
  );
};

export const useContent = () => {
  return useContext(ContentContext);
};
