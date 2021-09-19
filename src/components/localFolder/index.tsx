import React, { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import {
  Repository,
  useRepositoryReducer,
} from '../../hooks/useRepositoryReducer';

const useStyles = makeStyles((theme) => ({
  menuContainer: {
    height: 'calc(100vh - 64px)',
    width: theme.spacing(30),
    borderRight: `1px solid ${theme.palette.divider}`,
    overflow: 'scroll',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    padding: 0,
  },
}));

interface Props {
  handleCurrentRepositoryChange: (repository: Repository) => void;
}

const LocalFolder = ({ handleCurrentRepositoryChange }: Props) => {
  const classes = useStyles();
  const [repositories, repositoriesDispatch] = useRepositoryReducer();

  useEffect(() => {
    repositoriesDispatch({ type: 'fetch' });
  }, []);

  return (
    <List className={classes.menuContainer}>
      <ListSubheader>Local Repository</ListSubheader>
      {repositories.local.map((repository: Repository) => {
        return (
          <ListItem
            button
            key={repository.folderName}
            onClick={() => handleCurrentRepositoryChange(repository)}
          >
            <ListItemText primary={repository.folderName} />
          </ListItem>
        );
      })}
      <ListSubheader>Remote Repository</ListSubheader>
      {repositories.remote.map((repository: Repository) => {
        return (
          <ListItem
            button
            key={repository.folderName}
            onClick={() => handleCurrentRepositoryChange(repository)}
          >
            <ListItemText primary={repository.folderName} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default LocalFolder;
