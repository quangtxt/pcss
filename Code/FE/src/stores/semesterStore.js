import { action, observable, toJS } from "mobx";
import { SemesterRequest } from "../requests/SemesterRequest";
import { message } from "antd";
import utils from "../utils";

class SemesterStore {
  /** Get mentors list */
  @observable semesterList = [];
  // @observable mentorListTotalCount = 0;
  // @observable mentorListPageIndex = 0;
  // @observable mentorListPageSize = 5;
  // @observable mentorListKeyword = undefined;
  // @observable selectGroupData = [];
  // @observable groupList = [];
  // @action setSelectGroupData = (payloadSelect) => {
  //   this.selectGroupData = payloadSelect;
  // };
  // @action clearSelectGroupData = () => {
  //   this.selectGroupData = [];
  // };

  @action getSemesters = () => {
    return new Promise((resolve, reject) => {
      SemesterRequest.getSemesters()
        .then((response) => {
          this.semesterList = response.data.data;
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  @action createSemester = (code, name, begin_at, end_at, list_phase) => {
    return new Promise((resolve, reject) => {
      SemesterRequest.createSemester(code, name, begin_at, end_at, list_phase)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  @action createSemester2 = (semester) => {
    return new Promise((resolve, reject) => {
      SemesterRequest.createSemester2(semester)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  @action getMilestoneTemplate = () => {
    return new Promise((resolve, reject) => {
      SemesterRequest.getMilestoneTemplate()
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  @action getMilestoneGuidancePhase = (id) => {
    return new Promise((resolve, reject) => {
      SemesterRequest.getMilestoneGuidancePhase(id)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  /** Clear store */
  @action clearStore = () => {
    this.semesterList = [];
  };
}

export default new SemesterStore();
