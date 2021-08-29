import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import manualList from './list';

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
  handleCurrentManualURLChange: (url: string) => void;
}

const ManualList = ({ handleCurrentManualURLChange }: Props) => {
  const classes = useStyles();
  // eslint-disable-next-line
  const [manuals, setManuals] = useState(manualList);

  return (
    <List className={classes.menuContainer}>
      <ListSubheader inset>Manuals</ListSubheader>
      {manuals.map((manual) => {
        return (
          <ListItem
            button
            key={manual.name}
            onClick={() => handleCurrentManualURLChange(manual.url)}
          >
            <ListItemText primary={manual.name} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default ManualList;
