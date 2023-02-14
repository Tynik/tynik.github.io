import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

import type { PostInfo } from '~/types';

type PostCardActionMenuProps = {
  postInfo: PostInfo;
  actionsMenuAnchorEl: HTMLElement | null;
  onClose: () => void;
};

export const PostCardActionMenu = ({
  postInfo,
  actionsMenuAnchorEl,
  onClose,
}: PostCardActionMenuProps) => {
  const navigate = useNavigate();

  const onEditPost = () => {
    navigate(`/post/${postInfo.cid}/edit`);
  };

  return (
    <Menu
      id="post-actions-menu"
      anchorEl={actionsMenuAnchorEl}
      open={Boolean(actionsMenuAnchorEl)}
      onClose={onClose}
      MenuListProps={{
        'aria-labelledby': 'post-actions',
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <MenuItem onClick={onEditPost}>
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>

        <ListItemText>Edit</ListItemText>
      </MenuItem>
    </Menu>
  );
};
