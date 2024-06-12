package com.pcms.be.controller;

import com.pcms.be.domain.Semester;
import com.pcms.be.pojo.request.CreatedSemesterRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/semester")
public class SemesterController {

    @PostMapping("/created")
    public ResponseEntity<Semester> createdSemester(@RequestBody CreatedSemesterRequest createdSemesterRequest){
        return null;
    }
}
