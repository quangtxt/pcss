package com.pcms.be.service;

import com.pcms.be.domain.user.Student;
import com.pcms.be.pojo.DTO.MentorDTO;
import com.pcms.be.pojo.DTO.StudentDTO;
import com.pcms.be.pojo.StudentResponse;
import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.request.AddMentorRequest;
import com.pcms.be.pojo.request.AddStudentRequest;
import com.pcms.be.pojo.request.EditStudentProfileRequest;
import com.pcms.be.pojo.response.StudentProfileResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface StudentService {
    List<StudentResponse> getAllStudentToInvite();
    StudentProfileResponse getStudentProfile(int Id) throws ServiceException;
    StudentProfileResponse editStudentProfile(EditStudentProfileRequest editStudentProfileRequest) throws ServiceException;
    public ResponseEntity<String> checkFormatExcel_Student(MultipartFile file) throws ServiceException;
    public ResponseEntity<StudentDTO> addStudent(AddStudentRequest addStudentRequest) throws ServiceException;
    public ResponseEntity<String> addStudentsByExcel(MultipartFile file);
    ResponseEntity<Map<String, Object>> getListStudent(Pageable pageable);

}
