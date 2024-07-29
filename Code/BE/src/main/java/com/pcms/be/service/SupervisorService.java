package com.pcms.be.service;

import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.DTO.SupervisorDTO;
import com.pcms.be.pojo.request.AddSupervisorRequest;
import com.pcms.be.pojo.request.EditSupervisorProfileRequest;
import com.pcms.be.pojo.response.SupervisorPageResponse;
import com.pcms.be.pojo.response.SupervisorProfileResponse;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface SupervisorService {

    SupervisorPageResponse getSupervisor(String keyword, PageRequest pageRequest) throws ServiceException;

    SupervisorProfileResponse getSupervisorProfile(int Id) throws ServiceException;
    SupervisorProfileResponse editSupervisorProfile(EditSupervisorProfileRequest editSupervisorProfileRequest) throws ServiceException;
    public ResponseEntity<String> checkFormatExcel_Supervisor(MultipartFile file) throws ServiceException;
    public ResponseEntity<SupervisorDTO> addSupervisor(AddSupervisorRequest addSupervisorRequest) throws ServiceException;
    public ResponseEntity<String> addSupervisorsByExcel(MultipartFile file);
}
