import { action, observable } from "mobx";
// Request
import { FileRequest } from "../requests/FileRequest";
import loadingAnimationStore from "./loadingAnimationStore";
import FileDownload from "js-file-download";
import { message } from "antd";

class FileStore {
  @action sendDataExcelStudent = (formData) => {
    return new Promise((resolve, reject) => {
      FileRequest.sendDataExcelStudent(formData)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  @action createStudentsFromExcel = (userInfo) => {
    return new Promise((resolve, reject) => {
      FileRequest.createStudentsFromExcel(userInfo)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          message.error(error.vi);
          reject(error);
        });
    });
  };
  @action downloadTemplateAccountStudent = () => {
    return new Promise((resolve, reject) => {
      FileRequest.downloadTemplateAccountStudent()
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          message.error(error.vi);
          reject(error);
        });
    });
  };
  @action sendDataExcelSupervisor = (formData) => {
    return new Promise((resolve, reject) => {
      FileRequest.sendDataExcelSupervisor(formData)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  @action createSupervisorsFromExcel = (userInfo) => {
    return new Promise((resolve, reject) => {
      FileRequest.createSupervisorsFromExcel(userInfo)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  @action downloadTemplateAccountSupervisor = () => {
    return new Promise((resolve, reject) => {
      FileRequest.downloadTemplateAccountSupervisor()
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          message.error(error.vi);
          reject(error);
        });
    });
  };
  @action sendDataExcelGroup = (formData) => {
    return new Promise((resolve, reject) => {
      FileRequest.sendDataExcelGroup(formData)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  @action createGroupsFromExcel = (userInfo) => {
    return new Promise((resolve, reject) => {
      FileRequest.createGroupsFromExcel(userInfo)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  @action downloadTemplateAccountGroup = () => {
    return new Promise((resolve, reject) => {
      FileRequest.downloadTemplateAccountGroup()
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          message.error(error.vi);
          reject(error);
        });
    });
  };
}

export default new FileStore();
