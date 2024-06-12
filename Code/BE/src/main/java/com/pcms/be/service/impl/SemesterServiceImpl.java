package com.pcms.be.service.impl;

import com.pcms.be.domain.Semester;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.functions.ValidateData;
import com.pcms.be.pojo.request.CreatedSemesterRequest;
import com.pcms.be.repository.SemesterRepository;
import com.pcms.be.service.SemesterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

@RequiredArgsConstructor
@Service
public class SemesterServiceImpl implements SemesterService {
    private final SemesterRepository semesterRepository;
    private final ValidateData validateData;
    @Override
    @Transactional
    public ResponseEntity<String> createdSemester(CreatedSemesterRequest createdSemesterRequest) throws ServiceException {
        try {
        if (validateData.isOffsetDateTimeValid(createdSemesterRequest.beginAt)
        && validateData.isOffsetDateTimeValid(createdSemesterRequest.endAt)){
            throw new ServiceException(ErrorCode.INCORRECT_FORMAT_DATA_OFFSETDATETIME);
        } else if (semesterRepository.findByName(createdSemesterRequest.getName()).isPresent()){
            throw new ServiceException(ErrorCode.SEMESTER_HAS_THE_SAME_NAME);
        } else if (semesterRepository.findByCode(createdSemesterRequest.getCode()).isPresent()){
            throw new ServiceException(ErrorCode.SEMESTER_HAS_THE_SAME_CODE);
        } else if (semesterRepository.findByOffsetDateTimeValid(createdSemesterRequest.beginAt, createdSemesterRequest.endAt).isPresent()){
            throw new ServiceException(ErrorCode.SEMESTER_ON_THE_SAME_DATE_WITH);
        }else {
            Semester semester = new Semester();
            semester.setName(createdSemesterRequest.getName());
            semester.setCode(createdSemesterRequest.getCode());
            semester.setBeginAt(createdSemesterRequest.getBeginAt());
            semester.setEndAt(createdSemesterRequest.getEndAt());
            semesterRepository.save(semester);
            return null;
        }
        }  catch (ServiceException e) {
            throw new RuntimeException(e);
        }

    }
}
