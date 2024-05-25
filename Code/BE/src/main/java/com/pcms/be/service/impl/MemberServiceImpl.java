package com.pcms.be.service.impl;

import com.pcms.be.domain.user.Group;
import com.pcms.be.domain.user.Member;
import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.pojo.InviteMemberRequest;
import com.pcms.be.pojo.MemberResponse;
import com.pcms.be.pojo.UpdateInvitationStatusRequest;
import com.pcms.be.repository.GroupRepository;
import com.pcms.be.repository.MemberRepository;
import com.pcms.be.repository.UserRepository;
import com.pcms.be.service.GroupService;
import com.pcms.be.service.MemberService;
import com.pcms.be.service.UserService;
import com.sun.jdi.LongValue;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {

    private final UserService userService;
    private final GroupService groupService;
    private final GroupRepository groupRepository;
    private final MemberRepository memberRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<MemberResponse> getInvitations() throws ServiceException {
        try {
            List<Member> listMember = memberRepository.findAllByUserIdAndStatusFalse(userService.getCurrentUser().getId());
            List<MemberResponse> listInvitation = new ArrayList<>();
            for (Member mem : listMember
            ) {
                listInvitation.add(modelMapper.map(mem, MemberResponse.class));
            }
            return listInvitation;
        } catch (Exception e) {
            throw new ServiceException(ErrorCode.FAILED_GET_IVITATIONS);
        }
    }

    @Override
    public MemberResponse updateStatus(UpdateInvitationStatusRequest updateInvitationStatusRequest) throws ServiceException {
        try {
            if(groupRepository.findById(Long.valueOf(updateInvitationStatusRequest.getGroupId())) == null){
                throw new ServiceException(ErrorCode.GROUP_NOT_FOUND);
            }

            Member member = memberRepository.findByUserIdAndGroupId(userService.getCurrentUser().getId(), updateInvitationStatusRequest.getGroupId());
            if( member!=null && updateInvitationStatusRequest.isStatus() == true){
                member.setStatus(updateInvitationStatusRequest.isStatus());
                memberRepository.save(member);

            }if(member!=null && updateInvitationStatusRequest.isStatus() == false){
                memberRepository.delete(member);
            }
            return modelMapper.map(member, MemberResponse.class);
        } catch (Exception e) {
            throw new ServiceException(ErrorCode.FAILED_GET_GROUP);
        }
    }

    @Override
    public List<MemberResponse> getGroupMember() throws ServiceException {
        try {

            Member member = memberRepository.findByUserIdAndStatusTrue(userService.getCurrentUser().getId());
            List<Member> listMember = memberRepository.findAllByGroupIdAndStatusTrue( member.getGroup().getId());
            List<MemberResponse> listMemberRes = new ArrayList<>();
            for (Member mem : listMember
            ) {
                listMemberRes.add(modelMapper.map(mem, MemberResponse.class));
            }
            return listMemberRes;
        } catch (Exception e) {
            throw new ServiceException(ErrorCode.FAILED_GET_IVITATIONS);
        }
    }

    @Override
    @Transactional
    public List<MemberResponse> inviteMember(InviteMemberRequest inviteMemberRequest) throws ServiceException {
        try {
            User user = userService.getCurrentUser();
            Member member= memberRepository.findByGroupIdAndRole(Long.valueOf(inviteMemberRequest.getGroupId()), Member.MemberRole.OWNER);
            if(user.getId() != member.getUser().getId()){
                throw new ServiceException(ErrorCode.FAILED_GET_IVITATIONS);
            }
            if((memberRepository.findAllByGroupIdAndStatusTrue( member.getGroup().getId()).size() + inviteMemberRequest.getListUserID().size()) > 5 ){
                throw new ServiceException(ErrorCode.FAILED_GET_IVITATIONS);
            }
            List<MemberResponse> newMembers = new ArrayList<>();
            for (Integer userId : inviteMemberRequest.getListUserID()) {
                User invitedUser = userRepository.findUserById(userId);
                if(invitedUser ==null){
                    throw new ServiceException(ErrorCode.USER_NOT_FOUND);
                }

                if (memberRepository.findByUserIdAndStatusTrue(Long.valueOf(userId)) != null) {
                    throw new ServiceException(ErrorCode.USER_ALREADY_IN_A_GROUP);
                }
                Member newMember = inviteMember(member.getGroup(), invitedUser);
                newMembers.add(modelMapper.map(newMember, MemberResponse.class));
            }
            return newMembers;
        }catch (Exception e){
            throw new ServiceException(ErrorCode.FAILED_GET_IVITATIONS);
        }
    }
    private Member inviteMember(Group group, User user) {
        Member newMember = new Member();
        newMember.setRole(Member.MemberRole.MEMBER);
        newMember.setStatus(false);
        newMember.setUser(user);
        newMember.setGroup(group);
        return memberRepository.save(newMember);
    }
}