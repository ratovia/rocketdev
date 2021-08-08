import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { MainListItems, SecondaryListItems } from '../components/menuItem';
import Header from '../components/header';
import GithubContents from '../components/githubContents';
import ManualContents from '../components/manualContents';

const drawerWidth = 240;
const DEFAULT_CONTENT = 'Github';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: {
    height: 64,
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    padding: 0,
    display: 'flex',
  },
  webview: {
    padding: 0,
    flexGrow: 1,
  },
}));

const Home = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [currentContents, setCurrentContents] = useState(DEFAULT_CONTENT);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleChangeMenu = (menu: string) => {
    setCurrentContents(menu);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems handleChangeMenu={handleChangeMenu} />
        </List>
        <Divider />
        <List>
          <SecondaryListItems handleChangeMenu={handleChangeMenu} />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <div className={classes.container}>
          {currentContents === 'Github' && <GithubContents />}
          {currentContents === 'Manuals' && <ManualContents />}
        </div>
      </main>
    </div>
  );
};

export default Home;
