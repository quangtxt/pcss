package com.pcms.be.controller;

import com.pcms.be.pojo.DTO.ScoreDTO;
import com.pcms.be.pojo.request.ScoreEvaluateRequest;
import com.pcms.be.service.ScoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/score")

public class ScoreController {
    private final ScoreService scoreService;
    @GetMapping("/group/milestone")
    public ResponseEntity<List<ScoreDTO>> getScoreByGroupIdAndMileStoneId(
            @RequestParam("groupId") int groupId,
            @RequestParam("milestoneId") int milestoneId) {
        List<ScoreDTO> scores = scoreService.getScoreByGroupIdAndMileStoneId(groupId, milestoneId);
        return ResponseEntity.ok(scores);
    }
    @GetMapping("/group")
    public ResponseEntity<List<ScoreDTO>> getScoreByGroupId(
            @RequestParam("groupId") int groupId) {
        List<ScoreDTO> scores = scoreService.getScoreByGroupId(groupId);
        return ResponseEntity.ok(scores);
    }
    @PostMapping
    public ResponseEntity<Void> saveEvaluation(@RequestBody List<ScoreEvaluateRequest> score) {
        scoreService.saveEvaluation(score);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
