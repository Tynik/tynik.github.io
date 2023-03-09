import React, { PropsWithChildren } from 'react';

type ArticleMicrodataProps = {
  type: 'Tech';
  name: string;
  body: string;
  headline?: string;
  articleSection?: string;
  dependencies?: string[];
  proficiencyLevel?: 'Beginner' | 'Expert';
};

export const ArticleMicrodata = ({
  children,
  type,
  name,
  headline,
  articleSection,
  dependencies,
  body,
  proficiencyLevel,
}: PropsWithChildren<ArticleMicrodataProps>) => {
  const countWords = body.split(' ').filter(word => word).length;

  return (
    <div itemType={`https://schema.org/${type}Article`} itemScope>
      <meta itemProp="name" content={name} />
      <meta itemProp="articleBody" content={body} />
      <meta itemProp="wordCount" content={countWords.toString()} />

      {headline && <meta itemProp="headline" content={headline} />}
      {articleSection && <meta itemProp="articleSection" content={articleSection} />}
      {dependencies && <meta itemProp="dependencies" content={dependencies.join(', ')} />}
      {proficiencyLevel && <meta itemProp="proficiencyLevel" content={proficiencyLevel} />}

      {children}
    </div>
  );
};
