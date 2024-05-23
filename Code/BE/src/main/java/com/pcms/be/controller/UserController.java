package com.pcms.be.controller;

import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ApiException;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.MentorDTO;
import com.pcms.be.pojo.UserDTO;
import com.pcms.be.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

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
    @GetMapping("/mentors")
    public ResponseEntity< List<MentorDTO>> getMentorList() {
        try {
            List<User> mentors = userService.getMentor();
            List<MentorDTO> mentorDTOs = mentors.stream()
                    .map(mentor -> modelMapper.map(mentor, MentorDTO.class))
                    .collect(Collectors.toList());
            return ResponseEntity.ok(mentorDTOs);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
}
