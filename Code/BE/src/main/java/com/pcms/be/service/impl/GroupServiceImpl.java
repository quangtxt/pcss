package com.pcms.be.service.impl;

import com.pcms.be.domain.user.*;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.functions.Constants;
import com.pcms.be.pojo.DTO.GroupMentorInvitationDTO;
import com.pcms.be.pojo.DTO.MemberDTO;
import com.pcms.be.pojo.request.CreateGroupRequest;
import com.pcms.be.pojo.request.EditGroupRequest;
import com.pcms.be.pojo.request.SubmitGroupRequest;
import com.pcms.be.pojo.response.GroupResponse;
import com.pcms.be.pojo.response.SubmitGroupResponse;
import com.pcms.be.repository.*;
import com.pcms.be.service.GroupService;
import com.pcms.be.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@Slf4j
public class GroupServiceImpl implements GroupService {
    private final GroupRepository groupRepository;
    private final UserService userService;
    private final MemberRepository memberRepository;
    private final MentorRepository mentorRepository;
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final GroupMentorInvitationRepository groupMentorInvitationRepository;
    private final ModelMapper modelMapper;


    @Override
    @Transactional
    public GroupResponse createGroup(CreateGroupRequest createGroupDTO) throws ServiceException {
        try {
            User currentUser = userService.getCurrentUser();
            if (memberRepository.findByStudentIdAndStatus(currentUser.getStudent().getId(), Constants.MemberStatus.INGROUP) != null) {
                throw new ServiceException(ErrorCode.STUDENT_ALREADY_IN_A_GROUP);
            }
            if (createGroupDTO.getListStudentID().stream().count() > 4) {
                throw new ServiceException(ErrorCode.MAXIMUM_SIZE_OF_A_GROUP);
            }
            List<Member> members = memberRepository.findAllByStudentIdAndStatus(Long.valueOf(currentUser.getStudent().getId()), Constants.MemberStatus.PENDING);
            for (Member m : members
            ) {
                m.setStatus(Constants.MemberStatus.OUTGROUP);
                memberRepository.save(m);
            }
            List<Member> memberList = new ArrayList<>();
            Member ownerGroup = new Member();
            ownerGroup.setRole(Constants.MemberRole.OWNER);
            ownerGroup.setStatus(Constants.MemberStatus.INGROUP);
            ownerGroup.setStudent(userService.getCurrentUser().getStudent());
            memberList.add(ownerGroup);    // add owner group

            //add members pending
            for (Integer studentId : createGroupDTO.getListStudentID()) {
                if (studentRepository.findById(Long.valueOf(studentId)) == null) {
                    throw new ServiceException(ErrorCode.STUDENT_NOT_FOUND);
                }
                if ((Long.valueOf(studentId)) == userService.getCurrentUser().getStudent().getId()
                        || memberRepository.findByStudentIdAndStatus(Long.valueOf(studentId), Constants.MemberStatus.INGROUP) != null) {
                    throw new ServiceException(ErrorCode.STUDENT_ALREADY_IN_A_GROUP);
                }
                Member newInviteMember = new Member();
                newInviteMember.setRole(Constants.MemberRole.MEMBER);
                newInviteMember.setStatus(Constants.MemberStatus.PENDING);
                newInviteMember.setStudent(studentRepository.findById(Long.valueOf(studentId)).orElse(null));
                memberList.add(newInviteMember);
            }
            Group group = createGroupInternal(createGroupDTO, memberList);
            GroupResponse groupResponse = modelMapper.map(group, GroupResponse.class);
            return groupResponse;
        } catch (Exception e) {
            throw new ServiceException(ErrorCode.FAILED_CREATE_GROUP);
        }
    }


    @Transactional
    @Override
    public Group createGroupInternal(CreateGroupRequest createGroupDTO, List<Member> memberList) {
        Group group = new Group();
        group.setAbbreviations(createGroupDTO.getAbbreviations());
        group.setDescription(createGroupDTO.getDescription());
        group.setKeywords(createGroupDTO.getKeywords());
        group.setName(createGroupDTO.getName());
        group.setVietnameseTitle(createGroupDTO.getVietnameseTitle());
        group.setStatus(Constants.GroupStatus.PENDING);
        groupRepository.save(group);

        for (Member member : memberList) {
            member.setGroup(group);
        }
        group.setMembers(new HashSet<>(memberList));
        groupRepository.save(group);
        return group;
    }  //tao list members


    private void inviteMember(Group group, Integer studentId) {
        Member newInviteMember = new Member();
        newInviteMember.setRole(Constants.MemberRole.MEMBER);
        newInviteMember.setStatus(Constants.MemberStatus.PENDING);
        newInviteMember.setStudent(studentRepository.findById(Long.valueOf(studentId)).orElse(null));
        newInviteMember.setGroup(group);
        memberRepository.save(newInviteMember);
    }

