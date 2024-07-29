package com.pcms.be.service;

import com.pcms.be.pojo.DTO.ScoreDTO;
import com.pcms.be.pojo.request.ScoreEvaluateRequest;

import java.util.List;

public interface ScoreService {
    List<ScoreDTO> getScoreByGroupIdAndMileStoneId(int groupId,int milestoneId);
    List<ScoreDTO> getScoreByGroupId(int groupId);

    void saveEvaluation(List<ScoreEvaluateRequest> score);
}
