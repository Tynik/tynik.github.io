import React from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';

type PostCardProps = {
  title: string;
  content: string;
};

export const PostCard = ({ title, content }: PostCardProps) => {
  return (
    <Card sx={{ width: 275 }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>

        <Typography variant="body1" dangerouslySetInnerHTML={{ __html: content }} />
      </CardContent>

      <CardActions>
        <Button size="small">Read</Button>
      </CardActions>
    </Card>
  );
};
