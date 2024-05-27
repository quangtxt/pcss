package com.pcms.be.service.impl;

import com.pcms.be.domain.user.Group;
import com.pcms.be.domain.user.Member;
import com.pcms.be.domain.user.Student;
import com.pcms.be.domain.user.User;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.functions.Constants;
import com.pcms.be.pojo.DTO.MemberDTO;
import com.pcms.be.pojo.InviteMemberRequest;
import com.pcms.be.pojo.MemberResponse;
import com.pcms.be.pojo.RemoveMemberRequest;
import com.pcms.be.pojo.UpdateInvitationStatusRequest;
import com.pcms.be.repository.GroupRepository;
import com.pcms.be.repository.MemberRepository;
import com.pcms.be.repository.StudentRepository;
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
    private final StudentRepository studentRepository;
    private final MemberRepository memberRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<MemberResponse> getInvitations() throws ServiceException {
        try {
            List<Member> listMember = memberRepository.findAllByStudentIdAndStatus(userService.getCurrentUser().getStudent().getId(), Constants.MemberStatus.PENDING);
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
            User user = userService.getCurrentUser();
            int groupId = updateInvitationStatusRequest.getGroupId();
            Long studentId = Long.valueOf(updateInvitationStatusRequest.getStudentId());

            Group group = groupRepository.findById(Long.valueOf(groupId)).orElseThrow(() -> new ServiceException(ErrorCode.GROUP_NOT_FOUND));
            Member member1 = memberRepository.findByStudentIdAndGroupId(studentId,groupId);
            if(member1 ==null){
                throw new ServiceException(ErrorCode.STUDENT_NOT_FOUND);
            }
            //student accept to join group or reject to join group // out group
            if (user.getStudent().getId() == member1.getStudent().getId()) {
                if (member1.getStatus().equals(Constants.MemberStatus.PENDING)) {
                    if (updateInvitationStatusRequest.getStatus().equals(Constants.MemberStatus.INGROUP)) {
                        member1.setStatus(Constants.MemberStatus.INGROUP);
                        memberRepository.save(member1);
                        // set thong bao accept to join group
                    } else {
                        member1.setStatus(Constants.MemberStatus.OUTGROUP);
                        memberRepository.save(member1);
                        // set thong bao reject to join group
                    }
                } else if (member1.getStatus().equals(Constants.MemberStatus.INGROUP)) {
                    member1.setStatus(Constants.MemberStatus.OUTGROUP);
                    memberRepository.save(member1);
                    // set thong bao Out group
                }
                return modelMapper.map(member1, MemberResponse.class);
            }
            //Owner remove member or remove request
            else {
                if (!user.getStudent().getId().equals(group.getOwner().getId())) {
                    throw new ServiceException(ErrorCode.USER_NOT_ALLOW);
                } else {
                    if (updateInvitationStatusRequest.getStatus().equals(Constants.MemberStatus.INGROUP)) {
                        member1.setStatus(Constants.MemberStatus.OUTGROUP);
                        memberRepository.save(member1);
                        //set thong bao remove member
                        return modelMapper.map(member1, MemberResponse.class);
                    }
                    else if(updateInvitationStatusRequest.getStatus().equals(Constants.MemberStatus.PENDING)) {
                        member1.setStatus(Constants.MemberStatus.OUTGROUP);
                        memberRepository.save(member1);
                        //set thong bao remove request
                        return modelMapper.map(member1, MemberResponse.class);
                    }
                }
            }
            return null;
        } catch (Exception e) {
            throw new ServiceException(ErrorCode.FAILED_UPDATE_INVITE_STATUS);
        }
    }

    @Override
    public List<MemberDTO> getGroupMember(int groupId) throws ServiceException {
        try {
            List<Member> listMember = memberRepository.findAllByGroupId(groupId);
            List<MemberDTO> listMemberRes = new ArrayList<>();
            for (Member mem : listMember
            ) {
                listMemberRes.add(modelMapper.map(mem, MemberDTO.class));
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
            Optional<Group> group = groupRepository.findById(Long.valueOf(inviteMemberRequest.getGroupId()));
            if (!group.isPresent()) {
                throw new ServiceException(ErrorCode.GROUP_NOT_FOUND);
            }
            Group group1 = group.get();
            if (user.getStudent().getId() != group1.getOwner().getId()) {
                throw new ServiceException(ErrorCode.FAILED_INVITE_MEMBER);
            }
            List<Member> members = memberRepository.findAllByGroupIdAndStatus(Long.valueOf(inviteMemberRequest.getGroupId()), Constants.MemberStatus.INGROUP);
            List<Member> members1 = memberRepository.findAllByGroupIdAndStatus(Long.valueOf(inviteMemberRequest.getGroupId()), Constants.MemberStatus.PENDING);
            if ((members.size() + members1.size() + inviteMemberRequest.getListStudentID().size()) > 5) {
                throw new ServiceException(ErrorCode.MAXIMUM_SIZE_OF_A_GROUP);
            }
            List<MemberResponse> newMembers = new ArrayList<>();
            for (Integer studentId : inviteMemberRequest.getListStudentID()) {
                Optional<Student> invitedStudent = studentRepository.findById(Long.valueOf(studentId));
                if (!invitedStudent.isPresent()) {
                    throw new ServiceException(ErrorCode.STUDENT_NOT_FOUND);
                }
                if (memberRepository.findByStudentIdAndStatus((Long.valueOf(studentId)), Constants.MemberStatus.INGROUP) != null) {
                    throw new ServiceException(ErrorCode.STUDENT_ALREADY_IN_A_GROUP);
                }
                Student student1 = invitedStudent.get();
                Member newMember = inviteMember(group1, student1);
                newMembers.add(modelMapper.map(newMember, MemberResponse.class));
            }
            return newMembers;

        } catch (Exception e) {
            throw new ServiceException(ErrorCode.FAILED_INVITE_MEMBER);
        }
    }

    @Override
    public MemberResponse removeMember(RemoveMemberRequest removeMemberRequest) throws ServiceException {
        try {
            User user = userService.getCurrentUser();
            Optional<Group> group = groupRepository.findById(Long.valueOf(removeMemberRequest.getGroupId()));
            if (!group.isPresent()) {
                throw new ServiceException(ErrorCode.GROUP_NOT_FOUND);
            } else {
                Group group1 = group.get();
                if (!user.getId().equals(group1.getOwner().getId())) {
                    throw new ServiceException(ErrorCode.USER_NOT_ALLOW);
                } else {
                    Member member = memberRepository.findByStudentIdAndGroupId(Long.valueOf(removeMemberRequest.getStudentId()), removeMemberRequest.getGroupId());
                    if (member == null) {
                        throw new ServiceException(ErrorCode.STUDENT_NOT_FOUND);
                    } else {
                        member.setStatus(Constants.MemberStatus.OUTGROUP);
                        memberRepository.save(member);
                        return modelMapper.map(member, MemberResponse.class);
                    }
                }
            }
        } catch (ServiceException e) {
            throw new ServiceException(ErrorCode.FAILED_REMOVE_MEMBER);
        }
    }

    private Member inviteMember(Group group, Student student) {
        Member newMember = new Member();
        newMember.setRole(Constants.MemberRole.MEMBER);
        newMember.setStatus(Constants.MemberStatus.PENDING);
        newMember.setStudent(student);
        newMember.setGroup(group);
        return memberRepository.save(newMember);
    }
}