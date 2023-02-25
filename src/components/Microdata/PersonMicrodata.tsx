import React, { HTMLAttributes } from 'react';

type PersonMicrodataProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  gender?: 'Male' | 'Female';
  email?: string;
  jobTitle?: string;
  image?: string;
};

export const PersonMicrodata = ({
  name,
  gender,
  email,
  jobTitle,
  image,
  ...props
}: PersonMicrodataProps) => {
  return (
    <div itemType="https://schema.org/Person" itemScope {...props}>
      <meta itemProp="name" content={name} />

      {gender && <meta itemProp="gender" content={gender} />}
      {email && <meta itemProp="email" content={email} />}
      {jobTitle && <meta itemProp="jobTitle" content={jobTitle} />}
      {image && <meta itemProp="image" content={image} />}
    </div>
  );
};
