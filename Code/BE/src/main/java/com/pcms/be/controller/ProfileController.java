package com.pcms.be.controller;

import com.pcms.be.domain.user.Student;
import com.pcms.be.errors.ApiException;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.request.EditMentorProfileRequest;
import com.pcms.be.pojo.request.EditStudentProfileRequest;
import com.pcms.be.pojo.response.MentorProfileResponse;
import com.pcms.be.pojo.response.StudentProfileResponse;
import com.pcms.be.service.MentorService;
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
    private MentorService mentorService;
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

    @GetMapping("/mentor")
    public ResponseEntity<MentorProfileResponse> getMentorInformation(@RequestParam int Id) throws ServiceException {
        try {
            return ResponseEntity.ok(mentorService.getMentorProfile(Id));
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @PostMapping("/update/mentor")
    public ResponseEntity<MentorProfileResponse> updateMentorProfile(@RequestBody EditMentorProfileRequest editMentorProfileRequest){
        try {
            return ResponseEntity.ok(mentorService.editMentorProfile(editMentorProfileRequest));
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
}
