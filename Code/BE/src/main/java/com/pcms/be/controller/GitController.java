package com.pcms.be.controller;

import com.pcms.be.errors.ServiceException;
import com.pcms.be.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/git")
public class GitController {
    private final GroupService groupService;
//    @GetMapping("/checkFormat")
//    public ResponseEntity<String> checkFormatGit() throws ServiceException {
//        return groupService.checkFormatGitLab();
//    }
}
