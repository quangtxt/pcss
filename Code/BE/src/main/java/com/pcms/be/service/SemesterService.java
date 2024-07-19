package com.pcms.be.service;

import com.pcms.be.domain.Semester;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.DTO.SemesterDTO;
import com.pcms.be.pojo.request.CreateSemesterRequest;
import com.pcms.be.pojo.request.CreatedSemesterRequest;
import com.pcms.be.pojo.request.EditSemesterRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SemesterService {
    ResponseEntity<List<SemesterDTO>> getAll();
    ResponseEntity<SemesterDTO> getById(int id);
    ResponseEntity<String> createdSemester(CreatedSemesterRequest createdSemesterRequest) throws ServiceException;
    ResponseEntity<String> createSemester(CreateSemesterRequest createdSemesterRequest) throws ServiceException;
    ResponseEntity<String> editSemester(EditSemesterRequest editSemesterRequest) throws ServiceException;
}
