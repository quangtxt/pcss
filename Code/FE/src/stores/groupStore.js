import { action, observable, toJS } from "mobx";
import { message } from "antd";
import utils from "../utils";
import { GroupRequest } from "../requests/GroupRequest";

class GroupStore {
  @observable groupInvitation = [];
  @observable groupListTotalCount = 0;
  @observable groupListPageIndex = 0;
  @observable groupListPageSize = 5;
  @observable groupListKeyword = undefined;
  @action createGroup = (
    abbreviations,
    description,
    keywords,
    name,
    vietnameseTitle,
    selectedStudent
  ) => {
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

  @action editGroup = (
    id,
    name,
    description,
    abbreviations,
    vietnameseTitle,
    keywords
  ) => {
    return new Promise((resolve, reject) => {
      GroupRequest.editGroup(
        id,
        name,
        description,
        abbreviations,
        vietnameseTitle,
        keywords
      )
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
  @action getGroupOfSupervisorBySemester = (semesterId) => {
    return new Promise((resolve, reject) => {
      GroupRequest.getGroupOfSupervisorBySemester(semesterId)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  @action getGroupByGroupId = (id) => {
    return new Promise((resolve, reject) => {
      GroupRequest.getGroupByGroupId(id)
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
  @action submitGroup = (groupId, supervisorIds) => {
    return new Promise((resolve, reject) => {
      GroupRequest.submitGroup(groupId, supervisorIds)
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
  @action getGroupList = () => {
    return new Promise((resolve, reject) => {
      GroupRequest.getGroupList(this.groupListPageSize, this.groupListPageIndex)
        .then((response) => {
          this.groupListTotalCount = response.data.totalCount;
          this.groupList = response.data.data;
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  @action getGroupInvitation = () => {
    return new Promise((resolve, reject) => {
      GroupRequest.getGroupInvitation()
        .then((response) => {
          this.groupInvitation = response.data;
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  @action clearStore = () => {
    this.groupInvitation = [];
    this.groupList = [];
    this.groupListPageIndex = 0;
    this.groupListPageSize = 5;
    this.groupListTotalCount = 0;
    this.groupListKeyword = undefined;
  };

  @action updateGroupSupervisorStatus = (id, status) => {
    return new Promise((resolve, reject) => {
      GroupRequest.updateGroupSupervisorStatus(id, status)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  @action getGroupsOfSupervisor = () => {
    return new Promise((resolve, reject) => {
      GroupRequest.getGroupsOfSupervisor()
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
