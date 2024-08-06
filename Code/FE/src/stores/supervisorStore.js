import { action, observable, toJS } from "mobx";
import { SupervisorRequest } from "../requests/SupervisorRequest";
import { message } from "antd";
import utils from "../utils";

class SupervisorStore {
  /** Get supervisors list */
  @observable supervisorList = [];
  @observable supervisorListTotalCount = 0;
  @observable supervisorListPageIndex = 0;
  @observable supervisorListPageSize = 5;
  @observable supervisorListKeyword = undefined;
  @observable selectGroupData = [];
  @observable groupList = [];
  @action setSelectGroupData = (payloadSelect) => {
    this.selectGroupData = payloadSelect;
  };
  @action clearSelectGroupData = () => {
    this.selectGroupData = [];
  };

  @action getSupervisorList = () => {
    return new Promise((resolve, reject) => {
      SupervisorRequest.getSupervisorList(
        this.supervisorListPageSize,
        this.supervisorListPageIndex,
        this.supervisorListKeyword
      )
        .then((response) => {
          this.supervisorListTotalCount = response.data.totalCount;
          this.supervisorList = response.data.data;
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  @action getSupervisorProfileById = (supervisorId) => {
    return new Promise((resolve, reject) => {
      SupervisorRequest.getSupervisorProfileById(supervisorId)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  @action getGroupSupervisorRegistered = () => {
    return new Promise((resolve, reject) => {
      SupervisorRequest.getGroupSupervisorRegistered()
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  @action createSupervisor = (
    fullName,
    gender,
    branch,
    parentDepartment,
    childDepartment,
    jobTitle,
    fptEmail,
    fuEmail,
    phone,
    contractType
  ) => {
    return new Promise((resolve, reject) => {
      SupervisorRequest.createSupervisor(
        fullName,
        gender,
        branch,
        parentDepartment,
        childDepartment,
        jobTitle,
        fptEmail,
        fuEmail,
        phone,
        contractType
      )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  @action setFilter = (filterName, filterValue) => {
    if (typeof filterName !== "string") return;
    this[filterName] = filterValue;
  };

  @action changeSupervisorListKeyword = (keyword) => {
    this.supervisorListPageIndex = 0;
    this.supervisorListKeyword = keyword && keyword.trim();
  };
  @action changeSupervisorListPageIndex = (pageIndex) => {
    this.supervisorListPageIndex = pageIndex;
  };
  @action changeSupervisorListPageSize = (pageSize) => {
    this.supervisorListPageSize = pageSize;
  };
  /** Selected supervisor */
  @observable selectedSupervisor = {};
  @action setSelectedSupervisor = (supervisorInfo) => {
    this.selectedSupervisor = supervisorInfo;
  };
  @action updateSelectedSupervisor = (key, val) => {
    this.selectedSupervisor[key] = val;
  };
  @action clearSelectedSupervisor = () => {
    this.selectedSupervisor = {};
  };

  /** Clear store */
  @action clearStore = () => {
    this.supervisorList = [];
    this.supervisorListPageIndex = 0;
    this.supervisorListPageSize = 5;
    this.supervisorListTotalCount = 0;
    this.supervisorListKeyword = undefined;
    this.selectedSupervisor = {};
  };
}

export default new SupervisorStore();
