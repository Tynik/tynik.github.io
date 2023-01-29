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

export type Post = {
  cid: PostCID;
  title: string;
  content: string;
};
