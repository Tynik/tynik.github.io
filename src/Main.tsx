import React from 'react';

import { Typography, Grid } from '@mui/material';
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
} from '@mui/icons-material';

const FULLNAME = 'Mykhailo Aliinyk';
const BIRTHDAY = '09/27/1992';
const BIRTHDAY_YEAR = 1992;
const CURRENT_POSITION = 'Senior Frontend Engineer';

const timeline: Record<string, { icon: React.ReactElement; name: string; content: string }> = {
  2016: {
    name: 'Next Steps',
    icon: <DirectionsWalkIcon />,
    content: `I graduated from KhAI.`,
  },
  2011: {
    name: 'NAU',
    icon: <SchoolIcon />,
    content: `I entered the second semester at KhAI (National Aerospace University "Kharkiv Aviation Institute").
    Inside KhAI I got a job and worked there as Action Script 3.0 developer and after some time 
    as a full-stack engineer, where the backend was PHP (Yii) and UI like usual templates generated on the backend side. 
    It was my first experience in Web development.`,
  },
  2007: {
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
  },
};

const Main = () => {
  return (
    <Grid container mt={2} spacing={2}>
      <Grid item sm={3} md={6}>
        <img
          src="https://bafybeigoqmi3ratjk7kjm7jx5g6cpk7xbnuphq4ypg53odj77xz5on52re.ipfs.dweb.link/IMG_1459.jpeg"
          alt={FULLNAME}
          width="100%"
        />
      </Grid>

      <Grid item sm={9} md={6}>
        <Typography variant="h3" align="center" textTransform="uppercase" fontWeight={600}>
          {FULLNAME}
          {/* {new Date().getFullYear() - BIRTHDAY_YEAR}y */}
        </Typography>

        <Typography variant="body2" align="center" color="text.secondary">
          {CURRENT_POSITION}
        </Typography>

        <Timeline position="right">
          {Object.keys(timeline).map(year => (
            <TimelineItem key={year}>
              <TimelineOppositeContent
                m="auto 0"
                align="right"
                variant="body2"
                color="text.secondary"
                style={{ flex: 0.1 }}
              >
                {year} ({+year - BIRTHDAY_YEAR}y)
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color="primary" variant="outlined">
                  {timeline[year].icon}
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent py="12px" px={2}>
                <Typography variant="h6" component="span">
                  {timeline[year].name}
                </Typography>
                <Typography>{timeline[year].content}</Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Grid>
    </Grid>
  );
};

export default Main;
