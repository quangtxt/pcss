import { action, observable, toJS } from "mobx";
import { message } from "antd";
import utils from "../utils";
import { ScoreRequest } from "../requests/ScoreRequest";

class ScoreStore {
  @action getScoreByGroupIdAndMileStoneId = (groupId, milestoneId) => {
    return new Promise((resolve, reject) => {
      ScoreRequest.getScoreByGroupIdAndMileStoneId(groupId, milestoneId)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  @action getScoreByGroupId = (groupId) => {
    return new Promise((resolve, reject) => {
      ScoreRequest.getScoreByGroupId(groupId)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  @action saveEvaluation = (scoreEvaluateRequests) => {
    return new Promise((resolve, reject) => {
      ScoreRequest.saveEvaluation(scoreEvaluateRequests)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

export default new ScoreStore();
