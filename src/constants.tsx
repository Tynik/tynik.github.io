import React from 'react';
import {
  Business as BusinessIcon,
  DirectionsWalk as DirectionsWalkIcon,
  PlayArrow as PlayArrowIcon,
  Psychology as PsychologyIcon,
  School as SchoolIcon,
} from '@mui/icons-material';

import type { TimelinePoint } from '~/types';

export const FULL_NAME = 'Mykhailo Aliinyk';
export const BIRTHDAY_YEAR = 1992;
export const CURRENT_POSITION = 'Principal Frontend Developer';
export const BIO = '';

export const TIMELINE: Record<string, TimelinePoint> = {
  '2022': {
    name: 'ManageGO. New Way',
    icon: <BusinessIcon />,
    position: 'Principal Frontend Developer',
    location: 'New York, US',
    content: `
      Creating fully customized React components using Typescript and Styled Components relying on Figma design. 
      Building new pages using created components. Managing and inspection of existing components for keeping the best UX.
      Following the code review and refactoring as the routine every day.
      Keeping and thinking about the best code performance.
    `,
    stack: [
      'React',
      'Typescript',
      'CSS',
      'Styled Components',
      'React Router',
      'Figma',
      'NX',
      'Jira',
    ],
  },
  '2021': {
    name: 'SPSCommerce. Raise',
    icon: <BusinessIcon />,
    position: 'Senior Frontend Developer',
    location: 'Kyiv, Ukraine',
    content: `
      Continuing of migrating from AngularJS to React and implementing new features. 
      Writing Unit Tests using React Testing Library + Jest, before was used Enzyme. 
      To do not mock directly fetch data functions from the backend we use MSW.
      Creating custom jobs for Azure Pipeline. UI is deployed via custom pipeline into S3 bucket.
    `,
    stack: [
      'React',
      'Redux',
      'SingleSPA',
      'AngularJS',
      'Webpack',
      'Jest',
      'MSW',
      'SASS',
      'Azure',
      'Bash',
      'Jira',
      'Agile',
      'MacOS',
    ],
  },
  '2019': {
    name: 'SPSCommerce. New Beginning',
    icon: <BusinessIcon />,
    position: 'Middle Frontend Developer',
    location: 'Kyiv, Ukraine',
    content: `
      Working with the old AngularJS code and migrating code partially to React. 
      For simplifying the migration process we use Single SPA.
      Implementing new features on React and deprecating the old AngularJS code step by step.
    `,
    stack: [
      'React',
      'Redux',
      'Sofe',
      'SingleSPA',
      'AngularJS',
      'Webpack',
      'Jest',
      'Enzyme',
      'HTML',
      'CSS',
      'Jenkins',
      'Drone',
      'Bash',
      'Jira',
      'Agile',
      'MacOS',
    ],
  },
  '2016/07': {
    name: 'SPSCommerce. Start',
    icon: <BusinessIcon />,
    position: 'Middle Backend Developer',
    location: 'Kyiv, Ukraine',
    content: `
      I got a job at SPSCommerce. I graduated from KhAI.
    `,
    stack: [
      'Python',
      'Django',
      'Flask',
      'AWS',
      'Ansible',
      'Jenkins',
      'REST',
      'Redis',
      'MySQL',
      'Aurora',
      'Jira',
      'Agile',
    ],
  },
  '2016': {
    name: 'Next Steps',
    icon: <DirectionsWalkIcon />,
    location: 'Kyiv, Ukraine',
    content: `
      I taught PHP and Python at PHP Academy for 6 months. 
      I released 2 groups of 25 people who successfully got a job.
    `,
    stack: ['Python', 'Flask', 'MySQL', 'PHP', 'Yii', 'Linux', 'Windows'],
    links: [
      'https://jobs.dou.ua/companies/php-academy/reviews/#32182',
      'https://jobs.dou.ua/companies/php-academy/reviews/#32064',
      'https://jobs.dou.ua/companies/php-academy/reviews/#31865',
    ],
  },
  '2014': {
    name: 'Awareness',
    icon: <PsychologyIcon />,
    position: 'Backend Developer',
    location: 'Kyiv, Ukraine',
    content: `
      I realized that I have enough experience to move on.
      I got a job in Kyiv as PHP backend developer. It was a startup.
      After half a year I decided to use Python instead of PHP and rewrote the whole backend on my own. 
      I did this in my free time because I was involved in learning a new language.
    `,
    stack: ['PHP', 'Yii', 'Python', 'Django', 'MySQL', 'Linux'],
  },
  '2011': {
    name: 'NAU',
    icon: <SchoolIcon />,
    position: 'Fullstack Developer',
    location: 'Kharkiv, Ukraine',
    content: `
      I entered the second semester at KhAI (National Aerospace University "Kharkiv Aviation Institute").
      Inside KhAI I got a job and worked there as Action Script 3.0 developer and after some time 
      as a full-stack engineer, where the backend was PHP (Yii) and UI like usual templates generated on the backend side. 
      It was my first experience in Web development.
    `,
    stack: ['PHP', 'Yii', 'MySQL', 'Action Script', 'HTML', 'CSS', 'Linux'],
  },
  '2007': {
    name: 'Inspiration',
    icon: <PlayArrowIcon />,
    location: 'Chernigiv, Ukraine',
    content: `
      Started from Pascal, C++ and Delphi.
      The Pascal was the first language which I faced.
      Coding simple algorithms and computer viruses for Windows machines.
      Why the viruses? - The code should work on the low level with computer resources 
      (files, registry, injecting malware code into executing files and etc.). 
      Interested logic which allows you to pump the brain.
    `,
    stack: ['C++', 'Delphi', 'Pascal', 'Windows', 'Linux'],
  },
};
