package com.pcms.be.service;

import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.response.MentorPageResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    String login(String userName, String password)  throws ServiceException;
    String checkUser(String email, String campusCode)  throws ServiceException;
    User getCurrentUser() throws ServiceException;
    MentorPageResponse getMentor(String keyword, PageRequest pageRequest) throws ServiceException;

}
