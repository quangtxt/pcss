package com.pcms.be.controller;

import com.pcms.be.domain.user.Group;
import com.pcms.be.errors.ApiException;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.DTO.SupervisorDTO;
import com.pcms.be.pojo.DTO.StudentDTO;
import com.pcms.be.pojo.request.AddSupervisorRequest;
import com.pcms.be.pojo.request.AddStudentRequest;
import com.pcms.be.pojo.request.SetActiveStudentRequest;
import com.pcms.be.repository.GroupRepository;
import com.pcms.be.repository.MemberRepository;
import com.pcms.be.repository.StudentRepository;
import com.pcms.be.service.GroupService;
import com.pcms.be.service.SupervisorService;
import com.pcms.be.service.NotificationService;
import com.pcms.be.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/staff")
public class StaffController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private SupervisorService supervisorService;
    @Autowired
    private GroupService groupService;

    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private StudentRepository studentRepository;

    @GetMapping("/students")
    public ResponseEntity<Map<String, Object>> getStudents(Pageable pageable,
                                                           @RequestParam(defaultValue = "") String keyword) {
        return studentService.getListStudent(pageable, keyword);
    }
    @GetMapping("/groups")
    public ResponseEntity<Map<String, Object>> getGroups(Pageable pageable,
                                            @RequestParam(defaultValue = "") String keyword){
        return groupService.getGroups(pageable, keyword);
    }
    @PostMapping("/student/is_active")//Can notification
    public ResponseEntity<StudentDTO> setActiveStudent(@RequestBody SetActiveStudentRequest setActiveStudentRequest){
        return studentService.setActiveStudent(setActiveStudentRequest);
    }

    @GetMapping("/checkFormatStudentsExcel")//done
    public  ResponseEntity<String> checkFormatExcel_Students(@RequestParam("file") MultipartFile file) throws ServiceException {
        try {
            return studentService.checkFormatExcel_Student(file);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
    @PostMapping("/addStudent")//done
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

    @GetMapping("/checkFormatSupervisorsExcel")//done
    public  ResponseEntity<String> checkFormatExcel_Supervisors(@RequestParam("file") MultipartFile file) throws ServiceException {
        try {
            return supervisorService.checkFormatExcel_Supervisor(file);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
    @PostMapping("/addSupervisor")//done
    public ResponseEntity<SupervisorDTO> addSupervisor(@RequestBody AddSupervisorRequest addSupervisorRequest) throws ServiceException {
        try {
            return supervisorService.addSupervisor(addSupervisorRequest);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
    @PostMapping("/addSupervisors")//done
    public ResponseEntity<String> addListSupervisorByExcel(@RequestParam("file") MultipartFile file){
        return supervisorService.addSupervisorsByExcel(file);
    }

    @PostMapping("/student/automatically/create/groups")//Can notification
    public ResponseEntity<String> automaticallyCreateGroups() throws ServiceException {
        try {
            return groupService.automaticallyCreateGroups();
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }

    }
    @DeleteMapping("/delete/group")
    public ResponseEntity<String> deleteGroupById(@RequestParam int id){
        Group group = groupRepository.findById(Long.valueOf(id)).orElseThrow();
        groupRepository.delete(group);
        return ResponseEntity.ok("ok");
    }


}
