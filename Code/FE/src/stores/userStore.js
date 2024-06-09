import { action, observable, toJS } from "mobx";
import { UserRequest } from "../requests/UserRequest";
import { message } from "antd";
import utils from "../utils";

class UserStore {
  
  /** Get users list */
  @action clearStore = () => {
    console.log("clearStore userStore");
  };
}

export default new UserStore();
