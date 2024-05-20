package com.pcms.be.controller;

import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ApiException;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.UserDTO;
import com.pcms.be.service.UserService;
import com.pcms.be.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class UserController {
    private final UserService userService;
    private final ModelMapper modelMapper;

    @Transactional
    @GetMapping("/users/current-user")
    public ResponseEntity<UserDTO> getCurrentUser() {
        try {
            User currentUser = userService.getCurrentUser();
            UserDTO userDTO = modelMapper.map(currentUser, UserDTO.class);
            return ResponseEntity.ok(userDTO);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
}
