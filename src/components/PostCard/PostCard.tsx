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

import type { PostInfo } from '~/api';
import { getPostInfoContentRequest } from '~/api';
import { useUser } from '~/providers';
import { PostCardActionMenu } from './PostCardActionMenu';

type PostCardProps = {
  postInfo: PostInfo;
};

export const PostCard = ({ postInfo }: PostCardProps) => {
  const { isAuthenticated } = useUser();

  const [actionsMenuAnchorEl, setActionsMenuAnchorEl] = React.useState<HTMLElement | null>(null);

  const { data: postInfoContent } = useQuery(['get-post-info', postInfo.cid], () =>
    getPostInfoContentRequest(postInfo.cid)
  );

  if (!postInfoContent) {
    return (
      <Grid xs={12} md={6} item>
        <Skeleton width="100%" height={45} variant="rounded" />
        <Skeleton width="100%" height={90} variant="rounded" sx={{ mt: 1 }} />
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
        <CardActionArea component={Link} to={`/post/${postInfo.slug}`} sx={{ height: '100%' }}>
          <CardHeader
            title={postInfoContent.title}
            subheader={postInfoContent.created && new Date(postInfoContent.created).toDateString()}
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
              {postInfoContent.subtitle}
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
