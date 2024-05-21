package com.pcms.be.service;

import com.pcms.be.domain.user.Member;
import com.pcms.be.domain.user.User;
import com.pcms.be.errors.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface StaffService {
    public ResponseEntity<String> addUserByExcel(MultipartFile file);
}
