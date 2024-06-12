package com.pcms.be.controller;

import com.pcms.be.domain.Milestone;
import com.pcms.be.domain.SpecificMajor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/milestones")
public class MilestoneController {


    @PostMapping("/created")
    public ResponseEntity<Milestone> createdMilestone(@RequestBody List<Milestone> milestones){
        return null;
    }
}
