import { action, observable } from "mobx";
import { MeetingRequest } from "../requests/MeetingRequest";

class MeetingStore {
  /** Meeting list */

  @action getListMeeting = (groupId) => {
    return new Promise((resolve, reject) => {
      MeetingRequest.getListMeeting(groupId)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };

  @action getListNotes = (meetingId) => {
    return new Promise((resolve, reject) => {
      MeetingRequest.getListNotes(meetingId)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };

  /** Clear store */
  @action clearStore = () => {
  };
}

export default new MeetingStore();
