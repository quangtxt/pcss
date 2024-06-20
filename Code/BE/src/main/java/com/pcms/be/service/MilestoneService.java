package com.pcms.be.service;

import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.DTO.MilestoneDTO;
import com.pcms.be.pojo.request.CreatedMilestoneRequest;
import com.pcms.be.pojo.request.EditMilestoneRequest;
import org.springframework.http.ResponseEntity;

public interface MilestoneService {
    ResponseEntity<MilestoneDTO> getById(int id);
    ResponseEntity<String> createdMileStone(CreatedMilestoneRequest createdMilestoneRequest) throws ServiceException;
    ResponseEntity<String> editMilestone(EditMilestoneRequest editMilestoneRequest) throws ServiceException;
}
