package com.pcms.be.service;

import com.pcms.be.domain.Milestone;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.DTO.MilestoneDTO;
import com.pcms.be.pojo.DTO.SemesterMilestone2DTO;
import com.pcms.be.pojo.request.CreatedMilestoneRequest;
import com.pcms.be.pojo.request.EditMilestoneRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface MilestoneService {
    ResponseEntity<MilestoneDTO> getById(int id);
    ResponseEntity<String> createdMileStone(CreatedMilestoneRequest createdMilestoneRequest) throws ServiceException;
//    ResponseEntity<String> editMilestone(EditMilestoneRequest editMilestoneRequest) throws ServiceException;
//    Optional<Milestone> findLatestMilestoneEndDate();
    void setCronForSchedule();
    void updateStatusMilestone() throws ServiceException;

    List<SemesterMilestone2DTO> getMilestoneGuidancePhase(Long semester_id);
}
