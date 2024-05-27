package com.pcms.be.service;

import com.pcms.be.domain.user.Member;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.DTO.MemberDTO;
import com.pcms.be.pojo.InviteMemberRequest;
import com.pcms.be.pojo.MemberResponse;
import com.pcms.be.pojo.RemoveMemberRequest;
import com.pcms.be.pojo.UpdateInvitationStatusRequest;

import java.util.List;

public interface MemberService {
    List<MemberResponse> getInvitations() throws ServiceException;
    MemberResponse updateStatus(UpdateInvitationStatusRequest updateInvitationStatusRequest) throws ServiceException;
    List<MemberDTO> getGroupMember(int groupId) throws ServiceException;
    List<MemberResponse> inviteMember(InviteMemberRequest inviteMemberRequest)throws ServiceException;
    MemberResponse removeMember(RemoveMemberRequest removeMemberRequest) throws ServiceException;
}
