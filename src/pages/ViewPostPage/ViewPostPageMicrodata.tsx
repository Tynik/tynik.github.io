import React, { useMemo } from 'react';

import type { Post } from '~/types';

import { ArticleMicrodata, PersonMicrodata } from '~/components';
import { MY_CURRENT_POSITION, MY_EMAIL, MY_FULL_NAME, MY_PHOTO } from '~/constants';

const innerText = (element: Node) => {
  const getTextLoop = (element: Node) => {
    const texts: string[] = [];

    Array.from(element.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        texts.push(node.textContent?.trim() ?? '');
      } else {
        texts.push(...getTextLoop(node));
      }
    });

    return texts;
  };

  return getTextLoop(element).join(' ');
};

type ViewPostPageMicrodataProps = {
  post: Post;
};

export const ViewPostPageMicrodata = ({ post }: ViewPostPageMicrodataProps) => {
  const textContent = useMemo(() => {
    const content = window.document.createElement('div');

    content.innerHTML = post.content;

    return innerText(content);
  }, [post.content]);

  return (
    <ArticleMicrodata
      type="Tech"
      name={post.title}
      body={textContent}
      datePublished={new Date(post.created).toDateString()}
      proficiencyLevel="Expert"
    >
      <PersonMicrodata
        name={MY_FULL_NAME}
        email={MY_EMAIL}
        jobTitle={MY_CURRENT_POSITION}
        image={MY_PHOTO}
        gender="Male"
        itemProp="author"
      />
    </ArticleMicrodata>
  );
};
