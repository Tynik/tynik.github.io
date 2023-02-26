import React from 'react';
import { Button, Stack } from '@mui/material';
import {
  Cancel as CancelIcon,
  Save as SaveIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import type { RichPost } from '~/types';

type EditPostPageControlsProps = {
  richPost: RichPost;
  canBeSaved: boolean;
  onTogglePreviewMode: () => void;
  onSave: () => void;
};

export const EditPostPageControls = ({
  richPost,
  canBeSaved,
  onTogglePreviewMode,
  onSave,
}: EditPostPageControlsProps) => {
  const navigate = useNavigate();

  const cancelPostEditHandler = () => {
    navigate(`/post/${richPost.slug}`);
  };

  return (
    <Stack spacing={2} direction="row" justifyContent="right">
      <Button
        onClick={onTogglePreviewMode}
        disabled={!canBeSaved}
        startIcon={<VisibilityIcon />}
        variant="outlined"
      >
        Preview
      </Button>

      <Button
        onClick={onSave}
        disabled={!canBeSaved}
        startIcon={<SaveIcon />}
        variant="outlined"
        color="success"
      >
        Save
      </Button>

      <Button
        onClick={cancelPostEditHandler}
        startIcon={<CancelIcon />}
        variant="outlined"
        color="error"
      >
        Cancel
      </Button>
    </Stack>
  );
};
