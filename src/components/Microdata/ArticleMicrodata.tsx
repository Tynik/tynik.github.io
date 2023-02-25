import React from 'react';

type ArticleMicrodataProps = {
  type: 'Tech';
  name: string;
  body: string;
  proficiencyLevel?: 'Expert';
};

export const ArticleMicrodata = ({ type, name, body, proficiencyLevel }: ArticleMicrodataProps) => {
  return (
    <div itemType={`https://schema.org/${type}Article`} itemScope>
      <meta itemProp="name" content={name} />
      <meta itemProp="articleBody" content={body} />

      {proficiencyLevel && <meta itemProp="proficiencyLevel" content={proficiencyLevel} />}
    </div>
  );
};
