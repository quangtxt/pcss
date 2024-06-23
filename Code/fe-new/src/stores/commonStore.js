import { action, observable } from "mobx";
import date_utils from "../date_utils";

class CommonStore {
  /** Page name management */
  @observable pageName = [];
  @action setPage = (pageName) => {
    this.pageName = pageName;
  };

  /** App theme */
  @observable appTheme = {
    name: "blue",
    solidColor: "#1890FF",
    solidLightColor: "#1890FF",
    gradientColor: "#1890FF",
  };

  @observable openedSubMenu = [];
  @action setOpenedSubMenu = (keys) => {
    this.openedSubMenu = keys;
  };

  /** Sidebar */
  @observable isSidebarCollapsed = false;
  @action toggleCollapsedSidebar = (state) => {
    this.isSidebarCollapsed = state;
  };

  /** Mouse Cordinate */
  @observable mouseCordinate = { x: 0, y: 0 };

  @action setMouseCordinate = (e) => {
    this.mouseCordinate.x = e.clientX;
    this.mouseCordinate.y = e.clientY;
  };

  @action clearMouseCordinate = (e) => {
    this.mouseCordinate = { x: 0, y: 0 };
  };

  /** Clear data */
  @action clearStore = () => {
    this.pageName.length = 0;
    this.isSidebarCollapsed = false;
    this.mouseCordinate = { x: 0, y: 0 };
  };

  @observable weekChange = date_utils.weekRange(date_utils.current());

  @action setWeekChange = (weekChange) => {
    this.weekChange = weekChange;
  };

  @observable collapsedMenu = true;

  @action setCollapsedMenu = () => {
    this.collapsedMenu = !this.collapsedMenu;
  };
}

export default new CommonStore();
