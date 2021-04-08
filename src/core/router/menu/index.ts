import { action, observable, makeObservable, toJS } from "mobx";
import coreRouter, { RouterItem } from "..";

export type MenuItem = {
  index: number;
  name: string;
  path: string;
  addToRoot: boolean;
  view?: React.ReactNode;
  icon?: React.ReactNode;
};
export class Menu {
  @observable routerList: RouterItem[] = [];
  @observable menuList: MenuItem[] = [];

  constructor() {
    makeObservable(this);
  }

  @action addMenu = (menu: MenuItem) => {
    console.log("addMenu: ", toJS(this.menuList), toJS(this.routerList));
    if (menu.view) {
      const routerItem = {
        path: menu.path,
        view: menu.view,
      };
      if (menu.addToRoot) {
        coreRouter.addRouter(routerItem);
      } else {
        this.routerList.push(routerItem);
      }
    }

    this.menuList.push(menu);
    console.log("after addMenu: ", toJS(this.menuList), toJS(this.routerList));
  };

  getMenuList = (): MenuItem[] => {
    console.log("getMenuList: ", toJS(this.menuList));
    return this.menuList;
  };

  getRouterList = (): RouterItem[] => {
    console.log("getRouterList: ", toJS(this.routerList));
    return this.routerList;
  };
}

const createNewMenu = () => new Menu();
export default createNewMenu;
