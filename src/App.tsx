import React from 'react';
import { Link } from 'react-router-dom';
import {
  Drawer,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  useTheme,
  Toolbar,
  IconButton,
  Stack,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Inbox as InboxIcon,
  Mail as MailIcon,
  Home as HomeIcon,
} from '@mui/icons-material';

import { RoutesList } from '~/RoutesList';
import { Content } from '~/components';
import { useUser } from '~/providers';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth = 240;

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

const App = () => {
  const theme = useTheme();
  const { isAuthenticated } = useUser();

  const [open, setOpen] = React.useState(false);

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
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
            {isAuthenticated && (
              <Button component={Link} to="/add-post">
                Add Post
              </Button>
            )}

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
          <RoutesList />
        </Content>
      </MainContent>
    </Box>
  );
};

export default App;
