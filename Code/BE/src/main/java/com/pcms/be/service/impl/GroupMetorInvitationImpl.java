package com.pcms.be.service.impl;

import com.pcms.be.domain.user.GroupMentorInvitation;
import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.repository.GroupMentorInvitationRepository;
import com.pcms.be.service.GroupMentorInvitationService;
import com.pcms.be.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class GroupMetorInvitationImpl implements GroupMentorInvitationService {
    private final GroupMentorInvitationRepository groupMemberInvitationRepository;
    private final UserService userService;
    @Override
    public List<GroupMentorInvitation> getListInvitation() throws ServiceException {
        User currentUser = userService.getCurrentUser();
        String status = "PENDING";
        List<GroupMentorInvitation> listInvitation = groupMemberInvitationRepository.findAllByMentorIdAndStatus(currentUser.getId(), status);
        if (listInvitation != null){
            return listInvitation;
        }
        throw new ServiceException(ErrorCode.NOT_FOUND);
    }

}
