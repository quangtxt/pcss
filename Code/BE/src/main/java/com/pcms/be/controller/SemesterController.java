package com.pcms.be.controller;

import com.pcms.be.domain.Semester;
import com.pcms.be.domain.Submission;
import com.pcms.be.errors.ApiException;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.DTO.CapstonePhaseDTO;
import com.pcms.be.pojo.DTO.MilestoneDTO;
import com.pcms.be.pojo.DTO.SemesterDTO;
import com.pcms.be.pojo.DTO.SubmissionDTO;
import com.pcms.be.pojo.request.*;
import com.pcms.be.service.CapstonePhaseService;
import com.pcms.be.service.MilestoneService;
import com.pcms.be.service.SemesterService;
import com.pcms.be.service.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/semester")
public class SemesterController {

    @Autowired
    private SemesterService semesterService;

    @Autowired
    private CapstonePhaseService capstonePhaseService;
    @Autowired
    private MilestoneService milestoneService;

    @Autowired
    private SubmissionService submissionService;

    @GetMapping("/gets")//Lấy list danh sách tất cả các Semester
    public ResponseEntity<List<SemesterDTO>> getSemesters(){
        return semesterService.getAll();
    }

    @GetMapping("/get")//Lấy semester theo id
    public ResponseEntity<SemesterDTO> getSemester(@RequestParam int id){
        return semesterService.getById(id);
    }


    @GetMapping("/phase/get")//Lấy phase theo id
    public ResponseEntity<CapstonePhaseDTO> getPhase(@RequestParam int id){
        return capstonePhaseService.getById(id);
    }

    @GetMapping("/phase/milestone/get")// Lấy milestone theo id
    public ResponseEntity<MilestoneDTO> getMilestone(@RequestParam int id){
        return milestoneService.getById(id);
    }

    @GetMapping("/phase/milestone/submission/get")//Lấy submission theo id
    public ResponseEntity<SubmissionDTO> getSubmission(@RequestParam int id){
        return submissionService.getById(id);
    }




    @PostMapping("/created")
    public ResponseEntity<String> createdSemester(@RequestBody CreatedSemesterRequest createdSemesterRequest) throws ServiceException {
        try {
            return semesterService.createdSemester(createdSemesterRequest);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
    @PostMapping("/edit")
    public ResponseEntity<String> editSemester(@RequestBody EditSemesterRequest editSemesterRequest) throws ServiceException {
        try {
            return semesterService.editSemester(editSemesterRequest);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
    @PostMapping("/phase/add")
    public ResponseEntity<String> addPhase(@RequestBody AddPhaseRequest addPhaseRequest) throws ServiceException{
        try {
            return capstonePhaseService.addPhase(addPhaseRequest);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @PostMapping("/phase/edit")
    public ResponseEntity<String> editPhase(@RequestBody EditPhaseRequest editPhaseRequest) throws ServiceException{
        try {
            return capstonePhaseService.editPhase(editPhaseRequest);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }


    @PostMapping("/phase/milestone/created")
    public ResponseEntity<String> createdMilestone(@RequestBody CreatedMilestoneRequest createdMilestoneRequest) throws ServiceException{
        try {
            return milestoneService.createdMileStone(createdMilestoneRequest);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @PostMapping("/phase/milestone/edit")
    public ResponseEntity<String> editMilestone(@RequestBody EditMilestoneRequest editMilestoneRequest) throws ServiceException{
        try {
            return milestoneService.editMilestone(editMilestoneRequest);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @PostMapping("/phase/milestone/submission/add")
    public ResponseEntity<String> addSubmission(@RequestBody AddSubmissionRequest addSubmissionRequest) throws ServiceException{
        try {
            return submissionService.addSubmission(addSubmissionRequest);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
    @PostMapping("/phase/milestone/submission/edit")
    public ResponseEntity<String> editSubmission(@RequestBody EditSubmissionRequest editSubmissionRequest) throws ServiceException{
        try {
            return submissionService.editSubmission(editSubmissionRequest);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
}
