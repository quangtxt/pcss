import { action, observable, toJS } from "mobx";
import { message } from "antd";
import utils from "../utils";
import { GroupRequest } from "../requests/GroupRequest";

class GroupStore {
  @action createGroup = (
    abbreviations,
    description,
    keywords,
    name,
    vietnameseTitle
  ) => {
    return new Promise((resolve, reject) => {
      GroupRequest.createGroup(
        abbreviations,
        description,
        keywords,
        name,
        vietnameseTitle
      )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  @action getListInvitationToJoinGroup = () => {
    return new Promise((resolve, reject) => {
      GroupRequest.getListInvitationToJoinGroup()
        .then((response) => {
          console.log("res", response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  @action updateInvitationStatus = (groupId, status) => {
    return new Promise((resolve, reject) => {
      GroupRequest.updateInvitationStatus(groupId, status)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}
export default new GroupStore();
