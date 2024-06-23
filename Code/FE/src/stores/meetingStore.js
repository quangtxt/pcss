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

  @action createMeeting = (listMeetings) => {
    return new Promise((resolve, reject) => {
      MeetingRequest.createMeeting(listMeetings)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };

  @action createNote = (meetingId, title, content) => {
    return new Promise((resolve, reject) => {
      MeetingRequest.createNote(meetingId, title, content)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  @action getNoteListByMeeting = (meetingId) => {
    return new Promise((resolve, reject) => {
      MeetingRequest.getNoteListByMeeting(meetingId)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  @action updateMeeting = (listMeetings) => {
    return new Promise((resolve, reject) => {
      MeetingRequest.updateMeeting(listMeetings)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  @action deleteMeeting = (meetingId) => {
    return new Promise((resolve, reject) => {
      MeetingRequest.deleteMeeting(meetingId)
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
  };
}

export default new MeetingStore();
