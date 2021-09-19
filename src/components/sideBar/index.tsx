import React from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { MainListItems, SecondaryListItems } from '../menuItem';

interface Prop {
  handleChangeMenu: (menu: string) => void;
}

const SideBar = ({ handleChangeMenu }: Prop) => {
  return (
    <>
      <List>
        <MainListItems handleChangeMenu={handleChangeMenu} />
      </List>
      <Divider />
      <List>
        <SecondaryListItems handleChangeMenu={handleChangeMenu} />
      </List>
    </>
  );
};

export default SideBar;
