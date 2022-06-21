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
import { PlayArrow as PlayArrowIcon } from '@mui/icons-material';

const timeline: Record<string, { icon: React.ReactElement; name: string; content: string }> = {
  2007: {
    name: 'Inspiration',
    icon: <PlayArrowIcon />,
    content:
      'Started from Pascal, C++ and Delphi. The Pascal was the first language which I faced.',
  },
};

const Main = () => {
  return (
    <Grid container mt={2} spacing={2}>
      <Grid item sm={3} md={6}>
        <img
          src="https://bafybeigoqmi3ratjk7kjm7jx5g6cpk7xbnuphq4ypg53odj77xz5on52re.ipfs.dweb.link/IMG_1459.jpeg"
          alt="Mykhailo Aliinyk"
          width="100%"
        />
      </Grid>

      <Grid item sm={9} md={6}>
        <Typography variant="h3" align="center" textTransform="uppercase" fontWeight={600}>
          Mykhailo Aliinyk
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary">
          Senior Frontend Engineer
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
                {year}
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
