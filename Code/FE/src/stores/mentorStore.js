import { action, observable, toJS } from "mobx";
import { MentorRequest } from "../requests/MentorRequest";
import { message } from "antd";
import utils from "../utils";

class MentorStore {
  /** Get mentors list */
  @observable mentorList = [];
  @observable mentorListTotalCount = 0;
  @observable mentorListPageIndex = 0;
  @observable mentorListPageSize = 5;
  @observable mentorListKeyword = undefined;
  @observable selectGroupData = [];
  @observable groupList = [];
  @action setSelectGroupData = (payloadSelect) => {
    this.selectGroupData = payloadSelect;
  };
  @action clearSelectGroupData = () => {
    this.selectGroupData = [];
  };

  @action getMentorList = () => {
    return new Promise((resolve, reject) => {
      MentorRequest.getMentorList(
        this.mentorListPageSize,
        this.mentorListPageIndex,
        this.mentorListKeyword
      )
        .then((response) => {
          this.mentorListTotalCount = response.data.totalCount;
          this.mentorList = response.data.data;
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

  @action changeMentorListKeyword = (keyword) => {
    this.mentorListPageIndex = 0;
    this.mentorListKeyword = keyword && keyword.trim();
  };
  @action changeMentorListPageIndex = (pageIndex) => {
    this.mentorListPageIndex = pageIndex;
  };
  @action changeMentorListPageSize = (pageSize) => {
    this.mentorListPageSize = pageSize;
  };
  /** Selected mentor */
  @observable selectedMentor = {};
  @action setSelectedMentor = (mentorInfo) => {
    this.selectedMentor = mentorInfo;
  };
  @action updateSelectedMentor = (key, val) => {
    this.selectedMentor[key] = val;
  };
  @action clearSelectedMentor = () => {
    this.selectedMentor = {};
  };

  /** Clear store */
  @action clearStore = () => {
    this.mentorList = [];
    this.mentorListPageIndex = 0;
    this.mentorListPageSize = 5;
    this.mentorListTotalCount = 0;
    this.mentorListKeyword = undefined;
    this.selectedMentor = {};
  };
}

export default new MentorStore();
