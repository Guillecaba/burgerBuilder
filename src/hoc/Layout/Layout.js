import React, { Component } from "react";

import classes from "./Layout.css";
import Auxi from "../Auxi/Auxi";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false })
  }

  sideToggleClosedHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    })
  }

  render() {
    return (
      <Auxi>
        <Toolbar drawerToggleClick={this.sideToggleClosedHandler} />
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
        <main className={classes.Content}>{this.props.children}</main>
      </Auxi>
    );
  }
}

export default Layout;
