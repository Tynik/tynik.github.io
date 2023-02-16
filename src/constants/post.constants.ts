import type { ChipProps } from '@mui/material';

import type { PostStatus } from '~/types';

export const POST_STATUS_COLOR: Record<PostStatus, ChipProps['color']> = {
  DRAFT: 'default',
  PUBLISHED: 'success',
  ARCHIVED: 'warning',
};
