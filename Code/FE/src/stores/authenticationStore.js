import { action, autorun, computed, observable } from "mobx";
import { AuthenticationRequest } from "../requests/AuthenticationRequest";
import {
  DDPV,
  DIGITAL_SIGN,
  EOFFICE_ADMIN,
  EOFFICE_CLERICAL,
  EOFFICE_LEADER,
  EOFFICE_SECRETARY,
} from "../constants";

class AuthenticationStore {
  constructor() {
    autorun(() => {
      this.isAccountAdmin = this.checkAccountAdmin; //admin vpdt
      this.isSuperAdmin = this.checkSuperAdmin;
      this.digitalSign = this.checkDigitalSign;
      this.isEOfficeSecretary = this.checkEOfficeSecretary;
      this.isCheckDDPV = this.checkDDPV;
    });
  }

  // ROLES
  // 0: {id: 5, name: "SUPER_ADMIN", explain: "Super Admin "}
  // 1: {id: 6, name: "EOFFICE_ADMIN", explain: "Admin văn phòng điện tử"}
  // 2: {id: 7, name: "EOFFICE_LEADER", explain: "Lãnh đạo văn phòng điện tử"}
  // 3: {id: 8, name: "EOFFICE_CLERICAL", explain: "Văn thư văn phòng điện tử"}
  // 4: {id: 9, name: "EOFFICE_SECRETARY", explain: "Thư ký văn phòng điện tử"}
  // 5: {id: 10, name: "EOFFICE_USER", explain: "Người dùng văn phòng điện tử"}
  // 6: {id: 11, name: "SR_ADMIN", explain: "Admin báo cáo thông minh"}
  // 7: {id: 12, name: "SR_LEADER", explain: "Lãnh đạo báo cáo thông minh"}
  // 8: {id: 13, name: "SR_CLERICAL", explain: "Văn thư báo cáo thông minh"}
  // 9: {id: 14, name: "SR_SECRETARY", explain: "Thư ký báo cáo thông minh"}
  // 10: {id: 15, name: "SR_USER", explain: "Người dùng báo cáo thông minh"}
  // 11: {id: 16, name: "CEHR_ADMIN", explain: "Admin CeHR"}
  // 12: {id: 17, name: "CEHR_LEADER", explain: "Lãnh đạo CeHR"}
  // 13: {id: 18, name: "CEHR_CLERICAL", explain: "Văn thư CeHR"}
  // 14: {id: 19, name: "CEHR_SECRETARY", explain: "Thư ký CeHR"}
  // 15: {id: 20, name: "CEHR_USER", explain: "Người dùng CeHR"}
  // 16: {id: 21, name: "FB_ADMIN", explain: "Admin tài chính kế toán"}
  // 17: {id: 22, name: "FB_LEADER", explain: "Lãnh đạo tài chính kế toán"}
  // 18: {id: 23, name: "FB_CLERICAL", explain: "Văn thư tài chính kế toán"}
  // 19: {id: 24, name: "FB_SECRETARY", explain: "Thư ký tài chính kế toán"}
  // 20: {id: 25, name: "FB_USER", explain: "Người dùng tài chính kế toán"}
  // 21: {id: 26, name: "OL_ADMIN", explain: "Admin đào tạo trực tuyến"}
  // 22: {id: 27, name: "OL_LEADER", explain: "Lãnh đạo đào tạo trực tuyến"}
  // 23: {id: 28, name: "OL_CLERICAL", explain: "Văn thư đào tạo trực tuyến"}
  // 24: {id: 29, name: "OL_SECRETARY", explain: "Thư ký đào tạo trực tuyến"}
  // 25: {id: 30, name: "OL_USER", explain: "Người dùng đào tạo trực tuyến"}
  // 26: {id: 31, name: "USER", explain: "Người dùng mới"}
  // 27: {id: 32, name: "DIGITAL_SIGN", explain: "Quyền ký số "}

  /** App token */
  @observable appToken = localStorage.getItem("jwt");
  @action setAppToken = (token) => {
    this.appToken = token;
  };

  @observable currentUser = undefined;
  @observable currentUserAvatar = undefined;
  currentCompanyCode = "none";

  @action userLogin = (identifier, password) => {
    return new Promise((resolve, reject) => {
      AuthenticationRequest.userLogin(identifier, password)
        .then((response) => {
          localStorage.setItem(
            "jwt",
            JSON.stringify(response.data.access_token)
          );
          this.setAppToken(JSON.stringify(response.data.access_token));
          this.currentUser = "admin";
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  @action checkCurrentUser = () => {
    return new Promise((resolve, reject) => {
      console.log("token", JSON.parse(this.appToken));
      AuthenticationRequest.checkCurrentUser()
        .then((response) => {
          this.currentUser = response.data;
          const { roles } = response.data;
          console.log("user", response.data);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  @action userLogout = () => {
    this.appToken = undefined;
    this.currentUser = undefined;
    this.currentUserAvatar = undefined;
    localStorage.clear();
  };
}

export default new AuthenticationStore();
