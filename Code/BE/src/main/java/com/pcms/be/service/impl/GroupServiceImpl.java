package com.pcms.be.service.impl;

import com.pcms.be.domain.user.*;
import com.pcms.be.errors.ErrorCode;
import com.pcms.be.errors.ServiceException;
import com.pcms.be.functions.Constants;
import com.pcms.be.pojo.DTO.GroupMentorDTO;
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
import org.checkerframework.checker.units.qual.A;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;


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
    private final GroupMentorRepository groupMentorRepository;
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
            List<GroupMentorDTO> groupMentorDTOS = new ArrayList<>();
            for (Member member : memberInGroup
            ) {
                memberDTOList.add(modelMapper.map(member, MemberDTO.class));
            }
            if (submitGroupRequest.getMentorIds().size() <= 2) {
                for (Integer mentorId : submitGroupRequest.getMentorIds()) {
                    Optional<Mentor> m = mentorRepository.findById(Long.valueOf(mentorId));
                    if (m.isPresent()) {
                        GroupMentor groupMentor = new GroupMentor();
                        groupMentor.setGroupId(group);
                        groupMentor.setMentorId(m.get());
                        groupMentor.setStatus(Constants.MentorStatus.PENDING_MENTOR);
                        groupMentorRepository.save(groupMentor);
                        groupMentorDTOS.add(modelMapper.map(groupMentor, GroupMentorDTO.class));
                    }
                }
            }
            group.setStatus(Constants.GroupStatus.SUBMITTED);
            groupRepository.save(group);
            submitGroupResponse = modelMapper.map(group, SubmitGroupResponse.class);
            submitGroupResponse.setGroupMentors(groupMentorDTOS);
            submitGroupResponse.setMembers(memberDTOList);
            return submitGroupResponse;
        } catch (Exception e) {
            throw new ServiceException(ErrorCode.FAILED_EDIT_GROUP);
        }
    }
    public ResponseEntity<String> automaticallyCreateGroups() throws ServiceException {
        try {
            //Lấy danh sách student chưa có group (danh sách sv1)
            List<Student> listStudentNoneGroup = studentRepository.findStudentsNotInMemberOrInactive();
            if(!listStudentNoneGroup.isEmpty()){
                Collections.shuffle(listStudentNoneGroup);

            }
            //Lấy danh sách nhóm chưa đầy đủ thành viên (danh sách gr1)
            List<Group> listGroupIsNotEnoughMember = groupRepository.findGroupsWithMemberCountLessThan(5);
            clearGroup(listGroupIsNotEnoughMember);

            // Lấy các sinh viên từ sv1 lấp đầy vào gr1.
            setStudentsToGroup(listGroupIsNotEnoughMember, listStudentNoneGroup);
            int size = listStudentNoneGroup.size();

//            // Sau khi thực hiện sẽ xảy ra 3 trường hợp
//            // TH1: danh sách sv1 vẫn còn, danh sách gr1 đã bị lấp đầy thành các group hoàn chỉnh có 5 thành viên
//            // TH2: danh sách sv1 đã hết, danh sách gr1 vẫn còn những nhóm chưa đủ thành viên
//            // TH3: perfect case
            listGroupIsNotEnoughMember = groupRepository.findGroupsWithMemberCountLessThan(5);
//            // TH1
            if (!listStudentNoneGroup.isEmpty()){
                if (listStudentNoneGroup.size() >= 5){ //DONE:  Nếu lượng sinh viên lớn hơn hoặc bằng 5 thì khởi tạo nhiều nhóm
                    createGroups(listStudentNoneGroup);
                }else{ //DONE:  Nếu lượng sinh viên nhỏ hơn 5 thì sếp các sinh viên vào các nhóm random
                    setEachStudentToEachGroup(listStudentNoneGroup);
                }
            }else if (!listGroupIsNotEnoughMember.isEmpty()){ //TH2
               int totalMember = listGroupIsNotEnoughMember.stream()
                       .mapToInt(group -> group.getMembers().size())
                       .sum();
                List<Student> students = new ArrayList<>();
                //Lấy các danh sách sinh viên và xoá nhóm chưa đầy sinh viên
                for (Group gr : listGroupIsNotEnoughMember){
                    for (Member member : gr.getMembers()){
                        students.add(member.getStudent());
                    }
                    groupRepository.delete(gr);
                }
               if (totalMember >= 5){ //
                   createGroups(students);
               }else{// Cho các sinh viên này vào các nhóm random
                   setEachStudentToEachGroup(students);
               }
            }
        }catch (Exception e){
            throw new ServiceException(ErrorCode.FAILED_EDIT_GROUP);
        }
        return ResponseEntity.ok("Automatically grouped successfully");
    }
    public void createGroup(List<Student> students){
        Group group = new Group();
        group.setName("Auto");
        groupRepository.save(group);
        for (int i = 0; i < students.size() ; i++) {
            Member member = new Member();

            if (i == 0){
                member.setRole(Constants.MemberRole.OWNER);
            }else{
                member.setRole(Constants.MemberRole.MEMBER);
            }
            member.setGroup(group);
            member.setStatus(Constants.MemberStatus.INGROUP);
            member.setStudent(students.get(i));
            memberRepository.save(member);
        }
    }
    public void createGroups(List<Student> students){
        List<Student> listStudentToCreateNewGroup = students.subList(0, students.size() - students.size()%5);
        for (int i = 0; i < listStudentToCreateNewGroup.size(); i += 5) {
            createGroup(listStudentToCreateNewGroup.subList(i, i + 5));
        }
        if (students.size() % 5 != 0){
            setEachStudentToEachGroup(students.subList(students.size() - students.size()%5, students.size()));
        }
    }
    public void setEachStudentToEachGroup(List<Student> students){
        List<Group> allGroup = groupRepository.findAll();
        Collections.shuffle(allGroup);
        for (int i = 0; i < students.size(); i++){
            Member member = new Member();
            member.setRole(Constants.MemberRole.MEMBER);
            member.setGroup(allGroup.get(i));
            member.setStatus(Constants.MemberStatus.INGROUP);
            member.setStudent(students.get(i));
            memberRepository.save(member);
        }
    }
