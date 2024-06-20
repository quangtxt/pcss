package com.pcms.be.service.impl;

import com.pcms.be.domain.CapstonePhase;
import com.pcms.be.domain.Semester;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.DTO.CapstonePhaseDTO;
import com.pcms.be.pojo.request.AddPhaseRequest;
import com.pcms.be.pojo.request.CreatedSemesterRequest;
import com.pcms.be.pojo.request.EditPhaseRequest;
import com.pcms.be.repository.CapstonePhaseRepository;
import com.pcms.be.repository.SemesterRepository;
import com.pcms.be.service.CapstonePhaseService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CapstonePhaseServiceImpl implements CapstonePhaseService {
    private final SemesterRepository semesterRepository;
    private final CapstonePhaseRepository capstonePhaseRepository;
    private final ModelMapper modelMapper;

    @Override
    public ResponseEntity<CapstonePhaseDTO> getById(int id) {
        Optional<CapstonePhase> optCapstonePhase = capstonePhaseRepository.findById(Long.valueOf(id));
        if (optCapstonePhase.isEmpty()){
            return ResponseEntity.notFound().build();
        }else{
            CapstonePhase capstonePhase = optCapstonePhase.orElseThrow();
            CapstonePhaseDTO capstonePhaseDTO = modelMapper.map(capstonePhase, CapstonePhaseDTO.class);
            return ResponseEntity.ok(capstonePhaseDTO);
        }
    }


    @Override
    @Transactional
    public ResponseEntity<String> addPhase(AddPhaseRequest addPhaseRequest) throws ServiceException {
       try {
           Optional<Semester> optSemester = semesterRepository.findById(Long.valueOf(addPhaseRequest.getSemesterId()));
           OffsetDateTime now = OffsetDateTime.now();
           if (optSemester.isEmpty()){
               return ResponseEntity.badRequest().body("Cannot find Semester by SemesterId "+ addPhaseRequest.getSemesterId());
           } else if (addPhaseRequest.getBeginAt().isAfter(addPhaseRequest.getEndAt())) {
               return ResponseEntity.badRequest().body("The start date must occur before the end date");
           } else if (!addPhaseRequest.getBeginAt().isAfter(now)) {
               return ResponseEntity.badRequest().body("Start Date must be bigger than now");
           } else{
               CapstonePhase capstonePhase = new CapstonePhase();
               if (!capstonePhaseRepository.findAllByStartAndEnd(addPhaseRequest.getBeginAt(), addPhaseRequest.getEndAt(), Integer.parseInt(optSemester.orElseThrow().getId().toString())).isEmpty()){
                   throw new ServiceException(ErrorCode.SEMESTER_PHASE_ON_THE_SAME_DATE_WITH);
               }else if (capstonePhaseRepository.findByName(addPhaseRequest.getName(), Integer.parseInt(optSemester.orElseThrow().getId().toString())).isPresent()) {
                   return ResponseEntity.badRequest().body("Name is duplicate in this semester");
               }
               capstonePhase.setName(addPhaseRequest.getName());
               capstonePhase.setBeginAt(addPhaseRequest.getBeginAt());
               capstonePhase.setEndAt(addPhaseRequest.getEndAt());
               capstonePhase.setSemester(optSemester.orElseThrow());
               capstonePhaseRepository.save(capstonePhase);
               return ResponseEntity.ok("Add new phase into semester " + optSemester.orElseThrow().getName() + " successfully!");
           }
       }catch (Exception e){
           throw new RuntimeException(e);
       }
    }

    @Override
    @Transactional
    public ResponseEntity<String> editPhase(EditPhaseRequest editPhaseRequest) throws ServiceException {
        try {
            Optional<CapstonePhase> optCapstonePhase = capstonePhaseRepository.findById(Long.valueOf(editPhaseRequest.getId()));
            if (optCapstonePhase.isEmpty()){
                return ResponseEntity.notFound().build();
            }else{
                CapstonePhase capstonePhase = optCapstonePhase.orElseThrow();
                OffsetDateTime now = OffsetDateTime.now();
                if (editPhaseRequest.getBeginAt().isAfter(editPhaseRequest.getEndAt())) {
                    return ResponseEntity.badRequest().body("The start date must occur before the end date");
                } else if (!editPhaseRequest.getBeginAt().isAfter(now)) {
                    return ResponseEntity.badRequest().body("Start Date must be bigger than now");
                } else{
                    if (!capstonePhaseRepository.findAllByStartAndEndAndDifferentCurrent(editPhaseRequest.getBeginAt(), editPhaseRequest.getEndAt(), Integer.parseInt(capstonePhase.getSemester().getId().toString()), Integer.parseInt(capstonePhase.getId().toString())).isEmpty()){
                        throw new ServiceException(ErrorCode.SEMESTER_PHASE_ON_THE_SAME_DATE_WITH);
                    } else if (capstonePhaseRepository.findByName(editPhaseRequest.getName(), Integer.parseInt(capstonePhase.getSemester().getId().toString())).isPresent()) {
                        return ResponseEntity.badRequest().body("Name is duplicate in this semester");
                    }
                    capstonePhase.setName(editPhaseRequest.getName());
                    capstonePhase.setBeginAt(editPhaseRequest.getBeginAt());
                    capstonePhase.setEndAt(editPhaseRequest.getEndAt());
                    capstonePhaseRepository.save(capstonePhase);
                    return ResponseEntity.ok("Edit phase successfully!");
                }
            }
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }
}
