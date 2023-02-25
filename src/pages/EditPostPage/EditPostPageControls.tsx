import React from 'react';
import { Button, Stack } from '@mui/material';
import {
  Cancel as CancelIcon,
  Save as SaveIcon,
  Send as SendIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import type { RichPost } from '~/types';

import { publishPostRequest } from '~/api';
import { useUser } from '~/providers';

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

  const user = useUser();

  const publishPostHandler = async () => {
    if (!user.ethAccount) {
      return;
    }

    try {
      await publishPostRequest({
        cid: richPost.cid,
        ethAccount: user.ethAccount,
      });

      toast('Successfully published', { type: 'success' });

      navigate('/');
    } catch (e) {
      toast('Something went wrong', { type: 'error' });
    }
  };

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

      {richPost.status !== 'PUBLISHED' && (
        <Button
          onClick={publishPostHandler}
          startIcon={<SendIcon />}
          variant="outlined"
          color="info"
        >
          Publish
        </Button>
      )}

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
