package com.pcms.be.service.impl;

import com.pcms.be.domain.Milestone;
import com.pcms.be.domain.Submission;
import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.functions.Constants;
import com.pcms.be.pojo.DTO.SubmissionDTO;
import com.pcms.be.pojo.request.AddSubmissionRequest;
import com.pcms.be.pojo.request.EditSubmissionRequest;
import com.pcms.be.repository.MilestoneRepository;
import com.pcms.be.repository.SubmissionRepository;
import com.pcms.be.service.SubmissionService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubmissionServiceImpl implements SubmissionService {
    private final SubmissionRepository submissionRepository;
    private final MilestoneRepository milestoneRepository;
    private final ModelMapper modelMapper;

    @Override
    public ResponseEntity<SubmissionDTO> getById(int id) {
        Optional<Submission> optSubmission = submissionRepository.findById(Long.valueOf(id));
        if (optSubmission.isEmpty()){
            return ResponseEntity.notFound().build();
        }else {
            Submission submission = optSubmission.orElseThrow();
            SubmissionDTO submissionDTO = modelMapper.map(submission, SubmissionDTO.class);
            return ResponseEntity.ok(submissionDTO);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<String> addSubmission(AddSubmissionRequest addSubmissionRequest) throws ServiceException {
        Optional<Milestone> optMilestone = milestoneRepository.findById(Long.valueOf(addSubmissionRequest.getMilestoneId()));
        if (optMilestone.isEmpty()){
            return ResponseEntity.notFound().build();
        }else {
            OffsetDateTime now = OffsetDateTime.now();
            Milestone milestone = optMilestone.orElseThrow();
            Submission submission = new Submission();
            submission.setName(addSubmissionRequest.getName());
            submission.setDescription(addSubmissionRequest.getDescription());
            if (addSubmissionRequest.getDueDate().isBefore(now)){
                return ResponseEntity.badRequest().body("Due date must be bigger than now!");
            }else{
                submission.setDueDate(addSubmissionRequest.getDueDate());
            }
//            submission.setStatus(Constants.SubmissionStatus.Unfinished);
            submission.setMilestone(milestone);
            submissionRepository.save(submission);
            return ResponseEntity.ok("Add submission successfully!");
        }
    }

    @Override
    @Transactional
    public ResponseEntity<String> editSubmission(EditSubmissionRequest editSubmissionRequest) throws ServiceException {
       try{
           Optional<Submission> optSubmission = submissionRepository.findById(Long.valueOf(editSubmissionRequest.getId()));
           if (optSubmission.isEmpty()){
               return ResponseEntity.notFound().build();
           }else {
               OffsetDateTime now = OffsetDateTime.now();
               Submission submission = optSubmission.orElseThrow();
               submission.setName(editSubmissionRequest.getName());
               submission.setDescription(editSubmissionRequest.getDescription());
               if (!editSubmissionRequest.getDueDate().isBefore(now)){
                   submission.setDueDate(editSubmissionRequest.getDueDate());
               }else {
                   return ResponseEntity.badRequest().body("Due Date must be bigger than now");
               }
//               submission.setStatus(Constants.SubmissionStatus.Unfinished);
               submissionRepository.save(submission);
               return ResponseEntity.ok("Edit submission successfully");
           }
       }catch (Exception e) {
           throw new RuntimeException(e);
       }
    }


//    public void checkingProcess() {
//        OffsetDateTime offsetDateTime_check_head = OffsetDateTime.now();
//        OffsetDateTime offsetDateTime_check_tail = offsetDateTime_check_head.plus(3, ChronoUnit.DAYS);
//        List<Submission> submissions = submissionRepository.findAllSubmissionByDueDate(offsetDateTime_check_head, offsetDateTime_check_tail);
//        for (Submission s : submissions){
////            List<User> users = s.get
//        }
//
//    }
}
