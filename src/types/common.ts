import React from 'react';

export type PostCID = string;

export type TimelinePoint = {
  icon: React.ReactElement;
  name: string;
  content: string;
  stack?: string[];
  position?: string;
  location?: string;
  links?: string[];
};

export interface PostInfo {
  cid: PostCID;
  title: string;
  subtitle: string;
  created: number;
}

export interface Post extends PostInfo {
  content: string;
}
