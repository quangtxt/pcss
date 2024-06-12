package com.pcms.be.service;

import com.pcms.be.domain.SpecificMajor;
import com.pcms.be.pojo.DTO.SpecificMajorDTO;

import java.util.List;

public interface SpecificMajorService {
    List<SpecificMajorDTO> getSpecificMajors();
}
