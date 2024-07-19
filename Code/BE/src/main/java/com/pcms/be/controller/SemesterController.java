package com.pcms.be.controller;

import com.pcms.be.errors.ApiException;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.DTO.MilestoneDTO;
import com.pcms.be.pojo.DTO.SemesterDTO;
import com.pcms.be.pojo.request.*;
import com.pcms.be.service.MilestoneService;
import com.pcms.be.service.ScheduleTaskService.ScheduleTaskService;
import com.pcms.be.service.SemesterService;
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
    private MilestoneService milestoneService;

    @Autowired
    private ScheduleTaskService scheduleTaskService;

    @GetMapping("/gets")//Lấy list danh sách tất cả các Semester
    public ResponseEntity<List<SemesterDTO>> getSemesters(){
        return semesterService.getAll();
    }

    @GetMapping("/get")//Lấy semester theo id
    public ResponseEntity<SemesterDTO> getSemester(@RequestParam int id){
        return semesterService.getById(id);
    }

    @GetMapping("/phase/milestone/get")// Lấy milestone theo id
    public ResponseEntity<MilestoneDTO> getMilestone(@RequestParam int id){
        return milestoneService.getById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createdSemester2(@RequestBody CreateSemesterRequest createdSemesterRequest) throws ServiceException {
        try {
            return semesterService.createSemester(createdSemesterRequest);
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
//    @PostMapping("/phase/milestone/created")
//    public ResponseEntity<String> createdMilestone(@RequestBody CreatedMilestoneRequest createdMilestoneRequest) throws ServiceException{
//        try {
//            return milestoneService.createdMileStone(createdMilestoneRequest);
//        } catch (ServiceException e) {
//            throw new ApiException(e.getErrorCode(), e.getParams());
//        }
//    }
//
//    @PostMapping("/phase/milestone/edit")
//    public ResponseEntity<String> editMilestone(@RequestBody EditMilestoneRequest editMilestoneRequest) throws ServiceException{
//        try {
//            return milestoneService.editMilestone(editMilestoneRequest);
//        } catch (ServiceException e) {
//            throw new ApiException(e.getErrorCode(), e.getParams());
//        }
//    }


}
