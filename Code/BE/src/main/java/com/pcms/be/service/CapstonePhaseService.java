package com.pcms.be.service;

import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.DTO.CapstonePhaseDTO;
import com.pcms.be.pojo.request.AddPhaseRequest;
import com.pcms.be.pojo.request.EditPhaseRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CapstonePhaseService {
    ResponseEntity<CapstonePhaseDTO> getById(int id);
    ResponseEntity<String> addPhase(AddPhaseRequest addPhaseRequest) throws ServiceException;
    ResponseEntity<String> editPhase(EditPhaseRequest editPhaseRequest) throws  ServiceException;
}
