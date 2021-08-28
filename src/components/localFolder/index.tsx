import React, { useEffect, useState } from 'react';
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

interface Props {
  handleCurrentFolderChange: (folder: string) => void;
}

const LocalFolder = ({ handleCurrentFolderChange }: Props) => {
  const classes = useStyles();
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const fileDirectory = ipcRenderer.sendSync('sync-local-repository', '');
    setFolders(fileDirectory.split(','));
  }, []);

  return (
    <List className={classes.menuContainer}>
      <ListSubheader inset>Local Folders</ListSubheader>
      {folders.map((folder) => {
        return (
          <ListItem
            button
            key={folder}
            onClick={() => handleCurrentFolderChange(folder)}
          >
            <ListItemText primary={folder} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default LocalFolder;
