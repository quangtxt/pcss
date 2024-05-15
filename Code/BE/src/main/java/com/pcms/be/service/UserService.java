package com.pcms.be.service;

import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ServiceException;

public interface UserService {
    String login(String userName, String password)  throws ServiceException;
    User getCurrentUser() throws ServiceException;
}
