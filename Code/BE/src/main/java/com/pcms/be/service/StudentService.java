package com.pcms.be.service;

import com.pcms.be.domain.user.Student;
import com.pcms.be.pojo.StudentResponse;
import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.request.EditStudentProfileRequest;
import com.pcms.be.pojo.response.StudentProfileResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface StudentService {
    List<StudentResponse> getAllStudentToInvite();
    StudentProfileResponse getStudentProfile(int Id) throws ServiceException;
    StudentProfileResponse editStudentProfile(EditStudentProfileRequest editStudentProfileRequest) throws ServiceException;
    public Page<User> getListStudentNoneGroup(Pageable pageable);
}
