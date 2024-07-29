package com.pcms.be.controller;

import com.pcms.be.errors.ApiException;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.response.SupervisorPageResponse;
import com.pcms.be.service.SupervisorService;
import com.pcms.be.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class SupervisorController {
    private final SupervisorService supervisorService;

    @GetMapping("/supervisors")
    public ResponseEntity<SupervisorPageResponse> getSupervisorList(@RequestParam(value = "page", required = true) String page,
                                                                    @RequestParam(value = "size") String size,
                                                                    @RequestParam(value = "keyword", required = true) String keyword) {
        try {
            PageRequest pageRequest = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size));
            SupervisorPageResponse supervisors = null;
            supervisors = supervisorService.getSupervisor(keyword,pageRequest);
            return ResponseEntity.ok(supervisors);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
}
