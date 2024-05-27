package com.pcms.be.service;

import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.DTO.MentorDTO;
import com.pcms.be.pojo.request.AddMentorRequest;
import com.pcms.be.pojo.request.EditMentorProfileRequest;
import com.pcms.be.pojo.response.MentorProfileResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface MentorService {
    MentorProfileResponse getMentorProfile(int Id) throws ServiceException;
    MentorProfileResponse editMentorProfile(EditMentorProfileRequest editMentorProfileRequest) throws ServiceException;
    public ResponseEntity<String> checkFormatExcel_Mentor(MultipartFile file) throws ServiceException;
    public ResponseEntity<MentorDTO> addMentor(AddMentorRequest addMentorRequest) throws ServiceException;
    public ResponseEntity<String> addMentorsByExcel(MultipartFile file);
}
