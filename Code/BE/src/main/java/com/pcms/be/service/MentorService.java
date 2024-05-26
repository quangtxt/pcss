package com.pcms.be.service;

import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.request.EditMentorProfileRequest;
import com.pcms.be.pojo.response.MentorProfileResponse;

public interface MentorService {
    MentorProfileResponse getMentorProfile(int Id) throws ServiceException;
    MentorProfileResponse editMentorProfile(EditMentorProfileRequest editMentorProfileRequest) throws ServiceException;
}
