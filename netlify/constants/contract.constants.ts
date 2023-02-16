import type { ContractPostStatus } from '../types';

export const CONTRACT_POST_STATUS_MAP: Record<string, ContractPostStatus> = {
  0: 'DRAFT',
  1: 'PUBLISHED',
  2: 'ARCHIVED',
};
