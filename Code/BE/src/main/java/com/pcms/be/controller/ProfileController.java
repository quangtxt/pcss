package com.pcms.be.controller;

import com.pcms.be.errors.ApiException;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.request.EditSupervisorProfileRequest;
import com.pcms.be.pojo.request.EditStudentProfileRequest;
import com.pcms.be.pojo.response.SupervisorProfileResponse;
import com.pcms.be.pojo.response.StudentProfileResponse;
import com.pcms.be.service.SupervisorService;
import com.pcms.be.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/profile")
public class ProfileController {
    @Autowired
    private StudentService studentService;
    @Autowired
    private SupervisorService supervisorService;
    @GetMapping("/student")
    public ResponseEntity<StudentProfileResponse> getStudentInformation(@RequestParam int Id) throws ServiceException {
        try {
            return ResponseEntity.ok(studentService.getStudentProfile(Id));
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @PostMapping("/update/student")
    public ResponseEntity<StudentProfileResponse> updateStudentProfile(@RequestBody EditStudentProfileRequest editStudentProfileRequest){
        try {
            return ResponseEntity.ok(studentService.editStudentProfile(editStudentProfileRequest));
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @GetMapping("/supervisor")
    public ResponseEntity<SupervisorProfileResponse> getSupervisorInformation(@RequestParam int Id) throws ServiceException {
        try {
            return ResponseEntity.ok(supervisorService.getSupervisorProfile(Id));
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @PostMapping("/update/supervisor")
    public ResponseEntity<SupervisorProfileResponse> updateSupervisorProfile(@RequestBody EditSupervisorProfileRequest editSupervisorProfileRequest){
        try {
            return ResponseEntity.ok(supervisorService.editSupervisorProfile(editSupervisorProfileRequest));
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
}
