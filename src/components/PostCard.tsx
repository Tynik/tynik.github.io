import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Typography,
  Skeleton,
} from '@mui/material';

import type { PostCID } from '~/types';
import { getPostInfoRequest } from '~/api';

type PostCardProps = {
  postCID: PostCID;
};

export const PostCard = ({ postCID }: PostCardProps) => {
  const { data: post } = useQuery(['get-post'], () => getPostInfoRequest(postCID));

  if (!post) {
    return <Skeleton width={550} height={200} />;
  }

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
