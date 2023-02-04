import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  Button,
  IconButton,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Typography,
  Skeleton,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
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

  const onEditPost = () => {
    navigate(`/post/${postCID}/edit`);
  };

  return (
    <>
      <Card sx={{ display: 'flex', flexDirection: 'column', width: 550, height: 200 }}>
        <CardHeader
          title={post.title}
          subheader={post.created && new Date(post.created).toDateString()}
          action={
            isAuthenticated && (
              <IconButton
                aria-label="post-actions"
                onClick={e => setActionsMenuAnchorEl(e.currentTarget)}
                aria-expanded={Boolean(actionsMenuAnchorEl)}
                aria-controls={actionsMenuAnchorEl ? 'post-actions-menu' : undefined}
                aria-haspopup
              >
                <MoreVertIcon />
              </IconButton>
            )
          }
        />

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            variant="body1"
            overflow="hidden"
            height="100%"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            {post.subtitle}
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: 'right' }}>
          <Button size="small" component={Link} to={`/post/${post.cid}`}>
            Read
          </Button>
        </CardActions>
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
        <MenuItem onClick={() => {}}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>

          <ListItemText onClick={onEditPost}>Edit</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};
