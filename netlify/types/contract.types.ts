export type ContractPostStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export type ContractPost = {
  cid: string;
  status: string;
  slug: string;
  created: string;
  index: string;
};
