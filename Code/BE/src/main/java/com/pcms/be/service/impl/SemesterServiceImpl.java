package com.pcms.be.service.impl;

import com.pcms.be.domain.Semester;
import com.pcms.be.domain.Semester_Milestone;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.functions.ValidateData;
import com.pcms.be.pojo.DTO.SemesterDTO;
import com.pcms.be.pojo.DTO.SemesterMilestone2DTO;
import com.pcms.be.pojo.DTO.SemesterMilestoneDTO;
import com.pcms.be.pojo.request.CreateSemesterRequest;
import com.pcms.be.pojo.request.CreatedSemesterRequest;
import com.pcms.be.pojo.request.EditSemesterRequest;
import com.pcms.be.repository.MilestoneRepository;
import com.pcms.be.repository.SemesterMilestoneRepository;
import com.pcms.be.repository.SemesterRepository;
import com.pcms.be.service.SemesterService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SemesterServiceImpl implements SemesterService {
    private final SemesterRepository semesterRepository;
    private final ValidateData validateData;
    private final SemesterMilestoneRepository semesterMilestoneRepository;
    private final ModelMapper modelMapper;
    private final MilestoneRepository milestoneRepository;

    @Override
    public ResponseEntity<List<SemesterDTO>> getAll() {
        List<Semester> semesters = semesterRepository.findAll();
        List<SemesterDTO> semesterDTOs = semesters.stream().map(semester -> modelMapper.map(semester, SemesterDTO.class)).collect(Collectors.toList());

        for (SemesterDTO c : semesterDTOs) {
            Semester semester = semesterRepository.findById(c.getId()).orElseThrow();
            List<Semester_Milestone> semesterMilestones = semesterMilestoneRepository.findAllBySemester(semester);
            List<SemesterMilestone2DTO> semesterMilestone2DTOS = semesterMilestones.stream().map(s -> modelMapper.map(s, SemesterMilestone2DTO.class)).collect(Collectors.toList());
            c.setMilestones(semesterMilestone2DTOS);
        }
        return ResponseEntity.ok(semesterDTOs);
    }

    @Override
    public ResponseEntity<SemesterDTO> getById(int id) {
        Optional<Semester> optSemester = semesterRepository.findById(Long.valueOf(id));
        if (optSemester.isEmpty()) {
            return ResponseEntity.notFound().build();
        } else {
            Semester semester = optSemester.orElseThrow();
            SemesterDTO semesterDTO = modelMapper.map(semester, SemesterDTO.class);
            return ResponseEntity.ok(semesterDTO);
        }
    }

    @Override
    @Transactional
    public ResponseEntity<String> createdSemester(CreatedSemesterRequest createdSemesterRequest) throws ServiceException {
        try {
            OffsetDateTime now = OffsetDateTime.now();
            if (semesterRepository.findByName(createdSemesterRequest.getName()).isPresent()) {
                throw new ServiceException(ErrorCode.SEMESTER_HAS_THE_SAME_NAME);
            } else if (semesterRepository.findByCode(createdSemesterRequest.getCode()).isPresent()) {
                throw new ServiceException(ErrorCode.SEMESTER_HAS_THE_SAME_CODE);
            } else if (semesterRepository.findByOffsetDateTimeValid(createdSemesterRequest.getBeginAt(), createdSemesterRequest.getEndAt()).isPresent()) {
                throw new ServiceException(ErrorCode.SEMESTER_ON_THE_SAME_DATE_WITH);
            } else if (!createdSemesterRequest.getBeginAt().isAfter(now)) {
                return ResponseEntity.badRequest().body("Begin Date must be bigger than now");
            } else {
                Semester semester = new Semester();
                semester.setName(createdSemesterRequest.getName());
                semester.setCode(createdSemesterRequest.getCode());
                semester.setBeginAt(createdSemesterRequest.getBeginAt());
                semester.setEndAt(createdSemesterRequest.getEndAt());
                semesterRepository.save(semester);
//                if (!createdSemesterRequest.getPhases().isEmpty()) {
//                    List<CapstonePhase> capstonePhaseList = new ArrayList<>();
//                    for (CapstonePhase c : createdSemesterRequest.getPhases()) {
//                        CapstonePhase capstonePhase = new CapstonePhase();
//                        capstonePhase.setName(c.getName());
//                        capstonePhase.setBeginAt(c.getBeginAt());
//                        capstonePhase.setEndAt(c.getEndAt());
//                        capstonePhase.setSemester(semester);
//                        capstonePhaseRepository.save(capstonePhase);
//                        capstonePhaseList.add(capstonePhase);
//                    }
//                    semester.setPhases(capstonePhaseList);
//                }
                semesterRepository.save(semester);
                return ResponseEntity.ok("Create Semester Successfully");
            }
        } catch (ServiceException e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public ResponseEntity<String> createSemester(CreateSemesterRequest createdSemesterRequest) throws ServiceException {
        Semester semester = new Semester();
        semester.setName(createdSemesterRequest.getName());
        semester.setCode(createdSemesterRequest.getCode());
        semester.setBeginAt(createdSemesterRequest.getStart_at());
        semesterRepository.save(semester);

        if (!createdSemesterRequest.getMilestone().isEmpty()) {
            List<Semester_Milestone> semesterMilestones = new ArrayList<>();
            for (SemesterMilestoneDTO c : createdSemesterRequest.getMilestone()) {
                Semester_Milestone semesterMilestone = new Semester_Milestone();
                semesterMilestone.setStartDate(c.getStart_date());
                semesterMilestone.setEndDate(c.getEnd_date());
                semesterMilestone.setDuration(c.getDuration());
                semesterMilestone.setSemester(semester);
                semesterMilestone.setMilestone(milestoneRepository.findById(c.getMilestone_id()).orElseThrow());
                semesterMilestoneRepository.save(semesterMilestone);

            }
        }
        return ResponseEntity.ok("Create Semester Successfully");
    }

    @Override
    @Transactional
    public ResponseEntity<String> editSemester(EditSemesterRequest editSemesterRequest) throws ServiceException {
        try {
            Optional<Semester> optSemester = semesterRepository.findById(Long.valueOf(editSemesterRequest.getSemesterId()));
            if (optSemester.isEmpty()) {
                return ResponseEntity.notFound().build();
            } else {
                OffsetDateTime now = OffsetDateTime.now();
                Semester semester = optSemester.orElseThrow();
                if (validateData.isOffsetDateTimeValid(editSemesterRequest.getBeginAt()) && validateData.isOffsetDateTimeValid(editSemesterRequest.getEndAt())) {
                    throw new ServiceException(ErrorCode.INCORRECT_FORMAT_DATA_OFFSETDATETIME);
                } else if (semesterRepository.findByNameAndDifferentCurrentSemester(editSemesterRequest.getName(), editSemesterRequest.getSemesterId()).isPresent()) {
                    throw new ServiceException(ErrorCode.SEMESTER_HAS_THE_SAME_NAME);
                } else if (semesterRepository.findByCodeAndDifferentCurrentSemester(editSemesterRequest.getCode(), editSemesterRequest.getSemesterId()).isPresent()) {
                    throw new ServiceException(ErrorCode.SEMESTER_HAS_THE_SAME_CODE);
                } else if (semesterRepository.findByOffsetDateTimeValidAndDifferentCurrentSemester(editSemesterRequest.getBeginAt(), editSemesterRequest.getEndAt(), editSemesterRequest.getSemesterId()).isPresent()) {
                    throw new ServiceException(ErrorCode.SEMESTER_ON_THE_SAME_DATE_WITH);
                } else if (!editSemesterRequest.getBeginAt().isAfter(now)) {
                    return ResponseEntity.badRequest().body("Begin Date must be bigger than now!");
                }
                semester.setName(editSemesterRequest.getName());
                semester.setCode(editSemesterRequest.getCode());
                semester.setBeginAt(editSemesterRequest.getBeginAt());
                semester.setEndAt(editSemesterRequest.getEndAt());
                semesterRepository.save(semester);
                return ResponseEntity.ok("Edit Semester Successfully");
            }


        } catch (ServiceException e) {
            throw new RuntimeException(e);
        }
    }

}
