package com.pcms.be.controller;

import com.pcms.be.domain.user.Group;
import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ApiException;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.CreateGroupDTO;
import com.pcms.be.pojo.GroupDTO;
import com.pcms.be.pojo.LoginBody;
import com.pcms.be.service.GroupService;
import com.pcms.be.service.impl.GroupServiceImpl;
import com.pcms.be.service.impl.UserServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/group")

public class GroupController {
    private final GroupService groupService;
    @PostMapping("/create")
    public ResponseEntity<GroupDTO> createGroup(@Valid @RequestBody CreateGroupDTO createGroupDTO) {
        try {
            GroupDTO createdGroup = groupService.createGroup(createGroupDTO);
            return ResponseEntity.ok(createdGroup);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
}
