import axios from "axios";
import { apiUrl } from "../config";
import authenticationStore from "../stores/authenticationStore";
import utils from "../utils";

export const ScoreRequest = {
  getScoreByGroupIdAndMileStoneId: (groupId, milestoneId) =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/score/group/milestone`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      params: {
        groupId: groupId,
        milestoneId: milestoneId,
      },
    }),
  getScoreByGroupId: (groupId) =>
    axios({
      method: "get",
      url: `${apiUrl}/api/v1/score/group`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      params: {
        groupId: groupId,
      },
    }),
  saveEvaluation: (scoreEvaluateRequests) =>
    axios({
      method: "post",
      url: `${apiUrl}/api/v1/score`,
      headers: {
        Authorization: `Bearer ${JSON.parse(authenticationStore.appToken)}`,
        "Content-Type": "application/json",
      },
      data: scoreEvaluateRequests,
    }),
};
