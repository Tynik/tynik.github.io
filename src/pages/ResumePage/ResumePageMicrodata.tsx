import React from 'react';

import { CURRENT_POSITION, FULL_NAME } from '~/constants';

type ResumePageMicrodataProps = {
  //
};

export const ResumePageMicrodata = (props: ResumePageMicrodataProps) => {
  return (
    <div itemType="https://schema.org/Person" itemScope>
      <meta itemProp="name" content={FULL_NAME} />
      <meta itemProp="jobTitle" content={CURRENT_POSITION} />
      <meta
        itemProp="image"
        content="https://bafybeicvt5t5hzfwox7atxv6wzojcumieufu4wksf36taklzbaps22eyba.ipfs.dweb.link/IMG_1459_Large.jpeg"
      />
    </div>
  );
};
