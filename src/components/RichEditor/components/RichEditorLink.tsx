import React from 'react';
import { Link } from '@mui/material';

import type { PropsWithChildren } from 'react';
import type { ContentState } from 'draft-js';

type RichEditorLinkProps = PropsWithChildren<{
  contentState: ContentState;
  blockKey: string;
  entityKey: string;
  offsetKey: string;
  decoratedText: string;
  start: number;
  end: number;
  dir: null;
}>;

export const RichEditorLink = ({ contentState, entityKey, decoratedText }: RichEditorLinkProps) => {
  const data = contentState.getEntity(entityKey).getData() as {
    href: string;
    target: string;
  };

  return (
    <Link href={data.href} target={data.target} rel="noopener">
      {decoratedText}
    </Link>
  );
};
