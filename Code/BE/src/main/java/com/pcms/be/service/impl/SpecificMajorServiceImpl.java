package com.pcms.be.service.impl;

import com.pcms.be.domain.SpecificMajor;
import com.pcms.be.pojo.DTO.MentorDTO;
import com.pcms.be.pojo.DTO.SpecificMajorDTO;
import com.pcms.be.repository.SpecificMajorRepository;
import com.pcms.be.service.SpecificMajorService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SpecificMajorServiceImpl implements SpecificMajorService {
    private final SpecificMajorRepository specificMajorRepository;
    private final ModelMapper modelMapper;
    @Override
    public List<SpecificMajorDTO> getSpecificMajors() {
//        List<MentorDTO> mentorDTOs = mentorPage.stream()
//                .map(mentor -> modelMapper.map(mentor, MentorDTO.class))
//                .collect(Collectors.toList());

        List<SpecificMajor> specificMajors = specificMajorRepository.findAll();
        List<SpecificMajorDTO> specificMajorDTOs = specificMajors.stream()
                .map(specificMajor -> modelMapper.map(specificMajor, SpecificMajorDTO.class))
                .collect(Collectors.toList());
        return specificMajorDTOs;
    }
}
