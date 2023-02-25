import React from 'react';

import { MY_CURRENT_POSITION, MY_EMAIL, MY_FULL_NAME, MY_PHOTO } from '~/constants';
import { PersonMicrodata } from '~/components';

type ResumePageMicrodataProps = {
  //
};

export const ResumePageMicrodata = (props: ResumePageMicrodataProps) => {
  return (
    <PersonMicrodata
      name={MY_FULL_NAME}
      email={MY_EMAIL}
      jobTitle={MY_CURRENT_POSITION}
      image={MY_PHOTO}
      gender="Male"
    />
  );
};
