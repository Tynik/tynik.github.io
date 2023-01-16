import React from 'react';

import {
  Typography,
  Grid,
  Stack,
  Chip,
  Link,
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  LoadingButton,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';

import { netlifyMakeOffer } from '~/netlify-functions';
import { BIRTHDAY_YEAR, CURRENT_POSITION, FULL_NAME, TIMELINE, YEARS } from '~/constants';

const Main = () => {
  const [isMakeOffer, setIsMakeOffer] = React.useState(false);
  const [isSendingOffer, setIsSendingOffer] = React.useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [company, setCompany] = React.useState<string>(null);
  const [name, setName] = React.useState<string>(null);
  const [contact, setContact] = React.useState<string>(null);
  const [salaryRange, setSalaryRange] = React.useState<string>(null);
  const [desc, setDesc] = React.useState<string>(null);

  const onCloseMakeOffer = () => {
    setIsMakeOffer(false);
  };

  const onSendOfferHandler = async () => {
    try {
      setIsSendingOffer(true);

      await netlifyMakeOffer({ company, name, contact, salaryRange, desc });

      setIsMakeOffer(false);
    } finally {
      setIsSendingOffer(false);
    }
  };

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
            {CURRENT_POSITION}, {YEARS}y
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} md={8}>
        <Box display={{ xs: 'none', md: 'block' }}>
          <Typography variant="h3" align="center" textTransform="uppercase" fontWeight={600}>
            {FULL_NAME}
            {/* {new Date().getFullYear() - BIRTHDAY_YEAR}y */}
          </Typography>

          <Typography variant="body2" align="center" color="text.secondary">
            {CURRENT_POSITION}, {YEARS}y
          </Typography>
        </Box>

        <Box mt={2} textAlign="center">
          <Button variant="contained" color="error" onClick={() => setIsMakeOffer(true)}>
            Make Offer
          </Button>
        </Box>

        <Box mt={2}>
          <Timeline position="right">
            {Object.keys(TIMELINE)
              .sort((t1, t2) => (t1 > t2 ? -1 : 1))
              .map((year, index, array) => (
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
                    {index === array.length - 1 ? ' - current' : ''} (
                    {Number.parseInt(year, 10) - BIRTHDAY_YEAR}y)
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

                    {TIMELINE[year].position && (
                      <Typography color="text.secondary" component="p" variant="body2">
                        {TIMELINE[year].position}
                      </Typography>
                    )}

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

      <Dialog fullScreen={fullScreen} open={isMakeOffer} onClose={onCloseMakeOffer}>
        <DialogTitle>Make Offer For {FULL_NAME}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To make offer please fill all required fields. I will send you a response to your
            contact address.
          </DialogContentText>
          <TextField
            margin="dense"
            id="company"
            label="Company"
            variant="standard"
            value={company || ''}
            onChange={e => setCompany(e.target.value)}
            error={company === ''}
            autoFocus
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            label="Name"
            variant="standard"
            value={name || ''}
            onChange={e => setName(e.target.value)}
            error={name === ''}
            fullWidth
          />
          <TextField
            margin="dense"
            id="contact"
            label="Contact"
            variant="standard"
            value={contact || ''}
            onChange={e => setContact(e.target.value)}
            error={contact === ''}
            fullWidth
          />
          <TextField
            margin="dense"
            id="salaryRange"
            label="Salary Range"
            variant="standard"
            value={salaryRange || ''}
            onChange={e => setSalaryRange(e.target.value)}
            error={salaryRange === ''}
            fullWidth
          />
          <TextField
            margin="dense"
            id="desc"
            label="Description"
            variant="standard"
            value={desc || ''}
            onChange={e => setDesc(e.target.value)}
            error={desc === ''}
            rows={10}
            multiline
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseMakeOffer}>Cancel</Button>
          <LoadingButton
            /* eslint-disable-next-line @typescript-eslint/no-misused-promises */
            onClick={onSendOfferHandler}
            disabled={!company || !name || !contact || !salaryRange || !desc}
            loading={isSendingOffer}
          >
            Send
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Main;
