package com.pcms.be.service.impl;

import com.pcms.be.domain.CapstonePhase;
import com.pcms.be.domain.Milestone;
import com.pcms.be.domain.Submission;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.functions.Constants;
import com.pcms.be.pojo.DTO.MilestoneDTO;
import com.pcms.be.pojo.request.CreatedMilestoneRequest;
import com.pcms.be.pojo.request.EditMilestoneRequest;
import com.pcms.be.repository.CapstonePhaseRepository;
import com.pcms.be.repository.MilestoneRepository;
import com.pcms.be.repository.SubmissionRepository;
import com.pcms.be.service.MilestoneService;
import lombok.RequiredArgsConstructor;
import org.checkerframework.checker.nullness.Opt;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MilestoneServiceImpl implements MilestoneService {
    private final CapstonePhaseRepository capstonePhaseRepository;
    private final MilestoneRepository milestoneRepository;
    private final SubmissionRepository submissionRepository;
    private final ModelMapper modelMapper;

    @Override
    public ResponseEntity<MilestoneDTO> getById(int id) {
        Optional<Milestone> optMilestone = milestoneRepository.findById(Long.valueOf(id));
        if (optMilestone.isEmpty()){
            return ResponseEntity.notFound().build();
        }else{
            Milestone milestone = optMilestone.orElseThrow();
            MilestoneDTO milestoneDTO = modelMapper.map(milestone, MilestoneDTO.class);
            return ResponseEntity.ok(milestoneDTO);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<String> createdMileStone(CreatedMilestoneRequest createdMilestoneRequest) throws ServiceException {
        try {
            Optional<CapstonePhase> capstonePhase = capstonePhaseRepository.findById(Long.valueOf(createdMilestoneRequest.getPhaseId()));
            if (capstonePhase.isEmpty()){
                return ResponseEntity.notFound().build();
            }
            if (!milestoneRepository.findByPhaseIdAndDuration(createdMilestoneRequest.getPhaseId(), createdMilestoneRequest.getBeginAt().plusDays(Long.valueOf(createdMilestoneRequest.getDuration() * 7))).isEmpty()){
                throw new ServiceException(ErrorCode.MILESTONE_IS_CONFLICT_DATE);
            }
            OffsetDateTime now = OffsetDateTime.now();
            Milestone milestone = new Milestone();
            milestone.setName(createdMilestoneRequest.getName());
            if (!createdMilestoneRequest.getBeginAt().isBefore(now)) {
                milestone.setBeginAt(createdMilestoneRequest.getBeginAt());
            }else{
                return ResponseEntity.badRequest().body("Begin Date must be bigger than now");
            }
            milestone.setDuration(createdMilestoneRequest.getDuration());
            milestone.setPhase(capstonePhase.orElseThrow());
            milestone.setStatus(Constants.MilestoneStatus.NonStart);


            if (!createdMilestoneRequest.getSubmissions().isEmpty()){
                for (Submission s : createdMilestoneRequest.getSubmissions()){
                    if (!s.dueDate.isAfter(now)){
                        return ResponseEntity.badRequest().body("Due Date must be bigger than now");
                    }
                    if (!s.dueDate.isAfter(milestone.getBeginAt())){
                        return ResponseEntity.badRequest().body("Due Date must be equal or bigger than Begin Date");
                    }
                    Submission submission = new Submission();
                    submission.setName(s.getName());
                    submission.setDescription(s.getDescription());
                    submission.setDueDate(s.getDueDate());
                    submission.setMilestone(milestone);
                    submissionRepository.save(submission);
                }
            }
            milestoneRepository.save(milestone);
            return ResponseEntity.ok("Create milestone successfully");
        }catch (ServiceException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<String> editMilestone(EditMilestoneRequest editMilestoneRequest) throws ServiceException {
        try {
            Optional<Milestone> optMilestone = milestoneRepository.findById(Long.valueOf(editMilestoneRequest.getMilestoneId()));
            if (optMilestone.isEmpty()){
                return ResponseEntity.notFound().build();
            }else {
                OffsetDateTime now = OffsetDateTime.now();
                Milestone milestone = optMilestone.orElseThrow();
                if (!milestoneRepository.findByPhaseIdAndDurationAndDifferentCurrentMilestone(Integer.parseInt(milestone.getPhase().getId().toString()), editMilestoneRequest.getBeginAt().plusDays(Long.valueOf(editMilestoneRequest.getDuration())*7), editMilestoneRequest.getMilestoneId()).isEmpty()){
                    throw new ServiceException(ErrorCode.MILESTONE_IS_CONFLICT_DATE);
                }
                milestone.setName(editMilestoneRequest.getName());
                if (!editMilestoneRequest.getBeginAt().isBefore(now)) {
                    milestone.setBeginAt(editMilestoneRequest.getBeginAt());
                }else{
                    return ResponseEntity.badRequest().body("Begin Date must be bigger than now");
                }
                milestone.setDuration(editMilestoneRequest.getDuration());
                milestoneRepository.save(milestone);
                return ResponseEntity.ok("Edit milestone successfully");
            }
        }catch (ServiceException e) {
            throw new RuntimeException(e);
        }
    }
}
