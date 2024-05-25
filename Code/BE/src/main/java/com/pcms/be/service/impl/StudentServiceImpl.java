package com.pcms.be.service.impl;

import com.pcms.be.domain.user.Student;
import com.pcms.be.pojo.StudentResponse;
import com.pcms.be.repository.StudentRepository;
import com.pcms.be.service.StudentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class StudentServiceImpl implements StudentService {
    private final StudentRepository studentRepository;
    private final ModelMapper modelMapper;
    @Override
    public List<StudentResponse> getAllStudentToInvite() {

            List<Student> listStudentToInvite= studentRepository.findStudentsNotInMemberOrInactive();
            List<StudentResponse> studentResponseList = new ArrayList<>();
            for (Student student: listStudentToInvite) {
                StudentResponse studentResponse = modelMapper.map(student, StudentResponse.class);
                studentResponseList.add(studentResponse);
            }
            return studentResponseList;

    }
}
