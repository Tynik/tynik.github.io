import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import {
  CssBaseline,
  Drawer,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  createTheme,
  styled,
  useTheme,
  Toolbar,
  IconButton,
  Stack,
  GlobalStyles,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Inbox as InboxIcon,
  Mail as MailIcon,
  Home as HomeIcon,
} from '@mui/icons-material';

import { QueryClient, QueryClientProvider } from 'react-query';
import { RoutesList } from '~/RoutesList';
import { Content } from '~/components';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth = 240;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const MainContent = styled('main', { shouldForwardProp: prop => prop !== 'open' })<{
  open?: boolean;
}>(({ theme: { transitions }, open }) => ({
  flexGrow: 1,
  padding: 0,
  transition: transitions.create('margin', {
    easing: transitions.easing.sharp,
    duration: transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: transitions.create('margin', {
      easing: transitions.easing.easeOut,
      duration: transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})<AppBarProps>(({ theme: { transitions }, open }) => ({
  transition: transitions.create(['margin', 'width'], {
    easing: transitions.easing.sharp,
    duration: transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: transitions.create(['margin', 'width'], {
      easing: transitions.easing.easeOut,
      duration: transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const queryClient = new QueryClient();

const App = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />

        <GlobalStyles
          styles={{
            'html, body': {
              height: '100%',
              overflow: 'hidden',
            },
            '#app': {
              height: '100%',
            },
          }}
        />

        <Box display="flex" height="100%">
          <AppBar position="fixed" open={open}>
            <Toolbar>
              {/* <IconButton */}
              {/*  color="inherit" */}
              {/*  aria-label="open drawer" */}
              {/*  onClick={handleDrawerOpen} */}
              {/*  edge="start" */}
              {/*  sx={{ ...(open && { display: 'none' }) }} */}
              {/* > */}
              {/*  <MenuIcon /> */}
              {/* </IconButton> */}

              <IconButton component={Link} to="/">
                <HomeIcon />
              </IconButton>

              <Box sx={{ flexGrow: 1 }} />

              <Stack direction="row" spacing={1}>
                <Button component={Link} to="/add-post">
                  Add Post
                </Button>

                <Button component={Link} to="/resume">
                  Resume
                </Button>
              </Stack>
            </Toolbar>
          </AppBar>

          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </DrawerHeader>

            <Divider />

            <List>
              {['Solidity'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton component={Link} to="/solidity">
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>

                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>

          <MainContent open={open}>
            <DrawerHeader />

            <Content>
              <QueryClientProvider client={queryClient}>
                <RoutesList />
              </QueryClientProvider>
            </Content>
          </MainContent>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
