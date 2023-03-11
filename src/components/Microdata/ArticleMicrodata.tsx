import React from 'react';

import type { PropsWithChildren } from 'react';

type ArticleMicrodataProps = {
  type: 'Tech';
  name: string;
  body: string;
  headline?: string;
  keywords?: string[];
  articleSection?: string;
  dependencies?: string[];
  datePublished?: string;
  proficiencyLevel?: 'Beginner' | 'Expert';
};

export const ArticleMicrodata = ({
  children,
  type,
  name,
  body,
  headline,
  keywords,
  articleSection,
  dependencies,
  datePublished,
  proficiencyLevel,
}: PropsWithChildren<ArticleMicrodataProps>) => {
  const countWords = body.split(' ').filter(word => word).length;

  return (
    <div itemType={`https://schema.org/${type}Article`} itemScope>
      <meta itemProp="name" content={name} />
      <meta itemProp="articleBody" content={body} />
      <meta itemProp="wordCount" content={countWords.toString()} />

      {headline && <meta itemProp="headline" content={headline} />}
      {datePublished && <meta itemProp="datePublished" content={datePublished} />}
      {articleSection && <meta itemProp="articleSection" content={articleSection} />}
      {proficiencyLevel && <meta itemProp="proficiencyLevel" content={proficiencyLevel} />}

      {keywords && keywords.length > 0 && (
        <meta itemProp="keywords" content={keywords.join(', ')} />
      )}

      {dependencies && dependencies.length > 0 && (
        <meta itemProp="dependencies" content={dependencies.join(', ')} />
      )}

      {children}
    </div>
  );
};
