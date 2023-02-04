import React from 'react';
import { Skeleton } from '@mui/material';

export const PostSkeleton = () => {
  return (
    <>
      <Skeleton width="100%" height={50} variant="rounded" />

      <Skeleton width="100%" height={40} variant="rounded" sx={{ mt: 2 }} />

      <Skeleton width="100%" height={250} variant="rounded" sx={{ mt: 2 }} />
    </>
  );
};
