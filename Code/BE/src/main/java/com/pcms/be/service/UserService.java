package com.pcms.be.service;

import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.response.SupervisorPageResponse;
import org.springframework.data.domain.PageRequest;

public interface UserService {
    String login(String userName, String password)  throws ServiceException;
    String checkUser(String email, String campusCode)  throws ServiceException;
    User getCurrentUser() throws ServiceException;

}
