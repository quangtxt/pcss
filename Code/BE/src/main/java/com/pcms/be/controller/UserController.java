package com.pcms.be.controller;

import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ApiException;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.functions.Constants;
import com.pcms.be.pojo.response.GroupResponse;
import com.pcms.be.pojo.response.SupervisorPageResponse;
import com.pcms.be.pojo.DTO.UserDTO;
import com.pcms.be.service.GroupService;
import com.pcms.be.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class UserController {
    private final UserService userService;
    private final GroupService groupService;
    private final ModelMapper modelMapper;

    @Transactional
    @GetMapping("/users/current-user")
    public ResponseEntity<UserDTO> getCurrentUser() {
        try {
            User currentUser = userService.getCurrentUser();
            UserDTO userDTO = modelMapper.map(currentUser, UserDTO.class);
            boolean isStudent = currentUser.getRoles().stream()
                    .anyMatch(role -> role.getName().equals(Constants.RoleConstants.STUDENT));
            if (isStudent) {
                GroupResponse groupResponse = groupService.getGroupByMemberId();
                userDTO.setGroup(groupService.getGroupByMemberId());
            } else {
                // Người dùng không có role "student"
            }
            return ResponseEntity.ok(userDTO);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

}
