import axios from "axios";
import { apiUrl, oauth } from "../config";
import authenticationStore from "../stores/authenticationStore";

export const GroupRequest = {
  createGroup: (abbreviations, description, keywords, name, vietnameseTitle) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/group/create`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      data: {
        abbreviations: abbreviations,
        description: description,
        keywords: keywords,
        name: name,
        vietnameseTitle: vietnameseTitle,
        listUserID: [],
      },
    }),
};
