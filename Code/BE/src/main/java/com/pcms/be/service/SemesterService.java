package com.pcms.be.service;

import com.pcms.be.domain.Semester;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.request.CreatedSemesterRequest;
import org.springframework.http.ResponseEntity;

public interface SemesterService {
    ResponseEntity<String> createdSemester(CreatedSemesterRequest createdSemesterRequest) throws ServiceException;
}
