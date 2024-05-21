package com.pcms.be.controller;

import com.pcms.be.domain.user.Group;
import com.pcms.be.errors.ApiException;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.CreateGroupRequest;
import com.pcms.be.pojo.EditGroupRequest;
import com.pcms.be.pojo.GroupResonse;
import com.pcms.be.service.GroupService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/group")

public class GroupController {
    private final GroupService groupService;

    @PostMapping("/create")
    public ResponseEntity<GroupResonse> createGroup(@Valid @RequestBody CreateGroupRequest createGroupDTO) {
        try {
            GroupResonse createdGroup = groupService.createGroup(createGroupDTO);
            return ResponseEntity.ok(createdGroup);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @PostMapping("/edit")
    public ResponseEntity<GroupResonse> editGroup(@Valid @RequestBody EditGroupRequest editGroupDTO) {
        try {
            GroupResonse editGroup = groupService.editGroup(editGroupDTO);
            return ResponseEntity.ok(editGroup);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
}
