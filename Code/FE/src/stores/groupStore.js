import { action, observable, toJS } from "mobx";
import { message } from "antd";
import utils from "../utils";
import { GroupRequest } from "../requests/GroupRequest";

class GroupStore {
  @observable groupInvitation = [];
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

  @action editGroup = (
    groupId,
    abbreviations,
    description,
    keywords,
    name,
    vietnameseTitle
    vietnameseTitle
  ) => {
    return new Promise((resolve, reject) => {
      console.log(
        "editGroup",
        groupId,
        abbreviations,
        name,
        vietnameseTitle,
        keywords,
        description
      );
      GroupRequest.editGroup(
        groupId,
        abbreviations,
        description,
        keywords,
        name,
        vietnameseTitle
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
  @action submitGroup = (groupId, mentorIds) => {
    return new Promise((resolve, reject) => {
      GroupRequest.submitGroup(groupId, mentorIds)
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
      GroupRequest.getGroupList(
        this.groupListPageSize,
        this.groupListPageIndex
        // this.groupListKeyword
      )
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
  
  @action updateGroupMentorStatus = (id, status) => {
      return new Promise((resolve, reject) => {
        GroupRequest.updateGroupMentorStatus(id, status)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    };
    @action createNote = (meetingId, title, content) => {
      return new Promise((resolve, reject) => {
        GroupRequest.createNote(meetingId, title, content)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    };
    @action getNoteListByMeeting = (meetingId) => {
      return new Promise((resolve, reject) => {
        GroupRequest.getNoteListByMeeting(meetingId)
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
