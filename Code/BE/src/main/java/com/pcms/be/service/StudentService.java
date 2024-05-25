package com.pcms.be.service;

import com.pcms.be.domain.user.Student;
import com.pcms.be.pojo.StudentResponse;

import java.util.List;

public interface StudentService {
    List<StudentResponse> getAllStudentToInvite();
}
