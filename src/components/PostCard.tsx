import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardActions, CardHeader, CardContent, Typography } from '@mui/material';

import type { Post } from '~/types';

type PostCardProps = {
  post: Post;
};

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', width: 550, height: 200 }}>
      <CardHeader
        title={post.title}
        subheader={post.created && new Date(post.created).toDateString()}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="body1">{post.subtitle}</Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'right' }}>
        <Button size="small" component={Link} to={`/post/${post.cid}`}>
          Read
        </Button>
      </CardActions>
    </Card>
  );
};
