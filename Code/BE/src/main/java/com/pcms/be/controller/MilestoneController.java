package com.pcms.be.controller;

import com.pcms.be.domain.Milestone;
import com.pcms.be.pojo.DTO.SemesterMilestone2DTO;
import com.pcms.be.pojo.response.MilestoneTemplateRp;
import com.pcms.be.repository.MilestoneRepository;
import com.pcms.be.service.MilestoneService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/milestones")
public class MilestoneController {
    private final MilestoneRepository milestoneRepository;
    private final MilestoneService milestoneService;
    private final ModelMapper modelMapper;

    @GetMapping()
    public ResponseEntity<List<MilestoneTemplateRp>> getMilestoneTemplate(){
        List<Milestone> milestones = milestoneRepository.findAll();
        List<MilestoneTemplateRp> milestoneTemplateRps = new ArrayList<>();
        for (Milestone m : milestones
        ) {
            milestoneTemplateRps.add(modelMapper.map(m, MilestoneTemplateRp.class));
        }
       return ResponseEntity.ok(milestoneTemplateRps);
    }
    @GetMapping("/guidance/{id}")
    public ResponseEntity<List<SemesterMilestone2DTO>> getMilestoneGuidancePhase(@PathVariable Long id){
        return ResponseEntity.ok(milestoneService.getMilestoneGuidancePhase(id));
    }

    @GetMapping("/process")
    public ResponseEntity<String> getProcessOfMilestone(@RequestParam int groupId, @RequestParam int milestoneId){
        return milestoneService.getProcessOfMilestone(milestoneId, groupId);
    }
}
