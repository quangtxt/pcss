package com.pcms.be.service.impl;

import com.pcms.be.domain.user.Group;
import com.pcms.be.domain.user.Score;
import com.pcms.be.pojo.DTO.ScoreDTO;
import com.pcms.be.pojo.DTO.SemesterMilestone2DTO;
import com.pcms.be.pojo.request.ScoreEvaluateRequest;
import com.pcms.be.repository.MemberRepository;
import com.pcms.be.repository.MilestoneRepository;
import com.pcms.be.repository.ScoreRepository;
import com.pcms.be.service.ScoreService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ScoreServiceImpl implements ScoreService {
    private final ScoreRepository scoreRepository;
    private final MemberRepository memberRepository;
    private final MilestoneRepository milestoneRepository;
    private final ModelMapper modelMapper;
    @Override
    public List<ScoreDTO> getScoreByGroupIdAndMileStoneId(int groupId, int milestoneId) {
        List<Score> scores = scoreRepository.getScoreByGroupIdAndMileStoneId(groupId,milestoneId);
        List<ScoreDTO> scoreDTOS = scores.stream()
                .map(s -> modelMapper.map(s, ScoreDTO.class))
                .collect(Collectors.toList());
        return scoreDTOS;
    }

    @Override
    public List<ScoreDTO> getScoreByGroupId(int groupId) {
        List<Score> scores = scoreRepository.getScoreByGroupId(groupId);
        List<ScoreDTO> scoreDTOS = scores.stream()
                .map(s -> modelMapper.map(s, ScoreDTO.class))
                .collect(Collectors.toList());
        return scoreDTOS;
    }

    @Transactional
    @Override
    public void saveEvaluation(List<ScoreEvaluateRequest> scoreEvaluateRequests) {
        for (ScoreEvaluateRequest request : scoreEvaluateRequests) {
            Score score = scoreRepository.findByMemberIdAndMilestoneId(request.getMemberId(), request.getMilestoneId())
                    .orElseGet(() -> {
                        Score newScore = new Score();
                        newScore.setMember(memberRepository.findById(request.getMemberId()).orElseThrow());
                        newScore.setMilestone(milestoneRepository.findById(request.getMilestoneId()).orElseThrow());
                        return newScore;
                    });

            score.setScore(request.getScore());
            score.setComment(request.getComment());

            scoreRepository.save(score);
        }
    }
}
