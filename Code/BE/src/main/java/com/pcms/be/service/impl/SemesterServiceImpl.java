package com.pcms.be.service.impl;

import com.pcms.be.domain.CapstonePhase;
import com.pcms.be.domain.Semester;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.functions.ValidateData;
import com.pcms.be.pojo.DTO.SemesterDTO;
import com.pcms.be.pojo.request.CreatedSemesterRequest;
import com.pcms.be.pojo.request.EditSemesterRequest;
import com.pcms.be.repository.CapstonePhaseRepository;
import com.pcms.be.repository.SemesterRepository;
import com.pcms.be.service.SemesterService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.OffsetDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SemesterServiceImpl implements SemesterService {
    private final SemesterRepository semesterRepository;
    private final ValidateData validateData;
    private final CapstonePhaseRepository capstonePhaseRepository;
    private final ModelMapper modelMapper;

    @Override
    public ResponseEntity<List<SemesterDTO>> getAll() {
        List<Semester> semesters = semesterRepository.findAll();
        List<SemesterDTO> semesterDTOs = semesters.stream()
                .map(semester -> modelMapper.map(semester, SemesterDTO.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(semesterDTOs);
    }

    @Override
    public ResponseEntity<SemesterDTO> getById(int id) {
        Optional<Semester> optSemester = semesterRepository.findById(Long.valueOf(id));
        if (optSemester.isEmpty()){
            return ResponseEntity.notFound().build();
        }else {
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
        if (validateData.isOffsetDateTimeValid(createdSemesterRequest.getBeginAt())
        && validateData.isOffsetDateTimeValid(createdSemesterRequest.getEndAt())){
            throw new ServiceException(ErrorCode.INCORRECT_FORMAT_DATA_OFFSETDATETIME);
        } else if (semesterRepository.findByName(createdSemesterRequest.getName()).isPresent()){
            throw new ServiceException(ErrorCode.SEMESTER_HAS_THE_SAME_NAME);
        } else if (semesterRepository.findByCode(createdSemesterRequest.getCode()).isPresent()){
            throw new ServiceException(ErrorCode.SEMESTER_HAS_THE_SAME_CODE);
        } else if (semesterRepository.findByOffsetDateTimeValid(createdSemesterRequest.getBeginAt(), createdSemesterRequest.getEndAt()).isPresent()){
            throw new ServiceException(ErrorCode.SEMESTER_ON_THE_SAME_DATE_WITH);
        }else if (!validateCapstonePhases(createdSemesterRequest)){
            throw new ServiceException(ErrorCode.SEMESTER_PHASE_ON_THE_SAME_DATE_WITH);
        } else if (!createdSemesterRequest.getBeginAt().isAfter(now)) {
            return ResponseEntity.badRequest().body("Begin Date must be bigger than now");
        }else {
            Semester semester = new Semester();
            semester.setName(createdSemesterRequest.getName());
            semester.setCode(createdSemesterRequest.getCode());
            semester.setBeginAt(createdSemesterRequest.getBeginAt());
            semester.setEndAt(createdSemesterRequest.getEndAt());
            semesterRepository.save(semester);
            if (!createdSemesterRequest.getPhases().isEmpty()){
                List<CapstonePhase> capstonePhaseList = new ArrayList<>();
                for (CapstonePhase c : createdSemesterRequest.getPhases()){
                    CapstonePhase capstonePhase = new CapstonePhase();
                    capstonePhase.setName(c.getName());
                    capstonePhase.setBeginAt(c.getBeginAt());
                    capstonePhase.setEndAt(c.getEndAt());
                    capstonePhase.setSemester(semester);
                    capstonePhaseRepository.save(capstonePhase);
                    capstonePhaseList.add(capstonePhase);
                }
                semester.setPhases(capstonePhaseList);
            }
            semesterRepository.save(semester);
            return ResponseEntity.ok("Create Semester Successfully");
        }
        }  catch (ServiceException e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    @Transactional
    public ResponseEntity<String> editSemester(EditSemesterRequest editSemesterRequest) throws ServiceException {
        try {
            Optional<Semester> optSemester = semesterRepository.findById(Long.valueOf(editSemesterRequest.getSemesterId()));
            if (optSemester.isEmpty()){
                return ResponseEntity.notFound().build();
            }else{
                OffsetDateTime now = OffsetDateTime.now();
                Semester semester = optSemester.orElseThrow();
                if (validateData.isOffsetDateTimeValid(editSemesterRequest.getBeginAt())
                        && validateData.isOffsetDateTimeValid(editSemesterRequest.getEndAt())){
                    throw new ServiceException(ErrorCode.INCORRECT_FORMAT_DATA_OFFSETDATETIME);
                } else if (semesterRepository.findByNameAndDifferentCurrentSemester(editSemesterRequest.getName(), editSemesterRequest.getSemesterId()).isPresent()){
                    throw new ServiceException(ErrorCode.SEMESTER_HAS_THE_SAME_NAME);
                } else if (semesterRepository.findByCodeAndDifferentCurrentSemester(editSemesterRequest.getCode(), editSemesterRequest.getSemesterId()).isPresent()){
                    throw new ServiceException(ErrorCode.SEMESTER_HAS_THE_SAME_CODE);
                } else if (semesterRepository.findByOffsetDateTimeValidAndDifferentCurrentSemester(editSemesterRequest.getBeginAt(), editSemesterRequest.getEndAt(), editSemesterRequest.getSemesterId()).isPresent()){
                    throw new ServiceException(ErrorCode.SEMESTER_ON_THE_SAME_DATE_WITH);
                } else if (!editSemesterRequest.getBeginAt().isAfter(now)) {
                    return ResponseEntity.badRequest().body("Begin Date must be bigger than now!");
                } else if (!validDuplicateName(editSemesterRequest.getPhases())) {
                    return ResponseEntity.badRequest().body("Some Phase's name is duplicate!");
                }
                semester.setName(editSemesterRequest.getName());
                semester.setCode(editSemesterRequest.getCode());
                semester.setBeginAt(editSemesterRequest.getBeginAt());
                semester.setEndAt(editSemesterRequest.getEndAt());
                semesterRepository.save(semester);
                return ResponseEntity.ok("Edit Semester Successfully");
            }


        }  catch (ServiceException e) {
            throw new RuntimeException(e);
        }
    }

    public boolean validateCapstonePhases(CreatedSemesterRequest createdSemesterRequest) {
        List<CapstonePhase> capstonePhases = createdSemesterRequest.getPhases();
        for (CapstonePhase c : capstonePhases){
            if (!(!c.getBeginAt().isBefore(createdSemesterRequest.getBeginAt()) && !c.getBeginAt().isAfter(createdSemesterRequest.getEndAt()))
                    ||!(!c.getEndAt().isBefore(createdSemesterRequest.getBeginAt()) && !c.getEndAt().isAfter(createdSemesterRequest.getEndAt()))){
                return false;
            }
        }
        for (int i = 0; i < capstonePhases.size() - 1; i++) {
            CapstonePhase currentPhase = capstonePhases.get(i);
            for (int j = i + 1; j < capstonePhases.size(); j++) {
                CapstonePhase equalPhase = capstonePhases.get(j);
                if ((currentPhase.getBeginAt().isBefore(equalPhase.getBeginAt()) && currentPhase.getEndAt().isAfter(equalPhase.getBeginAt())) ||
                        (currentPhase.getBeginAt().isAfter(equalPhase.getBeginAt()) && currentPhase.getBeginAt().isBefore(equalPhase.getEndAt())) ||
                        (currentPhase.getEndAt().isAfter(equalPhase.getBeginAt()) && currentPhase.getEndAt().isBefore(equalPhase.getEndAt()))) {
                    return false; // Khoảng thời gian trùng lắp
                }
            }
        }
        return true; // Không có khoảng thời gian trùng lắp
    }
    public boolean validDuplicateName(List<CapstonePhase> capstonePhases){
        Set<String> uniqueNames = capstonePhases.stream()
                .map(CapstonePhase::getName)
                .collect(Collectors.toSet());
        return capstonePhases.size() != uniqueNames.size();
    }
}
