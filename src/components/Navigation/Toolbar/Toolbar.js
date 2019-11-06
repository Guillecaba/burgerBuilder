import React from "react";

import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToogle from "../../Navigation/SideDrawer/DrawerToogle/DrawerToogle"

const toolbar = props => (
  <header className={classes.Toolbar}>
    <DrawerToogle clicked = { props.drawerToggleClick } />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className = {classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
