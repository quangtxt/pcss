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
      SemesterRequest.getSemesters(
      )
        .then((response) => {
          this.semesterList = response.data.data;
          resolve(response);
          console.log("res", response);
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
