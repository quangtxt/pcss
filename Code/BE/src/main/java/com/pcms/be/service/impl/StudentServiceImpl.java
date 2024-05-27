package com.pcms.be.service.impl;

import com.pcms.be.domain.user.Student;
import com.pcms.be.pojo.StudentResponse;
import com.pcms.be.repository.StudentRepository;
import com.pcms.be.service.StudentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.request.EditStudentProfileRequest;
import com.pcms.be.pojo.response.StudentProfileResponse;
import com.pcms.be.repository.SemesterRepository;
import com.pcms.be.repository.StudentRepository;
import com.pcms.be.repository.UserRepository;
import com.pcms.be.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.Optional;
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

//            List<Student> listStudentToInvite= studentRepository.findStudentsNotInMemberOrInactive();
            List<StudentResponse> studentResponseList = new ArrayList<>();
//            for (Student student: listStudentToInvite) {
//                StudentResponse studentResponse = modelMapper.map(student, StudentResponse.class);
//                studentResponseList.add(studentResponse);
//            }
            return studentResponseList;

    }
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SemesterRepository semesterRepository;

    @Override
    public StudentProfileResponse getStudentProfile(int Id) throws ServiceException {
        Optional<User> user = userRepository.findById((long) Id);
        if (user.isEmpty()){
            throw new ServiceException(ErrorCode.USER_NOT_FOUND);
        }else{
            User infoUser = user.orElseThrow();
            if (infoUser.getStudent() == null){
                throw new ServiceException(ErrorCode.AUTHORITY_LEVEL_NOT_FOUND);
            }
            OffsetDateTime now = OffsetDateTime.now();
            StudentProfileResponse studentProfileResponse = new StudentProfileResponse();
            studentProfileResponse.setFullName(infoUser.getName());
            studentProfileResponse.setGender(infoUser.getStudent().isGender());
            studentProfileResponse.setRollNumber(infoUser.getEmail().split("@")[0]);
            studentProfileResponse.setProfession(infoUser.getStudent().getSpecificMajor().getMajor().getName());
            studentProfileResponse.setSpecialty(infoUser.getStudent().getSpecificMajor().getName());
            studentProfileResponse.setSemester(semesterRepository.findByCurrent(now).orElseThrow(null).getName());
            studentProfileResponse.setEmail(infoUser.getEmail());
            studentProfileResponse.setPhone(infoUser.getStudent().getPhone());
            studentProfileResponse.setFacebook(infoUser.getStudent().getFacebook());
            return studentProfileResponse;
        }

    }

    @Override
    public StudentProfileResponse editStudentProfile(EditStudentProfileRequest editStudentProfileRequest) throws ServiceException {
        Optional<User> user = userRepository.findById(editStudentProfileRequest.getUserId());
        if (user.isEmpty()){
            throw new ServiceException(ErrorCode.USER_NOT_FOUND);
        }else{
            User infoUser = user.orElseThrow();
            if (infoUser.getStudent() == null){
                throw new ServiceException(ErrorCode.AUTHORITY_LEVEL_NOT_FOUND);
            }
            infoUser.setName(editStudentProfileRequest.getFullName());
            infoUser.getStudent().setGender(editStudentProfileRequest.isGender());
            infoUser.getStudent().setPhone(editStudentProfileRequest.getPhone());
            infoUser.getStudent().setFacebook(editStudentProfileRequest.getFacebook());
            infoUser.getStudent().setAlternativeEmail(editStudentProfileRequest.getAlternativeEmail());
            infoUser.setEmail(editStudentProfileRequest.getEmail());
            userRepository.save(infoUser);

            OffsetDateTime now = OffsetDateTime.now();
            StudentProfileResponse studentProfileResponse = new StudentProfileResponse();
            studentProfileResponse.setFullName(infoUser.getName());
            studentProfileResponse.setGender(infoUser.getStudent().isGender());
            studentProfileResponse.setRollNumber(infoUser.getEmail().split("@")[0]);
            studentProfileResponse.setProfession(infoUser.getStudent().getSpecificMajor().getMajor().getName());
            studentProfileResponse.setSpecialty(infoUser.getStudent().getSpecificMajor().getName());
            studentProfileResponse.setSemester(semesterRepository.findByCurrent(now).orElseThrow(null).getName());
            studentProfileResponse.setEmail(infoUser.getEmail());
            studentProfileResponse.setPhone(infoUser.getStudent().getPhone());
            studentProfileResponse.setFacebook(infoUser.getStudent().getFacebook());
            return studentProfileResponse;
        }
    }
    @Override
    public Page<User> getListStudentNoneGroup(Pageable pageable) {
        Page<User> listStudent = userRepository.findAllStudentNoneGroup(pageable);
        return userRepository.findAllStudentNoneGroup(pageable);
    }
}
