package com.pcms.be.service;


import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.DTO.MeetingDTO;
import com.pcms.be.pojo.request.CreateMeetingRequest;
import com.pcms.be.pojo.request.EditMeetingRequest;

import java.util.List;

public interface MeetingService {
    List<MeetingDTO> createMeeting(List<CreateMeetingRequest> createMeetingRequests) throws ServiceException;

    List<MeetingDTO> viewMeetings(int groupId) throws ServiceException;

    List<MeetingDTO> updateMeeting(List<EditMeetingRequest> editMeetingRequests) throws ServiceException;

    MeetingDTO removeMeeting(int meetingId)throws ServiceException;
}
