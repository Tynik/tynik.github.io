import React, { useMemo } from 'react';
import { Box, Button, Chip, Grid, Link, Stack, Typography } from '@mui/material';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab';
import { Place as PlaceIcon } from '@mui/icons-material';

import {
  MY_BIO,
  MY_BIRTH_YEAR,
  MY_CURRENT_POSITION,
  MY_FULL_NAME,
  MY_PHOTO,
  MY_TIMELINE,
} from '~/constants';
import { Offer } from '~/components';
import { ResumePageMicrodata } from './ResumePageMicrodata';

export const ResumePage = () => {
  const [isMakeOffer, setIsMakeOffer] = React.useState(false);

  const onCloseMakeOffer = () => {
    setIsMakeOffer(false);
  };

  const timeline = useMemo(() => Object.keys(MY_TIMELINE).sort((t1, t2) => (t1 > t2 ? -1 : 1)), []);

  const years = new Date().getFullYear() - MY_BIRTH_YEAR;

  return (
    <Grid container spacing={2}>
      <ResumePageMicrodata />

      <Grid item xs={12} md={4} position="relative">
        <Box sx={{ opacity: { xs: 0.4, md: 1 } }}>
          <img src={MY_PHOTO} alt={MY_FULL_NAME} width="100%" />
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
            {MY_FULL_NAME}
          </Typography>

          <Typography variant="body2" align="center" color="text.secondary">
            {MY_CURRENT_POSITION}, {years}y
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} md={8}>
        <Box display={{ xs: 'none', md: 'block' }}>
          <Typography variant="h3" align="center" textTransform="uppercase" fontWeight={600}>
            {MY_FULL_NAME}
          </Typography>

          <Typography variant="body2" align="center" color="text.secondary">
            {MY_CURRENT_POSITION}, {years}y
          </Typography>
        </Box>

        <Box mt={2}>
          <Typography>{MY_BIO}</Typography>
        </Box>

        <Box mt={2} textAlign="center">
          <Button variant="contained" color="error" onClick={() => setIsMakeOffer(true)}>
            Make Offer
          </Button>
        </Box>

        <Box mt={2}>
          <Timeline position="right">
            {timeline.map((year, index) => (
              <TimelineItem key={year}>
                <TimelineOppositeContent
                  m="auto 0"
                  align="right"
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    writingMode: { xs: 'vertical-rl', sm: 'initial' },
                    transform: { xs: 'rotate(-180deg)', sm: 'none' },
                    maxWidth: { xs: '2rem', sm: '6rem' },
                    paddingLeft: '0px',
                    paddingRight: 1,
                  }}
                >
                  {year}
                  {!index ? ' - current' : ''}
                </TimelineOppositeContent>

                <TimelineSeparator>
                  <TimelineConnector />

                  <TimelineDot color="primary" variant="outlined">
                    {MY_TIMELINE[year].icon}
                  </TimelineDot>

                  <TimelineConnector />
                </TimelineSeparator>

                <TimelineContent py="12px" px={2}>
                  <Typography variant="h6" component="p">
                    {MY_TIMELINE[year].name}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ justifyContent: { xs: 'space-between', sm: 'normal' } }}
                  >
                    {MY_TIMELINE[year].position && (
                      <Typography color="text.secondary" component="p" variant="body2">
                        {MY_TIMELINE[year].position}
                      </Typography>
                    )}

                    {MY_TIMELINE[year].location && (
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <PlaceIcon fontSize="small" />

                        <Typography component="p" variant="body2">
                          {MY_TIMELINE[year].location}
                        </Typography>
                      </Stack>
                    )}
                  </Stack>

                  <Typography>{MY_TIMELINE[year].content}</Typography>

                  {(MY_TIMELINE[year].stack?.length ?? 0) > 0 && (
                    <Stack direction="row" mt={1} flexWrap="wrap" gap={1}>
                      {MY_TIMELINE[year].stack?.map(technology => (
                        <Chip
                          key={technology}
                          label={technology}
                          variant="outlined"
                          color="primary"
                        />
                      ))}
                    </Stack>
                  )}

                  {(MY_TIMELINE[year].links?.length ?? 0) > 0 && (
                    <Box mt={1}>
                      <Typography variant="subtitle1" component="p" fontWeight={600}>
                        Links
                      </Typography>

                      <Stack color="text.secondary">
                        {MY_TIMELINE[year].links?.map(href => (
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
        </Box>
      </Grid>

      {isMakeOffer && <Offer onClose={onCloseMakeOffer} />}
    </Grid>
  );
};
