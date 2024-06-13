package com.pcms.be.service;


import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.DTO.MeetingDTO;
import com.pcms.be.pojo.request.CreateMeetingRequest;

import java.util.List;

public interface MeetingService {
    List<MeetingDTO> createMeeting(List<CreateMeetingRequest> createMeetingRequests) throws ServiceException;

    List<MeetingDTO> viewMeetings(int groupId) throws ServiceException;
}
