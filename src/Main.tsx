import React from 'react';

import { Typography, Grid, Stack, Chip, Link, Box } from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
import {
  PlayArrow as PlayArrowIcon,
  School as SchoolIcon,
  DirectionsWalk as DirectionsWalkIcon,
  Psychology as PsychologyIcon,
  Business as BusinessIcon,
  Work as WorkIcon,
} from '@mui/icons-material';

const FULLNAME = 'Mykhailo Aliinyk';
const BIRTHDAY = '09/27/1992';
const BIRTHDAY_YEAR = 1992;
const CURRENT_POSITION = 'Senior Frontend Engineer';

type TimelinePoint = {
  icon: React.ReactElement;
  name: string;
  content: string;
  stack?: string[];
  position?: string;
  links?: string[];
};

const timeline: Record<string, TimelinePoint> = {
  '2021': {
    name: 'SPSCommerce',
    icon: <BusinessIcon />,
    position: 'Senior Frontend Developer',
    content: `
    `,
    stack: ['React', 'SPA', 'AngularJS', 'Webpack', 'Jest', 'SASS'],
  },
  '2019': {
    name: 'SPSCommerce',
    icon: <BusinessIcon />,
    position: 'Middle Frontend Developer',
    content: `
    `,
    stack: ['React', 'AngularJS', 'Webpack', 'Jest', 'Enzyme', 'HTML', 'CSS'],
  },
  '2016/07': {
    name: 'SPSCommerce',
    icon: <BusinessIcon />,
    position: 'Middle Backend Developer',
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
    ],
  },
  '2016': {
    name: 'Next Steps',
    icon: <DirectionsWalkIcon />,
    content: `
      I taught PHP and Python at PHP Academy for 6 months. 
      I released 2 groups of 25 people who successfully got a job.
    `,
    stack: ['Python', 'Flask', 'MySQL', 'PHP', 'Yii'],
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
    content: `
      I realized that I have enough experience to move on.
      I got a job in Kiyv as PHP backend developer. It was a startup.
      After half a year I decided to use Python instead of PHP and rewrote the whole backend on my own. 
      I did this in my free time because I was involved in learning a new language.
    `,
    stack: ['PHP', 'Yii', 'Python', 'Django', 'MySQL'],
  },
  '2011': {
    name: 'NAU',
    icon: <SchoolIcon />,
    position: 'Fullstack Developer',
    content: `
      I entered the second semester at KhAI (National Aerospace University "Kharkiv Aviation Institute").
      Inside KhAI I got a job and worked there as Action Script 3.0 developer and after some time 
      as a full-stack engineer, where the backend was PHP (Yii) and UI like usual templates generated on the backend side. 
      It was my first experience in Web development.
    `,
    stack: ['PHP', 'Yii', 'MySQL', 'Action Script', 'HTML', 'CSS'],
  },
  '2007': {
    name: 'Inspiration',
    icon: <PlayArrowIcon />,
    content: `
      Started from Pascal, C++ and Delphi.
      The Pascal was the first language which I faced.
      Coding simple algorithms and computer viruses for Windows machines.
      Why the viruses? - The code should work on the low level with computer resources 
      (files, registry, injecting malware code into executing files and etc.). 
      Interested logic which allows you to pump the brain.
    `,
    stack: ['C++', 'Delphi', 'Pascal'],
  },
};

const Main = () => {
  return (
    <Grid container mt={2} spacing={2}>
      <Grid item xs={12} md={6} position="relative">
        <Box sx={{ opacity: { xs: 0.4, md: 1 } }}>
          <img
            src="https://bafybeigoqmi3ratjk7kjm7jx5g6cpk7xbnuphq4ypg53odj77xz5on52re.ipfs.dweb.link/IMG_1459.jpeg"
            alt={FULLNAME}
            width="100%"
          />
        </Box>
        <Box
          display={{ md: 'none' }}
          position="absolute"
          top={0}
          margin="auto"
          left={0}
          right={0}
          mt={14}
        >
          <Typography variant="h3" align="center" textTransform="uppercase" fontWeight={600}>
            {FULLNAME}
          </Typography>

          <Typography variant="body2" align="center" color="text.secondary">
            {CURRENT_POSITION}
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Box display={{ xs: 'none', md: 'block' }}>
          <Typography variant="h3" align="center" textTransform="uppercase" fontWeight={600}>
            {FULLNAME}
            {/* {new Date().getFullYear() - BIRTHDAY_YEAR}y */}
          </Typography>

          <Typography variant="body2" align="center" color="text.secondary">
            {CURRENT_POSITION}
          </Typography>
        </Box>

        <Timeline position="right">
          {Object.keys(timeline)
            .sort()
            .map(year => (
              <TimelineItem key={year}>
                <TimelineOppositeContent
                  m="auto 0"
                  align="right"
                  variant="body2"
                  color="text.secondary"
                  whiteSpace="nowrap"
                  sx={{
                    writingMode: { xs: 'vertical-rl', sm: 'initial' },
                    transform: { xs: 'rotate(-180deg)', sm: 'none' },
                    maxWidth: { xs: '2rem', sm: '6rem' },
                    paddingLeft: '0px',
                    paddingRight: 1,
                  }}
                >
                  {year} ({Number.parseInt(year, 10) - BIRTHDAY_YEAR}y)
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineConnector />
                  <TimelineDot color="primary" variant="outlined">
                    {timeline[year].icon}
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent py="12px" px={2}>
                  <Typography variant="h6" component="p">
                    {timeline[year].name}
                  </Typography>

                  {timeline[year].position && (
                    <Typography color="text.secondary" component="p" variant="body2">
                      {timeline[year].position}
                    </Typography>
                  )}

                  <Typography>{timeline[year].content}</Typography>

                  {timeline[year].stack?.length > 0 && (
                    <Stack direction="row" mt={1} flexWrap="wrap" gap={1}>
                      {timeline[year].stack.map(technology => (
                        <Chip
                          key={technology}
                          label={technology}
                          variant="outlined"
                          color="primary"
                        />
                      ))}
                    </Stack>
                  )}

                  {timeline[year].links?.length > 0 && (
                    <Box mt={1}>
                      <Typography variant="subtitle1" component="p" fontWeight={600}>
                        Links
                      </Typography>
                      <Stack color="text.secondary">
                        {timeline[year].links.map(href => (
                          <Link key={href} href={href} target="_blank">
                            {href}
                          </Link>
                        ))}
                      </Stack>
                    </Box>
                  )}
                </TimelineContent>
              </TimelineItem>
            ))}
        </Timeline>
      </Grid>
    </Grid>
  );
};

export default Main;
