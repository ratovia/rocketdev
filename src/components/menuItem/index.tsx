import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import GitHubIcon from '@material-ui/icons/GitHub';

interface Props {
  handleChangeMenu: (name: string) => void;
}

type Lists = {
  name: string;
  menuIcons: JSX.Element;
};

const mainMenu: Lists[] = [
  { name: 'Github', menuIcons: <GitHubIcon /> },
  { name: 'Manuals', menuIcons: <LayersIcon /> },
  { name: 'Customers', menuIcons: <PeopleIcon /> },
  { name: 'Reports', menuIcons: <BarChartIcon /> },
  { name: 'Integrations', menuIcons: <LayersIcon /> },
];

const secondaryMenu: Lists[] = [
  { name: 'Memo', menuIcons: <AssignmentIcon /> },
  { name: 'Tasks', menuIcons: <AssignmentIcon /> },
  { name: 'Calender', menuIcons: <AssignmentIcon /> },
];

export const MainListItems = ({ handleChangeMenu }: Props) => {
  return (
    <div>
      {mainMenu.map((menu) => {
        return (
          <ListItem
            key={menu.name}
            button
            onClick={() => handleChangeMenu(menu.name)}
          >
            <ListItemIcon>{menu.menuIcons}</ListItemIcon>
            <ListItemText primary={menu.name} />
          </ListItem>
        );
      })}
    </div>
  );
};

export const SecondaryListItems = ({ handleChangeMenu }: Props) => {
  return (
    <div>
      <ListSubheader inset>Self Management</ListSubheader>
      {secondaryMenu.map((menu) => {
        return (
          <ListItem
            key={menu.name}
            button
            onClick={() => handleChangeMenu(menu.name)}
          >
            <ListItemIcon>{menu.menuIcons}</ListItemIcon>
            <ListItemText primary={menu.name} />
          </ListItem>
        );
      })}
    </div>
  );
};
