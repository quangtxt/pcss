import { action, autorun, computed, observable } from "mobx";
import { AuthenticationRequest } from "../requests/AuthenticationRequest";
class AuthenticationStore {
  constructor() {
    autorun(() => {
      this.isAccountAdmin = this.checkAccountAdmin; //admin vpdt
      this.isMentor = this.checkMentor;
      this.isStudent = this.checkStudent;
      this.isStaff = this.checkStaff;
    });
  }

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
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  @action userLoginWithGoogle = (email, campus) => {
    return new Promise((resolve, reject) => {
      AuthenticationRequest.userLoginWithGoogle(email, campus)
        .then((response) => {
          localStorage.setItem(
            "jwt",
            JSON.stringify(response.data.access_token)
          );
          this.appToken = JSON.stringify(response.data.access_token);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  @action checkCurrentUser = () => {
    return new Promise((resolve, reject) => {
      AuthenticationRequest.checkCurrentUser()
        .then((response) => {
          this.currentUser = response.data;
          const { roles } = response.data;
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
  @observable isAccountAdmin = undefined;

  @computed get checkAccountAdmin() {
    return this.currentUser && this.currentUser.is_admin === true;
  }
  @observable isMentor = undefined;

  @computed get checkMentor() {
    return (
      this.currentUser &&
      this.currentUser.roles.some((role) => role.name.includes("MENTOR"))
    );
  }
  @observable isStudent = undefined;

  @computed get checkStudent() {
    return (
      this.currentUser &&
      this.currentUser.roles.some((role) => role.name.includes("STUDENT"))
    );
  }
  @observable isStaff = undefined;

  @computed get checkStaff() {
    return (
      this.currentUser &&
      this.currentUser.roles.some((role) => role.name.includes("STAFF"))
    );
  }
}

export default new AuthenticationStore();
