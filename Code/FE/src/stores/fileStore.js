import { action, observable } from "mobx";
// Request
import { FileRequest } from "../requests/FileRequest";
import loadingAnimationStore from "./loadingAnimationStore";
import FileDownload from "js-file-download";
import { message } from "antd";

class FileStore {
  @observable documentAttachment = undefined;

  @action clearDocumentAttachment = () => {
    this.documentAttachment = undefined;
  };

  /** File upload */
  @action uploadFile = (formData) => {
    return new Promise((resolve, reject) => {
      FileRequest.uploadFile(formData)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  @action downloadAttachment = (file_id) => {
    return new Promise((resolve, reject) => {
      FileRequest.downloadAttachment(file_id)
        .then((response) => {
          this.documentAttachment = response.data;
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  @action downloadFile = (file_id) => {
    return new Promise((resolve, reject) => {
      FileRequest.downloadAttachment(file_id)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  @action renameFile = (file_id, file_name) => {
    return new Promise((resolve, reject) => {
      FileRequest.renameFile(file_id, file_name)
        .then((response) => resolve(response))
        .catch((error) => reject(error));
    });
  };

  @action uploadExcel = (formData) => {
    return new Promise((resolve, reject) => {
      FileRequest.uploadExcel(formData)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  @action sendDataExcel = (formData) => {
    return new Promise((resolve, reject) => {
      FileRequest.sendDataExcel(formData)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  @action createUsersFromExcel = (userInfo) => {
    return new Promise((resolve, reject) => {
      FileRequest.createUsersFromExcel(userInfo)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          message.error(error.vi);
          reject(error);
        });
    });
  };
  @action downloadTemplateAccount = () => {
    return new Promise((resolve, reject) => {
      FileRequest.downloadTemplateAccount()
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
