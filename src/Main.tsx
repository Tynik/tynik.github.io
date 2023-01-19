import React, { useMemo } from 'react';
import { Typography, Grid, Stack, Chip, Link, Box, Button } from '@mui/material';
import { Place as PlaceIcon } from '@mui/icons-material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
import { BIRTHDAY_YEAR, CURRENT_POSITION, FULL_NAME, TIMELINE } from '~/constants';
import { Offer } from '~/components/Offer';

export const Main = () => {
  const [isMakeOffer, setIsMakeOffer] = React.useState(false);

  const onCloseMakeOffer = () => {
    setIsMakeOffer(false);
  };

  const timeline = useMemo(() => Object.keys(TIMELINE).sort((t1, t2) => (t1 > t2 ? -1 : 1)), []);

  const years = new Date().getFullYear() - BIRTHDAY_YEAR;

  return (
    <Grid container pt={2} pb={2} spacing={2}>
      <Grid item xs={12} md={4} position="relative">
        <Box sx={{ opacity: { xs: 0.4, md: 1 } }}>
          <img
            src="https://bafybeicvt5t5hzfwox7atxv6wzojcumieufu4wksf36taklzbaps22eyba.ipfs.dweb.link/IMG_1459_Large.jpeg"
            alt={FULL_NAME}
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
            {FULL_NAME}
          </Typography>

          <Typography variant="body2" align="center" color="text.secondary">
            {CURRENT_POSITION}, {years}y
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} md={8}>
        <Box display={{ xs: 'none', md: 'block' }}>
          <Typography variant="h3" align="center" textTransform="uppercase" fontWeight={600}>
            {FULL_NAME}
          </Typography>

          <Typography variant="body2" align="center" color="text.secondary">
            {CURRENT_POSITION}, {years}y
          </Typography>
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
                    {TIMELINE[year].icon}
                  </TimelineDot>

                  <TimelineConnector />
                </TimelineSeparator>

                <TimelineContent py="12px" px={2}>
                  <Typography variant="h6" component="p">
                    {TIMELINE[year].name}
                  </Typography>

                  <Stack direction="row" spacing={1}>
                    {TIMELINE[year].position && (
                      <Typography color="text.secondary" component="p" variant="body2">
                        {TIMELINE[year].position}
                      </Typography>
                    )}

                    {TIMELINE[year].location && (
                      <Stack direction="row">
                        <PlaceIcon fontSize="small" />

                        <Typography component="p" variant="body2">
                          {TIMELINE[year].location}
                        </Typography>
                      </Stack>
                    )}
                  </Stack>

                  <Typography>{TIMELINE[year].content}</Typography>

                  {TIMELINE[year].stack?.length > 0 && (
                    <Stack direction="row" mt={1} flexWrap="wrap" gap={1}>
                      {TIMELINE[year].stack.map(technology => (
                        <Chip
                          key={technology}
                          label={technology}
                          variant="outlined"
                          color="primary"
                        />
                      ))}
                    </Stack>
                  )}

                  {TIMELINE[year].links?.length > 0 && (
                    <Box mt={1}>
                      <Typography variant="subtitle1" component="p" fontWeight={600}>
                        Links
                      </Typography>

                      <Stack color="text.secondary">
                        {TIMELINE[year].links.map(href => (
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
