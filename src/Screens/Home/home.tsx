import React, { lazy, Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AccountCircle, SearchOutlined, Home, DescriptionRounded, GroupRounded, Settings, SsidChart, ImageRounded, } from '@mui/icons-material';
import DashBoard from '../Dashboard/Components/dashboard';
import { borderStyle } from '../../Assets/consts';
import AddOREditScreenLoadingUI from '../Add-EditSensor/Components/route_loading_ui';

/************* Code-Splitting other Routes and Modules: ************/
// Add or Edit Screens:
const AddOREditSensor = lazy(() => import('../Add-EditSensor/Components/add_edit_sensor'));
const AddSensorDataProvider = lazy(() => import('../Add-EditSensor/Context/add_sensor_context'));
// Sensor Details Screen:
const SensorDetails = lazy(() => import('../SensorDetails/Components/sensor_details'));

const AddOREditSensorScreen = () => {
  return (
    <Suspense fallback={<AddOREditScreenLoadingUI />} >
      <AddSensorDataProvider>
          <AddOREditSensor />
      </AddSensorDataProvider>
    </Suspense>
  )
}

const SensorDetailsScreen = () => {
  return (
    <Suspense fallback={<AddOREditScreenLoadingUI />} >
      <SensorDetails />
    </Suspense>
  )
}

/****************  Menu Drawer related methods: ****************/
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

/*************** Home/Dashboard Compoenent:  ******************/
export default function HomeDashboard() {

  const theme = useTheme()

  const drawerIconsStyle = {
    color: theme.palette.secondary.main,
    width: '1.25em',
    height: '1.25em',
  }

  const drawerItemList = [
    {
        text: 'Search',
        icon: <SearchOutlined sx={drawerIconsStyle}  />
    },
    {
        text: 'DASHBOARD',
        icon: <Home sx={drawerIconsStyle} />
    },
    {
        text: 'REPORTS',
        icon: <DescriptionRounded sx={drawerIconsStyle} />
    },
    {
        text: 'SENSORS',
        icon: <SsidChart sx={drawerIconsStyle} />
    },
    {
        text: 'USERS',
        icon: <GroupRounded sx={drawerIconsStyle} />
    },
    {
        text: 'SETTINGS',
        icon: <Settings sx={drawerIconsStyle} />
    },
  ]

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/*********  Appbar:  *********/}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <div style={{flexGrow: 1, display: 'flex', justifyItems: 'start'}} >
            <ImageRounded fontSize='large' />
          </div>
          <div style={{display: 'flex' }}>
              <div style={{display: 'flex', flexDirection:'column', alignItems: 'end', paddingRight: 5, }} >
                  <Typography variant='body1' >
                      Jana Doe 
                  </Typography>
                  <Typography variant='caption' >
                      Account Settings
                  </Typography>
              </div>
              <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  color="inherit"
              >
                  <AccountCircle />
              </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {/*********  Side Menu Drawer:  *********/}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {drawerItemList.map((item, index: number) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block', mb: 2, border: open && index === 0 ? borderStyle : 'thin solid white', }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  py: 1.25,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                    {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0,}} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>        
      </Drawer>
      {/*************  Main Routed Components: **************/}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/device/:id" element={<SensorDetailsScreen />} />
            <Route path="/edit/:id" element={<AddOREditSensorScreen />} />
            <Route path="/add-sensor" element={<AddOREditSensorScreen /> } />
        </Routes>

      </Box>
    </Box>
  );
}
