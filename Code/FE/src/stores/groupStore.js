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
    vietnameseTitle,
    selectedStudent
  ) => {
    console.log("selectedStudent", selectedStudent);

    return new Promise((resolve, reject) => {
      GroupRequest.createGroup(
        abbreviations,
        description,
        keywords,
        name,
        vietnameseTitle,
        selectedStudent
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
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  @action getGroupByMemberId = () => {
    return new Promise((resolve, reject) => {
      GroupRequest.getGroupByMemberId()
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  @action updateInvitationStatus = (groupId, status, studentId) => {
    return new Promise((resolve, reject) => {
      GroupRequest.updateInvitationStatus(groupId, status, studentId)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  @action inviteMember = (groupId, listStudentID) => {
    return new Promise((resolve, reject) => {
      GroupRequest.inviteMember(groupId, listStudentID)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  @action updateStatus = (groupId, status, studentId) => {
    return new Promise((resolve, reject) => {
      GroupRequest.updateStatus(groupId, status, studentId)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  @action empowerOwner = (groupId, studentId) => {
    return new Promise((resolve, reject) => {
      GroupRequest.empowerOwner(groupId, studentId)
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
