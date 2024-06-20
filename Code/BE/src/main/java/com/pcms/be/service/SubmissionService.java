package com.pcms.be.service;

import com.pcms.be.domain.Submission;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.DTO.SubmissionDTO;
import com.pcms.be.pojo.request.AddSubmissionRequest;
import com.pcms.be.pojo.request.EditSubmissionRequest;
import org.springframework.http.ResponseEntity;

public interface SubmissionService {
    ResponseEntity<SubmissionDTO> getById(int id);
    ResponseEntity<String> addSubmission(AddSubmissionRequest addSubmissionRequest) throws ServiceException;
    ResponseEntity<String> editSubmission(EditSubmissionRequest editSubmissionRequest) throws ServiceException;
}
