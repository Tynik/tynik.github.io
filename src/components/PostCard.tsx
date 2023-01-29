import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';

import type { Post } from '~/types';

type PostCardProps = {
  post: Post;
};

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card sx={{ width: 275 }}>
      <CardContent>
        <Typography variant="h6">{post.title}</Typography>

        <Typography variant="body1" dangerouslySetInnerHTML={{ __html: post.content }} />
      </CardContent>

      <CardActions sx={{ justifyContent: 'right' }}>
        <Button size="small" component={Link} to={`/post/${post.cid}`}>
          Read
        </Button>
      </CardActions>
    </Card>
  );
};
