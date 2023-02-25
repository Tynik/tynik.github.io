import React from 'react';

export type PostCID = string;

export type PostStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export type TimelinePoint = {
  icon: React.ReactElement;
  name: string;
  content: string;
  stack?: string[];
  position?: string;
  location?: string;
  links?: string[];
};

export interface PostInfoContent {
  cid: PostCID;
  title: string;
  subtitle: string;
  created: number;
}

export interface Post extends PostInfoContent {
  status: PostStatus;
  slug: string;
  content: string;
}

export interface RichPost extends PostInfoContent {
  status: PostStatus;
  slug: string;
  richContent: string;
}
