import React from 'react';
import type { PropsWithChildren } from 'react';

type WebSiteMicrodataProps = {
  name: string;
  url: string;
};

export const WebSiteMicrodata = ({
  children,
  name,
  url,
}: PropsWithChildren<WebSiteMicrodataProps>) => {
  return (
    <div itemType="https://schema.org/WebSite" itemScope>
      <meta itemProp="name" content={name} />
      <meta itemProp="url" content={url} />

      {children}
    </div>
  );
};
