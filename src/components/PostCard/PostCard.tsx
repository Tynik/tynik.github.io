import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  IconButton,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Skeleton,
  CardActionArea,
  Grid,
} from '@mui/material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

import type { PostCID } from '~/types';
import { getPostInfoRequest } from '~/api';
import { useUser } from '~/providers';
import { PostCardActionMenu } from './PostCardActionMenu';

type PostCardProps = {
  postCID: PostCID;
};

export const PostCard = ({ postCID }: PostCardProps) => {
  const { isAuthenticated } = useUser();

  const [actionsMenuAnchorEl, setActionsMenuAnchorEl] = React.useState<HTMLElement | null>(null);

  const { data: postInfo } = useQuery(['get-post-info', postCID], () =>
    getPostInfoRequest(postCID)
  );

  if (!postInfo) {
    return (
      <Grid xs={12} md={6} item>
        <Skeleton width="100%" height={50} variant="rounded" />
        <Skeleton width="100%" height={142} variant="rounded" sx={{ mt: 1 }} />
      </Grid>
    );
  }

  const onActionsMenu: React.MouseEventHandler<HTMLElement> = e => {
    e.preventDefault();

    setActionsMenuAnchorEl(e.currentTarget);
  };

  return (
    <Grid xs={12} md={6} item>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardActionArea component={Link} to={`/post/${postInfo.cid}`} sx={{ height: '100%' }}>
          <CardHeader
            title={postInfo.title}
            subheader={postInfo.created && new Date(postInfo.created).toDateString()}
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
              {postInfo.subtitle}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      <PostCardActionMenu
        postInfo={postInfo}
        actionsMenuAnchorEl={actionsMenuAnchorEl}
        onClose={() => setActionsMenuAnchorEl(null)}
      />
    </Grid>
  );
};
