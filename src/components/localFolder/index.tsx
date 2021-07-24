import React, { useEffect } from 'react';
import { ipcRenderer } from 'electron';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles((theme) => ({
  menuContainer: {
    height: 'calc(100vh - 60px)',
    width: theme.spacing(30),
    borderRight: `1px solid ${theme.palette.divider}`,
    overflow: 'scroll',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    padding: 0,
  },
}));

const LocalFolder = () => {
  const classes = useStyles();
  const [folders, setFolders] = React.useState([]);

  useEffect(() => {
    const fileDirectory = ipcRenderer.sendSync('sync-file-directory', '');
    setFolders(fileDirectory.split(','));
  }, []);

  return (
    <List className={classes.menuContainer}>
      <ListSubheader inset>Local Folders</ListSubheader>
      {folders.map((folder, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <ListItem button key={index}>
            <ListItemText primary={folder} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default LocalFolder;
