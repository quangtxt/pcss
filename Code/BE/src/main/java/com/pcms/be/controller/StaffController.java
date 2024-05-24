package com.pcms.be.controller;

import com.pcms.be.errors.ApiException;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/staff")
public class StaffController {
    @Autowired
    private StaffService staffService;

    @GetMapping("/checkFormatStudentsExcel")
    public  ResponseEntity<String> checkFormatExcel_Students(@RequestParam("file") MultipartFile file) throws ServiceException {
        try {
            return staffService.checkFormatExcel_Student(file);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
    @PostMapping("/addStudents")
    public ResponseEntity<String> addListStudentByExcel(@RequestParam("file") MultipartFile file){
        return staffService.addStudentsByExcel(file);
    }

    @GetMapping("/checkFormatMentorsExcel")
    public  ResponseEntity<String> checkFormatExcel_Mentors(@RequestParam("file") MultipartFile file) throws ServiceException {
        try {
            return staffService.checkFormatExcel_Mentor(file);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
    @PostMapping("/addMentors")
    public ResponseEntity<String> addListMentorByExcel(@RequestParam("file") MultipartFile file){
        return staffService.addMentorsByExcel(file);
    }
}
