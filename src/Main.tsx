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
import {
  PlayArrow as PlayArrowIcon,
  School as SchoolIcon,
  DirectionsWalk as DirectionsWalkIcon,
  Psychology as PsychologyIcon,
  Business as BusinessIcon,
  Work as WorkIcon,
} from '@mui/icons-material';

import { netlifyMakeOffer } from '~/netlify-functions';

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
  '2022': {
    name: 'ManageGo. New Way',
    icon: <BusinessIcon />,
    position: 'Frontend Developer',
    content: `
      Creating fully custom React components using Typescript and Styled Components relying on Figma design. 
      Building new pages using created components.
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
    content: `
      I realized that I have enough experience to move on.
      I got a job in Kiyv as PHP backend developer. It was a startup.
      After half a year I decided to use Python instead of PHP and rewrote the whole backend on my own. 
      I did this in my free time because I was involved in learning a new language.
    `,
    stack: ['PHP', 'Yii', 'Python', 'Django', 'MySQL', 'Linux'],
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
    stack: ['PHP', 'Yii', 'MySQL', 'Action Script', 'HTML', 'CSS', 'Linux'],
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
    stack: ['C++', 'Delphi', 'Pascal', 'Windows', 'Linux'],
  },
};

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
            {CURRENT_POSITION}, {BIRTHDAY}
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} md={8}>
        <Box display={{ xs: 'none', md: 'block' }}>
          <Typography variant="h3" align="center" textTransform="uppercase" fontWeight={600}>
            {FULLNAME}
            {/* {new Date().getFullYear() - BIRTHDAY_YEAR}y */}
          </Typography>

          <Typography variant="body2" align="center" color="text.secondary">
            {CURRENT_POSITION}, {BIRTHDAY}
          </Typography>
        </Box>

        <Timeline position="right">
          {Object.keys(timeline)
            .sort()
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

        <Box textAlign="center">
          <Button variant="contained" color="error" onClick={() => setIsMakeOffer(true)}>
            Make Offer
          </Button>
        </Box>
      </Grid>

      <Dialog fullScreen={fullScreen} open={isMakeOffer} onClose={onCloseMakeOffer}>
        <DialogTitle>Make Offer For {FULLNAME}</DialogTitle>
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
