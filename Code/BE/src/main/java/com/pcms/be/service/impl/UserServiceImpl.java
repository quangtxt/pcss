package com.pcms.be.service.impl;

import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.TokenDTO;
import com.pcms.be.repository.UserRepository;
import com.pcms.be.service.EncryptionService;
import com.pcms.be.service.JWTService;
import com.pcms.be.service.TokenService;
import com.pcms.be.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final EncryptionService encryptionService;
    private final JWTService jwtService;
    private final TokenService tokenService;
    @Autowired
    ConfigurableApplicationContext applicationContext;
    public Keycloak keycloak() {
        return applicationContext.getBean(Keycloak.class);
    }
    @Override
    public String login(String userName, String password)  throws ServiceException {
        Optional<User> optionalUser = userRepository.findByUsernameIgnoreCase(userName);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (encryptionService.verifyPassword(password, user.getPassword())) {
                return jwtService.generateJWT(user);
            } else {
                throw new ServiceException(ErrorCode.AUTH_INVALID_GRANT);
            }
        }
        throw new ServiceException(ErrorCode.USER_NOT_FOUND);
    }
    @Override
    @Transactional
    public User getCurrentUser() throws ServiceException {
        TokenDTO tokenDTO = tokenService.getToken();
        if (tokenDTO != null) {
            Optional<User> userOptional = userRepository.findByUsernameIgnoreCase(tokenDTO.getUserName());
            if (userOptional.isPresent()) {
                return userOptional.get();
            }
        }
        throw new ServiceException(ErrorCode.USER_NOT_FOUND);
    }
}
