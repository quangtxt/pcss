import { action } from "mobx";

class CommonServiceStore {
  @action reportBug = (payload) => {
    return new Promise((resolve, reject) => {});
  };
}

export default new CommonServiceStore();
