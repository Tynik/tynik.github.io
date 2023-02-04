import React from 'react';
import { Button, Grid } from '@mui/material';
import type { Editor } from 'draft-js';

import { ViewPostPageFit } from '~/pages/ViewPostPageFit';

type PreviewPostPageProps = {
  title: string;
  subtitle: string;
  editor: Editor | null;
  onExit: () => void;
};

export const PreviewPostPage = ({ title, subtitle, editor, onExit }: PreviewPostPageProps) => {
  return (
    <Grid spacing={2} container>
      <Grid xs={12} item>
        <ViewPostPageFit
          post={{
            title,
            subtitle,
            content: editor?.editor?.innerHTML ?? '',
          }}
        />
      </Grid>

      <Grid xs={12} textAlign="right" item>
        <Button onClick={onExit}>Exit Preview</Button>
      </Grid>
    </Grid>
  );
};
