import { toJS } from "mobx";
import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { Menu, MenuItem } from "../../../core/router/menu";

export class SideBarMenu {
  menu: Menu = new Menu();
  constructor() {}

  addMenu = (menuItem: MenuItem) => {
    this.menu.addMenu(menuItem);
  };

  renderMenu = () => {
    console.log("renderMenu: ", toJS(this.menu.getMenuList()));
    return (
      <ul>
        {this.menu.getMenuList().map((menu, index) => (
          <li key={index}>
            <Link to={menu.path}>{menu.name}</Link>
          </li>
        ))}
      </ul>
    );
  };

  renderView = () => {
    console.log("renderView: ", toJS(this.menu.getRouterList()));
    return (
      <Switch>
        {this.menu.getRouterList().map((route, index) => (
          <Route key={index} path={route.path} exact>
            {route.view}
          </Route>
        ))}
      </Switch>
    );
  };
}

export default new SideBarMenu();