    @Override
    public GroupResponse editGroup(EditGroupRequest editGroupDTO) throws ServiceException {
        try {
            Optional<Group> group1 = groupRepository.findById(Long.valueOf(editGroupDTO.getGroupId()));
            if (!group1.isPresent()) {
                throw new ServiceException(ErrorCode.GROUP_NOT_FOUND);
            }
            Group group = group1.get();
            User user = userService.getCurrentUser();
            Member member = memberRepository.findByStudentIdAndGroupId(user.getStudent().getId(), editGroupDTO.getGroupId());
            if (!member.getStatus().equals(Constants.MemberRole.OWNER)) {
                throw new ServiceException(ErrorCode.FAILED_EDIT_GROUP);
            }
            if (!group.getStatus().equals(Constants.GroupStatus.PENDING)) {
                throw new ServiceException(ErrorCode.FAILED_EDIT_GROUP);
            }
            if (group != null) {
                group.setAbbreviations(editGroupDTO.getAbbreviations());
                group.setDescription(editGroupDTO.getDescription());
                group.setKeywords(editGroupDTO.getKeywords());
                group.setName(editGroupDTO.getName());
                group.setVietnameseTitle(editGroupDTO.getVietnameseTitle());
                groupRepository.save(group);
                GroupResponse groupResponse = modelMapper.map(group, GroupResponse.class);
                return groupResponse;
            } else {
                throw new ServiceException(ErrorCode.FAILED_EDIT_GROUP);
            }

        } catch (Exception e) {
            throw new ServiceException(ErrorCode.FAILED_EDIT_GROUP);
        }
    }

    @Override
    public GroupResponse getGroupByMemberId() throws ServiceException {
        try {
            User user = userService.getCurrentUser();
            Member member = memberRepository.findByStudentIdAndStatus(user.getStudent().getId(), Constants.MemberStatus.INGROUP);
            if (member != null) {
                GroupResponse groupResponse = modelMapper.map(member.getGroup(), GroupResponse.class);
                return groupResponse;
            }
            return null;
        } catch (Exception e) {
            throw new ServiceException(ErrorCode.GROUP_NOT_FOUND);
        }
    }


    @Override
    public GroupResponse getGroupById(int groupId) throws ServiceException {
        try {
            Optional<Group> group = groupRepository.findById(Long.valueOf(groupId));
            if (group.isPresent()) {
                Group group1 = group.get();
                GroupResponse groupResponse = modelMapper.map(group1, GroupResponse.class);
                return groupResponse;
            }
            return null;
        } catch (Exception e) {
            throw new ServiceException(ErrorCode.GROUP_NOT_FOUND);
        }
    }

    @Override
    @Transactional
    public SubmitGroupResponse submitGroup(SubmitGroupRequest submitGroupRequest) throws ServiceException {
        try {
            Group group = groupRepository.findById(Long.valueOf(submitGroupRequest.getGroupId())).orElse(null);

            if (group == null) {
                throw new ServiceException(ErrorCode.GROUP_NOT_FOUND);
            }
            if (submitGroupRequest.getMentorIds().size() > 2) {
                throw new ServiceException(ErrorCode.MAXIMUM_SIZE_MENTOR_OF_A_GROUP);
            }
            List<Member> members = memberRepository.findAllByGroupIdAndStatus(group.getId(), Constants.MemberStatus.PENDING);
            for (Member m : members) {
                m.setStatus(Constants.MemberStatus.OUTGROUP);
                memberRepository.save(m);
            }

            SubmitGroupResponse submitGroupResponse = new SubmitGroupResponse();

            List<Member> memberInGroup = memberRepository.findAllByGroupIdAndStatus(group.getId(), Constants.MemberStatus.INGROUP);
            List<MemberDTO> memberDTOList = new ArrayList<>();
            List<GroupMentorInvitationDTO> groupMentorInvitationDTOS = new ArrayList<>();
            for (Member member : memberInGroup
            ) {
                memberDTOList.add(modelMapper.map(member, MemberDTO.class));
            }
            if (submitGroupRequest.getMentorIds().size() <= 2) {
                for (Integer mentorId : submitGroupRequest.getMentorIds()) {
                    Optional<Mentor> m = mentorRepository.findById(Long.valueOf(mentorId));
                    if (m.isPresent()) {
                        GroupMentorInvitation groupMentorInvitation = new GroupMentorInvitation();
                        groupMentorInvitation.setGroupId(group);
                        groupMentorInvitation.setMentorId(m.get());
                        groupMentorInvitation.setStatus(Constants.MentorStatus.PENDING_MENTOR);
                        groupMentorInvitationRepository.save(groupMentorInvitation);
                        groupMentorInvitationDTOS.add(modelMapper.map(groupMentorInvitation, GroupMentorInvitationDTO.class));
                    }
                }
            }
            group.setStatus(Constants.GroupStatus.SUBMITTED);
            groupRepository.save(group);
            submitGroupResponse = modelMapper.map(group, SubmitGroupResponse.class);
            submitGroupResponse.setGroupMentorInvitations(groupMentorInvitationDTOS);
            submitGroupResponse.setMembers(memberDTOList);
            return submitGroupResponse;
        } catch (Exception e) {
            throw new ServiceException(ErrorCode.FAILED_EDIT_GROUP);
        }
    }
}
