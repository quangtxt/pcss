package com.pcms.be.controller;

import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ApiException;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.DTO.MentorDTO;
import com.pcms.be.pojo.DTO.StudentDTO;
import com.pcms.be.pojo.request.AddMentorRequest;
import com.pcms.be.pojo.request.AddStudentRequest;
import com.pcms.be.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/staff")
public class StaffController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/checkFormatStudentsExcel")//done
    public  ResponseEntity<String> checkFormatExcel_Students(@RequestParam("file") MultipartFile file) throws ServiceException {
        try {
            return studentService.checkFormatExcel_Student(file);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
    @PostMapping("/addStudent")
    public ResponseEntity<StudentDTO> addStudent(@RequestBody AddStudentRequest addStudentRequest) throws ServiceException {
        try {
            return studentService.addStudent(addStudentRequest);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
    @PostMapping("/addStudents")//done
    public ResponseEntity<String> addListStudentByExcel(@RequestParam("file") MultipartFile file){
        return studentService.addStudentsByExcel(file);
    }

    @GetMapping("/checkFormatMentorsExcel")//done
    public  ResponseEntity<String> checkFormatExcel_Mentors(@RequestParam("file") MultipartFile file) throws ServiceException {
        try {
            return studentService.checkFormatExcel_Mentor(file);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
    @PostMapping("/addMentor")
    public ResponseEntity<MentorDTO> addMentor(@RequestBody AddMentorRequest addMentorRequest) throws ServiceException {
        try {
            return studentService.addMentor(addMentorRequest);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
    @PostMapping("/addMentors")//done
    public ResponseEntity<String> addListMentorByExcel(@RequestParam("file") MultipartFile file){
        return studentService.addMentorsByExcel(file);
    }

    @PostMapping("/student/automatically-sort")
    public ResponseEntity<String> automaticallySortStudentNoneGroup(){
        return null;
    }
}
