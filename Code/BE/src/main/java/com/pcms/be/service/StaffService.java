package com.pcms.be.service;

import com.pcms.be.domain.user.Member;
import com.pcms.be.domain.user.User;
import com.pcms.be.errors.Response;
import com.pcms.be.errors.ServiceException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface StaffService {
    public ResponseEntity<List<Integer>> checkFormatExcel(MultipartFile file) throws ServiceException;
    public ResponseEntity<String> addUserByExcel(MultipartFile file);
}
