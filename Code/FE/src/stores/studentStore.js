import { action, observable, toJS } from "mobx";
import { StudentRequest } from "../requests/StudentRequest";
import { message } from "antd";
import utils from "../utils";

class StudentStore {
  /** Get students list */
  @observable studentList = [];
  @observable studentListTotalCount = 0;
  @observable studentListPageIndex = 0;
  @observable studentListPageSize = 5;
  @observable studentListKeyword = undefined;

  @action getStudentList = () => {
    return new Promise((resolve, reject) => {
      StudentRequest.getStudentList(
        this.studentListPageSize,
        this.studentListPageIndex,
        this.studentListKeyword
      )
        .then((response) => {
          this.studentListTotalCount = response.data.totalCount;
          this.studentList = response.data.data;
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  @action getStudentsToInvite = () => {
    return new Promise((resolve, reject) => {
      StudentRequest.getStudentsToInvite()
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

  @action changeStudentListKeyword = (keyword) => {
    this.studentListPageIndex = 0;
    this.studentListKeyword = keyword && keyword.trim();
  };
  @action changeStudentListPageIndex = (pageIndex) => {
    this.studentListPageIndex = pageIndex;
  };
  @action changeStudentListPageSize = (pageSize) => {
    this.studentListPageSize = pageSize;
  };

  /** Clear store */
  @action clearStore = () => {
    this.studentList = [];
    this.studentListPageIndex = 0;
    this.studentListPageSize = 5;
    this.studentListTotalCount = 0;
    this.studentListKeyword = undefined;
  };
}

export default new StudentStore();
