package com.pcms.be.controller;

import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ApiException;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.request.CheckUserRequest;
import com.pcms.be.pojo.DTO.LoginBody;
import com.pcms.be.pojo.response.LoginResponse;
import com.pcms.be.repository.SpecificMajorRepository;
import com.pcms.be.repository.UserRepository;
import com.pcms.be.service.EncryptionService;
import com.pcms.be.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final EncryptionService encryptionService;
    private final SpecificMajorRepository specificMajorRepository;

    @PostMapping("/token")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginBody loginBody) {
        try {
            String jwt;
            jwt = userService.login(loginBody.getUsername(), loginBody.getPassword());
            LoginResponse response = new LoginResponse();
            response.setAccess_token(jwt);
            return ResponseEntity.ok(response);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }
    @PostMapping("/check-user")
    public ResponseEntity<LoginResponse> userLoginWithGoogle(@Valid @RequestBody CheckUserRequest req) {
        try {
            String jwt = userService.checkUser(req.getEmail(), req.getCampus());
            LoginResponse response = new LoginResponse();
            response.setAccess_token(jwt);
            return ResponseEntity.ok(response);
        } catch (ServiceException e) {
            throw new ApiException(e.getErrorCode(), e.getParams());
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@Valid @RequestBody LoginBody loginBody) {
        User user = new User();
        user.setUsername(loginBody.getUsername());
        user.setPassword(encryptionService.encryptPassword(loginBody.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok(user);
    }


}
