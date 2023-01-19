import React from 'react';

export type TimelinePoint = {
  icon: React.ReactElement;
  name: string;
  content: string;
  stack?: string[];
  position?: string;
  location?: string;
  links?: string[];
};
