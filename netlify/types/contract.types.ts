export type ContractPostStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export type ContractPost = {
  status: string;
  created: string;
  index: string;
};
