package com.pcms.be.service;

import com.pcms.be.domain.user.GroupMentorInvitation;
import com.pcms.be.errors.ServiceException;

import java.util.List;

public interface GroupMentorInvitationService {
    List<GroupMentorInvitation> getListInvitation() throws ServiceException;
}