//    public void setStudentsToGroup(Group group, List<Student> students){
//        List<Student> tempStudent = students;
//        for (Student student : tempStudent){
//            Member member = new Member();
//            member.setRole(Constants.MemberRole.MEMBER);
//            member.setGroup(group);
//            member.setStatus(Constants.MemberStatus.INGROUP);
//            member.setStudent(student);
//            memberRepository.save(member);
//        }
//    }
    public void setStudentsToGroup(List<Group> group, List<Student> students){
        List<Student> recordStudents = new ArrayList<>();
        if (!group.isEmpty() && !students.isEmpty()){
            int indexStudent = 0;
            for (Group gr : group){
                if (indexStudent == students.size()){
                    break;
                }
                int limit = 5 - gr.getMembers().size();
                for (int i = 0; i < limit; i++) {

                    Member member = new Member();
                    member.setRole(Constants.MemberRole.MEMBER);
                    member.setGroup(gr);
                    member.setStatus(Constants.MemberStatus.INGROUP);
                    member.setStudent(students.get(indexStudent));
                    memberRepository.save(member);
                    recordStudents.add(students.get(indexStudent));
                    indexStudent++;
                    if (indexStudent == students.size() || gr.getMembers().size() == 5 || students.isEmpty()){
                        break;
                    }
                }
            }
            students.removeAll(recordStudents);
        }
    }

    public void clearGroup(List<Group> groups){//test done
        for (Group group : groups) {
            List<Member> memberListToRemove = new ArrayList<>();
            for (Member m : group.getMembers()) {
                if (!m.getStatus().equalsIgnoreCase(Constants.MemberStatus.INGROUP)) {
                    memberListToRemove.add(m);
                }
            }
            if(!memberListToRemove.isEmpty()){
                group.getMembers().removeAll(memberListToRemove);
                groupRepository.save(group);
            }
        }
    }


}
