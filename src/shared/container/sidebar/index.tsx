import { toJS } from "mobx";
import React from "react";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import { Menu, MenuItem } from "../../../core/router/menu";

export class SideBarMenu {
  menu: Menu = new Menu();

  addMenu = (menuItem: MenuItem) => {
    this.menu.addMenu(menuItem);
  };

  setRoot = () => {};

  renderMenu = () => {
    console.log("renderMenu: ", toJS(this.menu.menuList));
    return (
      <ul>
        {this.menu.menuList.map((menu, index) => (
          <li key={index}>
            <Link to={menu.path}>{menu.name}</Link>
          </li>
        ))}
      </ul>
    );
  };

  renderView = () => {
    console.log("renderView: ", toJS(this.menu.routerList));
    let rootPath = this.menu.rootPath;
    let rootIndex = 0;
    if (rootPath === "") {
      rootPath = this.menu.routerList[0].path;
    } else {
      rootIndex = this.menu.routerList.findIndex(
        (item) => item.path === rootPath
      );
    }

    console.log("renderView: ", rootPath, rootIndex);

    return (
      <Switch>
        {this.menu.routerList.map((route, index) => (
          <Route key={index} path={route.path} exact={index === rootIndex}>
            {route.view}
          </Route>
        ))}
        <Route path="*">
          <Redirect to={{ pathname: rootPath }} />
        </Route>
      </Switch>
    );
  };
}

export default new SideBarMenu();
