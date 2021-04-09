import { action, observable, makeObservable } from "mobx";
import { RouterItem } from "..";

export type MenuItem = {
  index: number;
  name: string;
  path: string;
  view?: React.ReactNode;
  icon?: React.ReactNode;
};

export class Menu {
  @observable routerList: RouterItem[] = [];
  @observable menuList: MenuItem[] = [];
  rootPath: string = "";

  constructor() {
    makeObservable(this);
  }

  @action addMenu = (menu: MenuItem) => {
    if (this.menuList.find((item) => item.path === menu.path)) {
      console.log("duplicated!");
      return;
    }

    if (menu.view) {
      this.routerList.push({
        path: menu.path,
        view: menu.view,
      });
    }

    this.menuList.push(menu);
  };

  setRootPath = (path: string) => {
    this.rootPath = path;
  };
}
