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
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class GroupMetorInvitationImpl implements GroupMentorInvitationService {
    private final GroupMentorInvitationRepository groupMemberInvitationRepository;
    private final UserService userService;
    @Override
    public List<GroupMentorInvitation> getListInvitationByStatus(String status) throws ServiceException {
        User currentUser = userService.getCurrentUser();
        List<GroupMentorInvitation> listInvitation = groupMemberInvitationRepository.findAllByMentorIdAndStatus(currentUser.getId(), status);
        if (listInvitation.size() >0){
            return listInvitation;
        }else {
            throw new ServiceException(ErrorCode.NOT_FOUND);
        }
    }

    @Override
    public GroupMentorInvitation putStatus(Long id, String newStatus) throws ServiceException {
        Optional<GroupMentorInvitation> optionalInvitation = groupMemberInvitationRepository.findById(id);
        if(optionalInvitation.isPresent()){
            GroupMentorInvitation invitation = optionalInvitation.get();
            invitation.setStatus(newStatus);
            return groupMemberInvitationRepository.save(invitation);
        }else {
            throw new ServiceException(ErrorCode.FAILED_EDIT_GROUP);
        }
    }
}
