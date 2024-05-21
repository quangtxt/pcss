package com.pcms.be.controller;

import com.pcms.be.service.StaffService;
import org.checkerframework.common.reflection.qual.GetMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/staff")
public class StaffController {
    @Autowired
    private StaffService staffService;
    @PostMapping("/addStudents")
    public ResponseEntity<String> addListStudentByExcel(@RequestParam("file") MultipartFile file ){
        return staffService.addUserByExcel(file);
    }
}
