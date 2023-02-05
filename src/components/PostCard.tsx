import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  IconButton,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Skeleton,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  CardActionArea,
} from '@mui/material';
import { MoreVert as MoreVertIcon, Edit as EditIcon } from '@mui/icons-material';

import type { PostCID } from '~/types';
import { getPostInfoRequest } from '~/api';
import { useUser } from '~/providers';

type PostCardProps = {
  postCID: PostCID;
};

export const PostCard = ({ postCID }: PostCardProps) => {
  const navigate = useNavigate();

  const { isAuthenticated } = useUser();

  const [actionsMenuAnchorEl, setActionsMenuAnchorEl] = React.useState<null | HTMLElement>(null);

  const { data: post } = useQuery(['get-post-info', postCID], () => getPostInfoRequest(postCID));

  if (!post) {
    return (
      <div>
        <Skeleton width={550} height={30} variant="rounded" />
        <Skeleton width={550} height={162} variant="rounded" sx={{ mt: 1 }} />
      </div>
    );
  }

  const onActionsMenu: React.MouseEventHandler<HTMLElement> = e => {
    e.preventDefault();

    setActionsMenuAnchorEl(e.currentTarget);
  };

  const onEditPost = () => {
    navigate(`/post/${postCID}/edit`);
  };

  return (
    <>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 550,
        }}
      >
        <CardActionArea component={Link} to={`/post/${post.cid}`} sx={{ height: '100%' }}>
          <CardHeader
            title={post.title}
            subheader={post.created && new Date(post.created).toDateString()}
            action={
              isAuthenticated && (
                <IconButton
                  aria-label="post-actions"
                  onClick={onActionsMenu}
                  aria-expanded={Boolean(actionsMenuAnchorEl)}
                  aria-controls={actionsMenuAnchorEl ? 'post-actions-menu' : undefined}
                  aria-haspopup
                >
                  <MoreVertIcon />
                </IconButton>
              )
            }
            titleTypographyProps={{
              sx: {
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
              },
            }}
            sx={{
              '& .MuiCardHeader-content': { overflow: 'hidden' },
            }}
          />

          <CardContent sx={{ flexGrow: 1 }}>
            <Typography
              variant="body1"
              sx={{
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
              }}
            >
              {post.subtitle}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <Menu
        id="post-actions-menu"
        anchorEl={actionsMenuAnchorEl}
        open={Boolean(actionsMenuAnchorEl)}
        onClose={() => setActionsMenuAnchorEl(null)}
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
    </>
  );
};
